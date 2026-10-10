(function($) {

	$(function() {

		var $body = $('body'),
			reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)'),
			finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

		// Footer version marker.
		$('.site-version').text('V58');

		if ($('#thermal-cursor-trail').length > 0 || reducedMotionQuery.matches || !finePointerQuery.matches)
			return;

		$('head').append(
			'<style id="thermal-cursor-trail-styles">' +
				'#thermal-cursor-trail {' +
					'position: fixed;' +
					'inset: 0;' +
					'z-index: 0;' +
					'width: 100vw;' +
					'height: 100vh;' +
					'pointer-events: none;' +
					'opacity: 0.88;' +
					'mix-blend-mode: screen;' +
					'image-rendering: pixelated;' +
					'image-rendering: crisp-edges;' +
					'filter: saturate(1.58) contrast(1.08);' +
				'}' +
				'#main,' +
				'#footer {' +
					'position: relative;' +
					'z-index: 1;' +
				'}' +
				'@media screen and (max-width: 736px) {' +
					'#thermal-cursor-trail { display: none; }' +
				'}' +
				'@media (prefers-reduced-motion: reduce) {' +
					'#thermal-cursor-trail { display: none; }' +
				'}' +
			'</style>'
		);

		var canvas = document.createElement('canvas'),
			context = canvas.getContext('2d', { alpha: true }),
			cells = {},
			targetPoint = null,
			trailPoint = null,
			lastStampTime = 0,
			lastFrameTime = 0,
			isVisible = true,
			cellSize = 14,
			stampInterval = 46,
			followEase = 0.085,
			decayPerSecond = 0.52,
			maxHeat = 2.45,
			deviceScale = 1;

		canvas.id = 'thermal-cursor-trail';
		canvas.setAttribute('aria-hidden', 'true');
		$body.prepend(canvas);

		var clamp = function(value, min, max) {
			return Math.max(min, Math.min(max, value));
		};

		var cellKey = function(x, y) {
			return x + ':' + y;
		};

		var resizeCanvas = function() {
			deviceScale = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.ceil(window.innerWidth * deviceScale);
			canvas.height = Math.ceil(window.innerHeight * deviceScale);
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
			context.imageSmoothingEnabled = false;
		};

		var addHeatToCell = function(cellX, cellY, amount) {
			var key = cellKey(cellX, cellY),
				cell = cells[key];

			if (!cell) {
				cell = {
					x: cellX,
					y: cellY,
					heat: 0,
					seed: Math.random()
				};

				cells[key] = cell;
			}

			cell.heat = clamp(cell.heat + amount, 0, maxHeat);
		};

		var stampHeat = function(x, y, strength) {
			var baseX = Math.floor(x / cellSize),
				baseY = Math.floor(y / cellSize),
				radius = 4,
				cellX,
				cellY,
				dx,
				dy,
				distance,
				falloff,
				jitter;

			for (cellY = baseY - radius; cellY <= baseY + radius; cellY++) {
				for (cellX = baseX - radius; cellX <= baseX + radius; cellX++) {
					dx = cellX - baseX;
					dy = cellY - baseY;
					distance = Math.sqrt((dx * dx) + (dy * dy));

					if (distance > radius)
						continue;

					jitter = 0.88 + (Math.random() * 0.22);
					falloff = Math.pow(1 - (distance / radius), 1.55) * jitter;
					addHeatToCell(cellX, cellY, strength * falloff);
				}
			}
		};

		var heatColor = function(heat) {
			heat = clamp(heat, 0, 1);

			if (heat > 0.82)
				return 'rgba(255, 18, 36, ' + (0.34 + heat * 0.52) + ')';

			if (heat > 0.68)
				return 'rgba(255, 84, 0, ' + (0.28 + heat * 0.5) + ')';

			if (heat > 0.52)
				return 'rgba(255, 221, 0, ' + (0.24 + heat * 0.48) + ')';

			if (heat > 0.34)
				return 'rgba(82, 255, 40, ' + (0.2 + heat * 0.42) + ')';

			if (heat > 0.18)
				return 'rgba(0, 169, 255, ' + (0.16 + heat * 0.36) + ')';

			return 'rgba(0, 62, 255, ' + (0.1 + heat * 0.28) + ')';
		};

		var drawCells = function(deltaSeconds) {
			var activeCells = {},
				key,
				cell,
				normalizedHeat,
				size,
				gap,
				jitterOffset;

			context.clearRect(0, 0, canvas.width, canvas.height);
			context.globalCompositeOperation = 'lighter';

			for (key in cells) {
				if (!Object.prototype.hasOwnProperty.call(cells, key))
					continue;

				cell = cells[key];
				cell.heat *= Math.pow(decayPerSecond, deltaSeconds);

				if (cell.heat < 0.018)
					continue;

				normalizedHeat = clamp(cell.heat / maxHeat, 0, 1);
				gap = normalizedHeat > 0.7 ? 1 : 2;
				size = Math.max(1, Math.ceil((cellSize - gap) * deviceScale));
				jitterOffset = (cell.seed > 0.66 && normalizedHeat > 0.18) ? deviceScale : 0;

				context.fillStyle = heatColor(normalizedHeat);
				context.fillRect(
					Math.round(cell.x * cellSize * deviceScale) + jitterOffset,
					Math.round(cell.y * cellSize * deviceScale),
					size,
					size
				);

				activeCells[key] = cell;
			}

			cells = activeCells;
		};

		var updateTrailPoint = function(now) {
			var dx,
				dy,
				distance,
				strength;

			if (!targetPoint)
				return;

			if (!trailPoint) {
				trailPoint = { x: targetPoint.x, y: targetPoint.y };
				stampHeat(trailPoint.x, trailPoint.y, 1.1);
				lastStampTime = now;
				return;
			}

			dx = targetPoint.x - trailPoint.x;
			dy = targetPoint.y - trailPoint.y;
			distance = Math.sqrt((dx * dx) + (dy * dy));

			trailPoint.x += dx * followEase;
			trailPoint.y += dy * followEase;

			if (now - lastStampTime >= stampInterval || distance > cellSize * 2.25) {
				strength = clamp(0.78 + (distance / 210), 0.78, 1.42);
				stampHeat(trailPoint.x, trailPoint.y, strength);
				lastStampTime = now;
			}
		};

		var render = function(now) {
			var deltaSeconds = lastFrameTime ? clamp((now - lastFrameTime) / 1000, 0.001, 0.08) : 0.016;

			lastFrameTime = now;

			if (!isVisible) {
				window.requestAnimationFrame(render);
				return;
			}

			updateTrailPoint(now);
			drawCells(deltaSeconds);

			window.requestAnimationFrame(render);
		};

		var handlePointerMove = function(event) {
			var pointerType = event.originalEvent && event.originalEvent.pointerType;

			if (pointerType && pointerType !== 'mouse' && pointerType !== 'pen')
				return;

			targetPoint = {
				x: event.clientX,
				y: event.clientY
			};
		};

		var handlePointerLeave = function() {
			targetPoint = null;
			trailPoint = null;
		};

		var handleVisibilityChange = function() {
			isVisible = !document.hidden;

			if (!isVisible) {
				cells = {};
				targetPoint = null;
				trailPoint = null;
				context.clearRect(0, 0, canvas.width, canvas.height);
			}
		};

		resizeCanvas();
		window.requestAnimationFrame(render);

		$(window)
			.on('pointermove.thermalTrail mousemove.thermalTrail', handlePointerMove)
			.on('pointerleave.thermalTrail blur.thermalTrail', handlePointerLeave)
			.on('resize.thermalTrail orientationchange.thermalTrail', function() {
				cells = {};
				resizeCanvas();
			});

		document.addEventListener('visibilitychange', handleVisibilityChange);

	});

})(jQuery);
