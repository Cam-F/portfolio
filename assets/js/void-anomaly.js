(function($) {

	$(function() {

		var $body = $('body'),
			reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)'),
			finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

		// Footer version marker.
		$('.site-version').text('V64');

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
					'filter: saturate(1.52) contrast(1.1) brightness(1.04);' +
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
			heatPoint = null,
			lastPointerPoint = null,
			lastStampPoint = null,
			lastPointerMoveTime = 0,
			lastStampTime = 0,
			lastFrameTime = 0,
			pointerSpeed = 0,
			dwellSeconds = 0,
			isVisible = true,
			cellSize = 5,
			stampInterval = 34,
			followEase = 0.18,
			decayPerSecond = 0.58,
			maxHeat = 5.4,
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

		var animatedNoise = function(x, y, now, salt) {
			return cellNoise(
				x + Math.floor(now * 0.005),
				y - Math.floor(now * 0.003),
				salt
			);
		};

		var distanceBetween = function(a, b) {
			if (!a || !b)
				return 0;

			return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
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

		var getCellHeat = function(cellX, cellY) {
			var cell = cells[cellKey(cellX, cellY)];
			return cell ? clamp(cell.heat / maxHeat, 0, 1) : 0;
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

					weight = Math.pow(1 - (distance / Math.max(radius, 1)), 1.2);
					totalHeat += clamp(cell.heat / maxHeat, 0, 1) * weight;
					totalWeight += weight;
				}
			}

			if (totalWeight <= 0)
				return 0;

			return clamp(totalHeat / totalWeight, 0, 1);
		};

		var stampHeat = function(x, y, strength, intensityAmount, now) {
			var baseX = Math.floor(x / cellSize),
				baseY = Math.floor(y / cellSize),
				radius = Math.round(5 + (intensityAmount * 6.5)),
				coreRadius = 0.72 + (intensityAmount * 1.28),
				stampSalt = Math.floor(now / 340),
				cellX,
				cellY,
				dx,
				dy,
				angle,
				distance,
				shapeNoise,
				edgeNoise,
				wobble,
				localRadius,
				edge,
				falloff,
				variance;

			for (cellY = baseY - radius - 2; cellY <= baseY + radius + 2; cellY++) {
				for (cellX = baseX - radius - 2; cellX <= baseX + radius + 2; cellX++) {
					dx = cellX - baseX;
					dy = cellY - baseY;
					angle = Math.atan2(dy, dx);
					shapeNoise = cellNoise(cellX, cellY, stampSalt);
					edgeNoise = animatedNoise(cellX, cellY, now, 17);
					wobble =
						(Math.sin((angle * 3.2) + (now * 0.0042)) * (0.55 + (intensityAmount * 0.52))) +
						(Math.cos((angle * 5.8) - (now * 0.0031)) * (0.38 + (intensityAmount * 0.46))) +
						((edgeNoise - 0.5) * (0.95 + (intensityAmount * 1.25)));
					localRadius = (radius * (0.82 + (shapeNoise * 0.16) + (intensityAmount * 0.04))) + wobble;
					distance = Math.sqrt((dx * dx * 0.96) + (dy * dy * 1.04));
					edge = 1 - (distance / Math.max(localRadius, 1));

					if (edge <= 0)
						continue;

					variance =
						0.93 +
						((shapeNoise - 0.5) * 0.12) +
						((edgeNoise - 0.5) * 0.08) +
						(Math.sin((cellX * 0.92) + (cellY * 1.18) + (now * 0.006)) * 0.045);

					if (distance <= coreRadius) {
						falloff = (1.08 + (intensityAmount * 1.18)) * variance;
					} else {
						falloff = Math.pow(edge, 1.32) * (0.74 + (intensityAmount * 0.48)) * variance;
					}

					if (falloff <= 0)
						continue;

					addHeatToCell(cellX, cellY, strength * falloff);
				}
			}
		};

		var stampLine = function(fromPoint, toPoint, strength, intensityAmount, now) {
			var distance = distanceBetween(fromPoint, toPoint),
				steps = clamp(Math.ceil(distance / (cellSize * 1.35)), 1, 30),
				i,
				progress,
				x,
				y,
				pathHeat,
				localStrength,
				localIntensity;

			for (i = 1; i <= steps; i++) {
				progress = i / steps;
				x = fromPoint.x + ((toPoint.x - fromPoint.x) * progress);
				y = fromPoint.y + ((toPoint.y - fromPoint.y) * progress);
				pathHeat = sampleHeatAround(x, y, 7);
				localStrength = strength + (pathHeat * 0.24);
				localIntensity = clamp(intensityAmount + (pathHeat * 0.44), 0.08, 1);

				stampHeat(x, y, localStrength, localIntensity, now + (i * 7));
			}
		};

		var heatColor = function(heat) {
			heat = clamp(heat, 0, 1);

			if (heat > 0.82)
				return 'rgba(4, 26, 255, ' + (0.34 + heat * 0.56) + ')';

			if (heat > 0.62)
				return 'rgba(0, 62, 230, ' + (0.27 + heat * 0.48) + ')';

			if (heat > 0.42)
				return 'rgba(0, 104, 210, ' + (0.2 + heat * 0.4) + ')';

			if (heat > 0.22)
				return 'rgba(0, 155, 226, ' + (0.14 + heat * 0.33) + ')';

			return 'rgba(48, 212, 255, ' + (0.07 + heat * 0.22) + ')';
		};

		var orangeEdgeAmount = function(cell, heat, now) {
			var neighborHeat = [
				getCellHeat(cell.x + 1, cell.y),
				getCellHeat(cell.x - 1, cell.y),
				getCellHeat(cell.x, cell.y + 1),
				getCellHeat(cell.x, cell.y - 1),
				getCellHeat(cell.x + 1, cell.y + 1),
				getCellHeat(cell.x - 1, cell.y - 1),
				getCellHeat(cell.x + 1, cell.y - 1),
				getCellHeat(cell.x - 1, cell.y + 1)
			],
				drop = 0,
				hotAmount,
				edgeShift,
				i;

			if (heat < 0.7)
				return 0;

			for (i = 0; i < neighborHeat.length; i++)
				drop = Math.max(drop, heat - neighborHeat[i]);

			hotAmount = clamp((heat - 0.7) / 0.28, 0, 1);
			edgeShift =
				0.76 +
				(Math.sin((cell.x * 0.72) + (cell.y * 0.48) + (now * 0.009)) * 0.12) +
				((animatedNoise(cell.x, cell.y, now, 29) - 0.5) * 0.22);

			return clamp(((drop - 0.08) / 0.34) * hotAmount * edgeShift, 0, 1);
		};

		var drawCells = function(deltaSeconds, now) {
			var activeCells = {},
				key,
				cell,
				normalizedHeat,
				size,
				gap,
				orangeAmount,
				orangeAlpha,
				px,
				py;

			context.clearRect(0, 0, canvas.width, canvas.height);
			context.globalCompositeOperation = 'lighter';

			for (key in cells) {
				if (!Object.prototype.hasOwnProperty.call(cells, key))
					continue;

				cell = cells[key];
				cell.heat *= Math.pow(decayPerSecond, deltaSeconds);

				if (cell.heat < 0.012)
					continue;

				normalizedHeat = clamp(cell.heat / maxHeat, 0, 1);
				gap = normalizedHeat > 0.74 ? 0 : 1;
				size = Math.max(1, Math.ceil((cellSize - gap) * deviceScale));
				px = Math.round(cell.x * cellSize * deviceScale);
				py = Math.round(cell.y * cellSize * deviceScale);

				context.fillStyle = heatColor(normalizedHeat);
				context.fillRect(px, py, size, size);

				orangeAmount = orangeEdgeAmount(cell, normalizedHeat, now);

				if (orangeAmount > 0) {
					orangeAlpha = clamp(0.12 + (orangeAmount * 0.46), 0.12, 0.58);
					context.globalCompositeOperation = 'source-over';
					context.fillStyle = 'rgba(255, 126, 22, ' + orangeAlpha + ')';
					context.fillRect(px, py, size, size);
					context.globalCompositeOperation = 'lighter';
				}

				activeCells[key] = cell;
			}

			cells = activeCells;
		};

		var updateHeatPoint = function(now, deltaSeconds) {
			var dx,
				dy,
				distanceToTarget,
				idleMilliseconds,
				isSettling,
				dwellAmount,
				movementAmount,
				existingHeat,
				strength,
				intensityAmount,
				movedSinceStamp;

			if (!targetPoint)
				return;

			pointerSpeed *= Math.pow(0.12, deltaSeconds);

			if (!heatPoint) {
				heatPoint = { x: targetPoint.x, y: targetPoint.y };
				lastStampPoint = { x: heatPoint.x, y: heatPoint.y };
				lastStampTime = now;
			}

			dx = targetPoint.x - heatPoint.x;
			dy = targetPoint.y - heatPoint.y;
			distanceToTarget = Math.sqrt((dx * dx) + (dy * dy));
			idleMilliseconds = now - lastPointerMoveTime;
			isSettling = distanceToTarget < 2.8 && (pointerSpeed < 0.08 || idleMilliseconds > 170);

			heatPoint.x += dx * followEase;
			heatPoint.y += dy * followEase;

			if (isSettling) {
				dwellSeconds = clamp(dwellSeconds + (deltaSeconds * 0.48), 0, 2.2);
			} else {
				dwellSeconds = clamp(dwellSeconds - (deltaSeconds * 1.25), 0, 2.2);
			}

			existingHeat = sampleHeatAround(heatPoint.x, heatPoint.y, 7);
			dwellAmount = clamp((dwellSeconds - 0.32) / 1.55, 0, 1);
			movementAmount = clamp(pointerSpeed / 1.35, 0, 1);
			movedSinceStamp = distanceBetween(lastStampPoint, heatPoint);

			if (now - lastStampTime < stampInterval && movedSinceStamp < (cellSize * 1.65))
				return;

			strength = 0.055 + ((1 - movementAmount) * 0.055) + (existingHeat * 0.2) + (dwellAmount * 0.42);
			intensityAmount = clamp(0.08 + (existingHeat * 0.4) + (dwellAmount * 0.72), 0.08, 1);

			stampLine(lastStampPoint || heatPoint, heatPoint, strength, intensityAmount, now);

			lastStampPoint = { x: heatPoint.x, y: heatPoint.y };
			lastStampTime = now;
		};

		var render = function(now) {
			var deltaSeconds = lastFrameTime ? clamp((now - lastFrameTime) / 1000, 0.001, 0.08) : 0.016;

			lastFrameTime = now;

			if (!isVisible) {
				window.requestAnimationFrame(render);
				return;
			}

			updateHeatPoint(now, deltaSeconds);
			drawCells(deltaSeconds, now);

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
			heatPoint = null;
			lastPointerPoint = null;
			lastStampPoint = null;
			pointerSpeed = 0;
			dwellSeconds = 0;
		};

		var handleVisibilityChange = function() {
			isVisible = !document.hidden;

			if (!isVisible) {
				cells = {};
				targetPoint = null;
				heatPoint = null;
				lastPointerPoint = null;
				lastStampPoint = null;
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
