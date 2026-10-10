(function($) {

	$(function() {

		var $body = $('body'),
			reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)'),
			finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

		// Footer version marker.
		$('.site-version').text('V56');

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
					'opacity: 0.72;' +
					'mix-blend-mode: screen;' +
					'filter: saturate(1.2) blur(0.35px);' +
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
			spots = [],
			lastPoint = null,
			lastAddTime = 0,
			isVisible = true,
			maxSpots = 150,
			spotLifetime = 4400,
			baseRadius = 78,
			deviceScale = 1;

		canvas.id = 'thermal-cursor-trail';
		canvas.setAttribute('aria-hidden', 'true');
		$body.prepend(canvas);

		var clamp = function(value, min, max) {
			return Math.max(min, Math.min(max, value));
		};

		var resizeCanvas = function() {
			deviceScale = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.ceil(window.innerWidth * deviceScale);
			canvas.height = Math.ceil(window.innerHeight * deviceScale);
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
		};

		var addSpot = function(x, y, strength) {
			spots.push({
				x: x,
				y: y,
				created: performance.now(),
				life: spotLifetime + (Math.random() * 900),
				radius: baseRadius + (Math.random() * 34),
				strength: clamp(strength || 1, 0.35, 1.25)
			});

			if (spots.length > maxSpots)
				spots.splice(0, spots.length - maxSpots);
		};

		var addInterpolatedTrail = function(x, y) {
			var now = performance.now(),
				minDelay = 18,
				distance = 0,
				steps = 1,
				i,
				progress;

			if (lastPoint) {
				distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
				steps = clamp(Math.ceil(distance / 46), 1, 5);
			}

			if (now - lastAddTime < minDelay && distance < 18)
				return;

			if (lastPoint) {
				for (i = 1; i <= steps; i++) {
					progress = i / steps;
					addSpot(
						lastPoint.x + ((x - lastPoint.x) * progress),
						lastPoint.y + ((y - lastPoint.y) * progress),
						0.75 + (0.25 * progress)
					);
				}
			} else {
				addSpot(x, y, 1);
			}

			lastPoint = { x: x, y: y };
			lastAddTime = now;
		};

		var drawHeatSpot = function(spot, agePercent) {
			var x = spot.x * deviceScale,
				y = spot.y * deviceScale,
				radius = spot.radius * deviceScale * (0.65 + (agePercent * 1.45)),
				fade = Math.pow(1 - agePercent, 1.45) * spot.strength,
				gradient;

			gradient = context.createRadialGradient(x, y, 0, x, y, radius);
			gradient.addColorStop(0, 'rgba(255, 255, 225, ' + (0.66 * fade) + ')');
			gradient.addColorStop(0.16, 'rgba(255, 229, 55, ' + (0.56 * fade) + ')');
			gradient.addColorStop(0.34, 'rgba(255, 118, 19, ' + (0.42 * fade) + ')');
			gradient.addColorStop(0.55, 'rgba(219, 42, 83, ' + (0.28 * fade) + ')');
			gradient.addColorStop(0.76, 'rgba(88, 43, 222, ' + (0.18 * fade) + ')');
			gradient.addColorStop(1, 'rgba(33, 248, 247, 0)');

			context.fillStyle = gradient;
			context.beginPath();
			context.arc(x, y, radius, 0, Math.PI * 2);
			context.fill();
		};

		var render = function(now) {
			var activeSpots = [],
				agePercent,
				i;

			if (!isVisible) {
				window.requestAnimationFrame(render);
				return;
			}

			context.clearRect(0, 0, canvas.width, canvas.height);
			context.globalCompositeOperation = 'lighter';

			for (i = 0; i < spots.length; i++) {
				agePercent = (now - spots[i].created) / spots[i].life;

				if (agePercent < 1) {
					drawHeatSpot(spots[i], agePercent);
					activeSpots.push(spots[i]);
				}
			}

			spots = activeSpots;
			window.requestAnimationFrame(render);
		};

		var handlePointerMove = function(event) {
			var pointerType = event.originalEvent && event.originalEvent.pointerType;

			if (pointerType && pointerType !== 'mouse' && pointerType !== 'pen')
				return;

			addInterpolatedTrail(event.clientX, event.clientY);
		};

		var handlePointerLeave = function() {
			lastPoint = null;
		};

		var handleVisibilityChange = function() {
			isVisible = !document.hidden;

			if (!isVisible) {
				spots = [];
				lastPoint = null;
				context.clearRect(0, 0, canvas.width, canvas.height);
			}
		};

		resizeCanvas();
		window.requestAnimationFrame(render);

		$(window)
			.on('pointermove.thermalTrail mousemove.thermalTrail', handlePointerMove)
			.on('pointerleave.thermalTrail blur.thermalTrail', handlePointerLeave)
			.on('resize.thermalTrail orientationchange.thermalTrail', resizeCanvas);

		document.addEventListener('visibilitychange', handleVisibilityChange);

	});

})(jQuery);
