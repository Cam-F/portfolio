(function($) {

	$(function() {

		var $body = $('body'),
			reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)'),
			finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

		// Footer version marker.
		$('.site-version').text('V59');

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
					'opacity: 0.9;' +
					'mix-blend-mode: screen;' +
					'image-rendering: pixelated;' +
					'image-rendering: crisp-edges;' +
					'filter: saturate(1.68) contrast(1.12);' +
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
			cellSize = 5,
			stampInterval = 58,
			followEase = 0.078,
			decayPerSecond = 0.5,
			maxHeat = 3.05,
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

		var cellNoise = function(x, y, salt) {
			var n = Math.sin((x * 12.9898) + (y * 78.233) + ((salt || 0) * 37.719)) * 43758.5453;
			return n - Math.floor(n);
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
					seed: cellNoise(cellX, cellY, 9)
				};

				cells[key] = cell;
			}

			cell.heat = clamp(cell.heat + amount, 0, maxHeat);
		};

		var stampHeat = function(x, y, strength) {
			var baseX = Math.floor(x / cellSize),
				baseY = Math.floor(y / cellSize),
				radius = 10,
				coreRadius = 1.15,
				stampSalt = Math.floor(performance.now() / 180),
				cellX,
				cellY,
				dx,
				dy,
				distance,
				shapeNoise,
				localRadius,
				falloff,
				speckle;

			for (cellY = baseY - radius; cellY <= baseY + radius; cellY++) {
				for (cellX = baseX - radius; cellX <= baseX + radius; cellX++) {
					dx = cellX - baseX;
					dy = cellY - baseY;
					shapeNoise = cellNoise(cellX, cellY, stampSalt);
					localRadius = radius * (0.62 + (shapeNoise * 0.52));
					distance = Math.sqrt((dx * dx * (0.88 + (shapeNoise * 0.18))) + (dy * dy * (1.04 - (shapeNoise * 0.16))));

					if (distance > localRadius)
						continue;

					if (distance > coreRadius && shapeNoise < (0.13 + (distance / radius) * 0.14))
						continue;

					if (distance <= coreRadius && Math.abs(dx) + Math.abs(dy) <= 1) {
						falloff = 1.75 + (shapeNoise * 0.28);
					} else {
						speckle = 0.48 + (cellNoise(cellX, cellY, stampSalt + 4) * 0.78);
						falloff = Math.pow(1 - (distance / localRadius), 2.25) * speckle;
					}

					addHeatToCell(cellX, cellY, strength * falloff);
				}
			}
		};

		var heatColor = function(heat) {
			heat = clamp(heat, 0, 1);

			if (heat > 0.78)
				return 'rgba(255, 18, 24, ' + (0.36 + heat * 0.54) + ')';

			if (heat > 0.56)
				return 'rgba(255, 211, 0, ' + (0.26 + heat * 0.5) + ')';

			if (heat > 0.35)
				return 'rgba(72, 255, 42, ' + (0.2 + heat * 0.44) + ')';

			if (heat > 0.18)
				return 'rgba(0, 170, 255, ' + (0.16 + heat * 0.38) + ')';

			return 'rgba(0, 62, 255, ' + (0.1 + heat * 0.28) + ')';
		};

		var drawCells = function(deltaSeconds) {
			var activeCells = {},
				key,
				cell,
				normalizedHeat,
				size,
				gap;

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
				gap = normalizedHeat > 0.76 ? 0 : 1;
				size = Math.max(1, Math.ceil((cellSize - gap) * deviceScale));

				context.fillStyle = heatColor(normalizedHeat);
				context.fillRect(
					Math.round(cell.x * cellSize * deviceScale),
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
				stampHeat(trailPoint.x, trailPoint.y, 1.15);
				lastStampTime = now;
				return;
			}

			dx = targetPoint.x - trailPoint.x;
			dy = targetPoint.y - trailPoint.y;
			distance = Math.sqrt((dx * dx) + (dy * dy));

			trailPoint.x += dx * followEase;
			trailPoint.y += dy * followEase;

			if (now - lastStampTime >= stampInterval || distance > cellSize * 5.5) {
				strength = clamp(0.86 + (distance / 225), 0.86, 1.52);
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
