(function($) {

	$(function() {

		var $body = $('body'),
			reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)'),
			finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

		// Footer version marker.
		$('.site-version').text('V62');

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
					'opacity: 0.86;' +
					'mix-blend-mode: screen;' +
					'image-rendering: pixelated;' +
					'image-rendering: crisp-edges;' +
					'filter: saturate(1.5) contrast(1.1) brightness(1.04);' +
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
			lastPointerPoint = null,
			lastPointerMoveTime = 0,
			lastStampTime = 0,
			lastFrameTime = 0,
			pointerSpeed = 0,
			dwellSeconds = 0,
			isVisible = true,
			cellSize = 5,
			stampInterval = 74,
			followEase = 0.11,
			decayPerSecond = 0.56,
			maxHeat = 4.45,
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

		var sampleHeatAround = function(x, y, radius) {
			var baseX = Math.floor(x / cellSize),
				baseY = Math.floor(y / cellSize),
				totalHeat = 0,
				totalWeight = 0,
				cellX,
				cellY,
				dx,
				dy,
				distance,
				weight,
				cell;

			for (cellY = baseY - radius; cellY <= baseY + radius; cellY++) {
				for (cellX = baseX - radius; cellX <= baseX + radius; cellX++) {
					dx = cellX - baseX;
					dy = cellY - baseY;
					distance = Math.sqrt((dx * dx) + (dy * dy));

					if (distance > radius)
						continue;

					cell = cells[cellKey(cellX, cellY)];

					if (!cell)
						continue;

					weight = Math.pow(1 - (distance / radius), 1.6);
					totalHeat += clamp(cell.heat / maxHeat, 0, 1) * weight;
					totalWeight += weight;
				}
			}

			if (totalWeight <= 0)
				return 0;

			return clamp(totalHeat / totalWeight, 0, 1);
		};

		var stampHeat = function(x, y, strength, intensityAmount, pathAmount) {
			var baseX = Math.floor(x / cellSize),
				baseY = Math.floor(y / cellSize),
				radius = Math.round(5 + (intensityAmount * 6) + (pathAmount * 3)),
				coreRadius = 0.62 + (intensityAmount * 1.15) + (pathAmount * 0.5),
				stampSalt = Math.floor(performance.now() / 230),
				cellX,
				cellY,
				dx,
				dy,
				distance,
				shapeNoise,
				localRadius,
				falloff,
				speckle,
				coreBoost;

			for (cellY = baseY - radius; cellY <= baseY + radius; cellY++) {
				for (cellX = baseX - radius; cellX <= baseX + radius; cellX++) {
					dx = cellX - baseX;
					dy = cellY - baseY;
					shapeNoise = cellNoise(cellX, cellY, stampSalt);
					localRadius = radius * (0.55 + (shapeNoise * 0.52) + (intensityAmount * 0.12) + (pathAmount * 0.18));
					distance = Math.sqrt((dx * dx * (0.84 + (shapeNoise * 0.22))) + (dy * dy * (1.08 - (shapeNoise * 0.18))));

					if (distance > localRadius)
						continue;

					if (distance > coreRadius && shapeNoise < (0.16 + (distance / Math.max(radius, 1)) * 0.19))
						continue;

					if (distance <= coreRadius && Math.abs(dx) + Math.abs(dy) <= 1 + Math.round(intensityAmount + pathAmount)) {
						coreBoost = 1.2 + (intensityAmount * 1.35) + (pathAmount * 1.25) + (shapeNoise * 0.28);
						falloff = coreBoost;
					} else {
						speckle = 0.38 + (cellNoise(cellX, cellY, stampSalt + 4) * 0.82);
						falloff = Math.pow(1 - (distance / localRadius), 2.55) * speckle * (0.46 + (intensityAmount * 0.7) + (pathAmount * 0.74));
					}

					addHeatToCell(cellX, cellY, strength * falloff);
				}
			}
		};

		var heatColor = function(heat) {
			heat = clamp(heat, 0, 1);

			if (heat > 0.82)
				return 'rgba(5, 28, 255, ' + (0.36 + heat * 0.55) + ')';

			if (heat > 0.62)
				return 'rgba(0, 60, 225, ' + (0.28 + heat * 0.48) + ')';

			if (heat > 0.42)
				return 'rgba(0, 102, 205, ' + (0.21 + heat * 0.4) + ')';

			if (heat > 0.22)
				return 'rgba(0, 153, 225, ' + (0.14 + heat * 0.33) + ')';

			return 'rgba(44, 210, 255, ' + (0.07 + heat * 0.22) + ')';
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

				if (cell.heat < 0.014)
					continue;

				normalizedHeat = clamp(cell.heat / maxHeat, 0, 1);
				gap = normalizedHeat > 0.78 ? 0 : 1;
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

		var updateTrailPoint = function(now, deltaSeconds) {
			var dx,
				dy,
				distanceToTarget,
				idleMilliseconds,
				isSettling,
				dwellAmount,
				movingAmount,
				pathAmount,
				strength,
				intensityAmount;

			if (!targetPoint)
				return;

			pointerSpeed *= Math.pow(0.09, deltaSeconds);

			if (!trailPoint) {
				trailPoint = { x: targetPoint.x, y: targetPoint.y };
				lastStampTime = now;
			}

			dx = targetPoint.x - trailPoint.x;
			dy = targetPoint.y - trailPoint.y;
			distanceToTarget = Math.sqrt((dx * dx) + (dy * dy));
			idleMilliseconds = now - lastPointerMoveTime;
			isSettling = distanceToTarget < 3.5 && (pointerSpeed < 0.1 || idleMilliseconds > 150);

			trailPoint.x += dx * followEase;
			trailPoint.y += dy * followEase;

			if (isSettling) {
				dwellSeconds = clamp(dwellSeconds + (deltaSeconds * 0.62), 0, 1.9);
			} else {
				dwellSeconds = clamp(dwellSeconds - (deltaSeconds * 1.85), 0, 1.9);
			}

			if (now - lastStampTime < stampInterval)
				return;

			pathAmount = sampleHeatAround(trailPoint.x, trailPoint.y, 7);
			dwellAmount = clamp((dwellSeconds - 0.22) / 1.36, 0, 1);
			movingAmount = clamp(pointerSpeed / 1.3, 0, 1);

			if (dwellAmount > 0.05) {
				strength = 0.28 + (dwellAmount * 1.38) + (pathAmount * 0.42);
			} else {
				strength = 0.06 + ((1 - movingAmount) * 0.08) + (pathAmount * 0.78);
			}

			intensityAmount = clamp(0.08 + (dwellAmount * 0.8) + (pathAmount * 0.42), 0.08, 1);

			stampHeat(
				trailPoint.x,
				trailPoint.y,
				strength,
				intensityAmount,
				pathAmount
			);

			lastStampTime = now;
		};

		var render = function(now) {
			var deltaSeconds = lastFrameTime ? clamp((now - lastFrameTime) / 1000, 0.001, 0.08) : 0.016;

			lastFrameTime = now;

			if (!isVisible) {
				window.requestAnimationFrame(render);
				return;
			}

			updateTrailPoint(now, deltaSeconds);
			drawCells(deltaSeconds);

			window.requestAnimationFrame(render);
		};

		var handlePointerMove = function(event) {
			var pointerType = event.originalEvent && event.originalEvent.pointerType,
				now = performance.now(),
				x = event.clientX,
				y = event.clientY,
				deltaTime,
				distance;

			if (pointerType && pointerType !== 'mouse' && pointerType !== 'pen')
				return;

			if (lastPointerPoint) {
				deltaTime = Math.max(now - lastPointerMoveTime, 1);
				distance = Math.sqrt(Math.pow(x - lastPointerPoint.x, 2) + Math.pow(y - lastPointerPoint.y, 2));
				pointerSpeed = (pointerSpeed * 0.45) + ((distance / deltaTime) * 0.55);

				if (distance > 4)
					dwellSeconds = Math.max(0, dwellSeconds - 0.22);
			} else {
				pointerSpeed = 0;
			}

			targetPoint = {
				x: x,
				y: y
			};

			lastPointerPoint = targetPoint;
			lastPointerMoveTime = now;
		};

		var handlePointerLeave = function() {
			targetPoint = null;
			trailPoint = null;
			lastPointerPoint = null;
			pointerSpeed = 0;
			dwellSeconds = 0;
		};

		var handleVisibilityChange = function() {
			isVisible = !document.hidden;

			if (!isVisible) {
				cells = {};
				targetPoint = null;
				trailPoint = null;
				lastPointerPoint = null;
				pointerSpeed = 0;
				dwellSeconds = 0;
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
