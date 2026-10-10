(function($) {

	$(function() {

		var $body = $('body'),
			$host = $('#banner header').first();

		// Footer version marker.
		$('.site-version').text('V55');

		if ($('#void-anomaly').length > 0 || $host.length === 0)
			return;

		$host.addClass('void-anomaly-host');

		$('head').append(
			'<style id="void-anomaly-styles">' +
				'.void-anomaly-host {' +
					'position: relative;' +
					'overflow: visible;' +
				'}' +
				'.void-anomaly {' +
					'position: absolute;' +
					'z-index: 6;' +
					'width: 24px;' +
					'height: 28px;' +
					'padding: 0;' +
					'border: 0;' +
					'background: transparent;' +
					'cursor: pointer;' +
					'opacity: 0.94;' +
					'overflow: visible;' +
					'appearance: none;' +
					'-webkit-appearance: none;' +
					'transform: translate(-50%, -50%) rotate(-14deg);' +
					'transition: top 260ms ease, left 260ms ease, opacity 220ms ease, filter 220ms ease;' +
					'filter: drop-shadow(0 0 9px var(--orb-glow, rgba(245, 237, 44, 0.55)));' +
				'}' +
				'.void-anomaly:hover,' +
				'.void-anomaly:focus {' +
					'opacity: 1;' +
					'outline: 0;' +
					'filter: drop-shadow(0 0 14px var(--orb-glow, rgba(245, 237, 44, 0.72)));' +
				'}' +
				'.void-anomaly-core,' +
				'.void-anomaly-tail,' +
				'.void-anomaly-particles {' +
					'position: absolute;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly-core {' +
					'left: 3px;' +
					'top: 1px;' +
					'z-index: 2;' +
					'width: 18px;' +
					'height: 20px;' +
					'border-radius: 58% 42% 62% 38% / 44% 55% 36% 64%;' +
					'background: radial-gradient(circle at 34% 27%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.62) 10%, var(--orb-hot, #fff46a) 21%, var(--orb-core, #f5ed2c) 52%, var(--orb-edge, #ff6a00) 82%, rgba(0, 0, 0, 0.1) 100%);' +
					'box-shadow: inset -3px -4px 7px rgba(0, 0, 0, 0.66), 0 0 8px var(--orb-glow, rgba(245, 237, 44, 0.62)), 0 0 22px var(--orb-wide, rgba(245, 237, 44, 0.28));' +
					'animation: voidOrbPulse 3.4s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-core:before {' +
					'content: "";' +
					'position: absolute;' +
					'left: 4px;' +
					'top: 3px;' +
					'width: 5px;' +
					'height: 4px;' +
					'border-radius: 50%;' +
					'background: rgba(255, 255, 255, 0.88);' +
					'filter: blur(0.3px);' +
				'}' +
				'.void-anomaly-tail {' +
					'left: 2px;' +
					'top: 14px;' +
					'z-index: 1;' +
					'width: 12px;' +
					'height: 18px;' +
					'border-radius: 52% 48% 70% 30% / 30% 40% 60% 74%;' +
					'background: linear-gradient(180deg, var(--orb-hot, rgba(255, 244, 106, 0.9)) 0%, var(--orb-trail, rgba(255, 106, 0, 0.7)) 45%, rgba(255, 80, 0, 0) 100%);' +
					'opacity: 0.78;' +
					'filter: blur(1.2px);' +
					'transform: rotate(18deg);' +
					'animation: voidOrbTail 3.4s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-particles {' +
					'inset: 0;' +
					'z-index: 3;' +
					'border-radius: 50%;' +
				'}' +
				'.void-anomaly-particle {' +
					'position: absolute;' +
					'left: 50%;' +
					'top: 50%;' +
					'width: 3px;' +
					'height: 3px;' +
					'border-radius: 50%;' +
					'background: var(--orb-hot, #fff46a);' +
					'box-shadow: 0 0 7px var(--orb-glow, rgba(245, 237, 44, 0.8));' +
					'opacity: 0;' +
					'transform: translate(-50%, -50%) rotate(var(--orb-angle)) translateX(0);' +
				'}' +
				'.void-anomaly.is-jumping {' +
					'animation: voidOrbJump 360ms ease-out;' +
				'}' +
				'.void-anomaly.is-jumping .void-anomaly-core {' +
					'box-shadow: inset -3px -4px 7px rgba(0, 0, 0, 0.62), 0 0 12px var(--orb-glow, rgba(245, 237, 44, 0.82)), 0 0 30px var(--orb-wide, rgba(245, 237, 44, 0.36));' +
				'}' +
				'.void-anomaly.is-popping {' +
					'animation: voidOrbPop 820ms cubic-bezier(0.15, 0.85, 0.22, 1) forwards;' +
				'}' +
				'.void-anomaly.is-popping .void-anomaly-core {' +
					'animation: voidOrbCorePop 820ms ease-out forwards;' +
				'}' +
				'.void-anomaly.is-popping .void-anomaly-tail {' +
					'animation: voidOrbTailPop 820ms ease-out forwards;' +
				'}' +
				'.void-anomaly.is-popping .void-anomaly-particle {' +
					'animation: voidOrbParticle 820ms cubic-bezier(0.13, 0.82, 0.33, 1) forwards;' +
					'animation-delay: var(--orb-delay);' +
				'}' +
				'.void-anomaly.is-dormant,' +
				'.void-anomaly.is-hidden {' +
					'opacity: 0;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly.is-reforming {' +
					'animation: voidOrbReform 620ms ease-out forwards;' +
				'}' +
				'@keyframes voidOrbPulse {' +
					'0%, 100% { transform: scale(0.92) skew(-2deg, 1deg); }' +
					'50% { transform: scale(1.14) skew(2deg, -1deg); }' +
				'}' +
				'@keyframes voidOrbTail {' +
					'0%, 100% { opacity: 0.62; transform: rotate(18deg) scaleY(0.86); }' +
					'50% { opacity: 0.86; transform: rotate(12deg) scaleY(1.12); }' +
				'}' +
				'@keyframes voidOrbJump {' +
					'0% { transform: translate(-50%, -50%) rotate(-14deg) scale(1); }' +
					'42% { transform: translate(-50%, -50%) rotate(-5deg) scale(1.34); }' +
					'100% { transform: translate(-50%, -50%) rotate(-14deg) scale(1); }' +
				'}' +
				'@keyframes voidOrbPop {' +
					'0% { transform: translate(-50%, -50%) rotate(-14deg) scale(1); opacity: 1; }' +
					'25% { transform: translate(-50%, -50%) rotate(6deg) scale(1.9); opacity: 1; }' +
					'100% { transform: translate(-50%, -50%) rotate(-18deg) scale(0.45); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbCorePop {' +
					'0% { transform: scale(1); opacity: 1; }' +
					'36% { transform: scale(0.62); opacity: 1; }' +
					'100% { transform: scale(0.04); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbTailPop {' +
					'0% { transform: rotate(18deg) scaleY(1); opacity: 0.78; }' +
					'100% { transform: rotate(28deg) scaleY(0.2); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbParticle {' +
					'0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--orb-angle)) translateX(0); }' +
					'18% { opacity: 1; }' +
					'100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--orb-angle)) translateX(var(--orb-distance)); }' +
				'}' +
				'@keyframes voidOrbReform {' +
					'0% { transform: translate(-50%, -50%) rotate(-14deg) scale(0.15); opacity: 0; }' +
					'55% { transform: translate(-50%, -50%) rotate(-8deg) scale(1.3); opacity: 0.92; }' +
					'100% { transform: translate(-50%, -50%) rotate(-14deg) scale(1); opacity: 0.94; }' +
				'}' +
				'@media screen and (max-width: 736px) {' +
					'.void-anomaly { display: none; }' +
				'}' +
				'@media (prefers-reduced-motion: reduce) {' +
					'.void-anomaly,' +
					'.void-anomaly-core,' +
					'.void-anomaly-tail,' +
					'.void-anomaly-particle {' +
						'animation: none !important;' +
						'transition: none !important;' +
					'}' +
					'.void-anomaly.is-jumping { opacity: 1; }' +
					'.void-anomaly.is-popping { opacity: 0; }' +
				'}' +
			'</style>'
		);

		var particleMarkup = '',
			availablePositions = [],
			activePositionName = null,
			activeColorIndex = -1,
			clickCount = 0,
			clickResetTimer = null,
			stageTimer = null,
			resizeTimer = null;

		var palettes = [
			{ name: 'dust', hot: '#fff9aa', core: '#f5ed2c', edge: '#ff8a00', trail: 'rgba(255, 138, 0, 0.7)', glow: 'rgba(245, 237, 44, 0.72)', wide: 'rgba(255, 138, 0, 0.3)' },
			{ name: 'redacted', hot: '#f0f0f0', core: '#8e8e8e', edge: '#171717', trail: 'rgba(185, 185, 185, 0.55)', glow: 'rgba(0, 0, 0, 0.82)', wide: 'rgba(190, 190, 190, 0.24)' },
			{ name: 'wayfinder', hot: '#ecd4ff', core: '#b15cff', edge: '#7d08e2', trail: 'rgba(125, 8, 226, 0.66)', glow: 'rgba(125, 8, 226, 0.74)', wide: 'rgba(125, 8, 226, 0.32)' },
			{ name: 'ruined-king', hot: '#c8ffe9', core: '#74e0bd', edge: '#449e7d', trail: 'rgba(68, 158, 125, 0.68)', glow: 'rgba(68, 158, 125, 0.74)', wide: 'rgba(68, 158, 125, 0.32)' },
			{ name: 'jar-wars', hot: '#e9ffff', core: '#68dad4', edge: '#c65955', trail: 'rgba(198, 89, 85, 0.68)', glow: 'rgba(104, 218, 212, 0.76)', wide: 'rgba(198, 89, 85, 0.32)' },
			{ name: 'vicious-circle', hot: '#d9fffe', core: '#8efdf8', edge: '#21f8f7', trail: 'rgba(33, 248, 247, 0.68)', glow: 'rgba(33, 248, 247, 0.78)', wide: 'rgba(33, 248, 247, 0.34)' }
		];

		for (var i = 0; i < 18; i++) {
			particleMarkup += '<span class="void-anomaly-particle" style="--orb-angle:' + (i * 20) + 'deg; --orb-distance:' + (25 + (i % 6) * 5) + 'px; --orb-delay:' + (i % 5) * 18 + 'ms;"></span>';
		}

		var $void = $(
			'<button type="button" id="void-anomaly" class="void-anomaly" aria-label="Hidden fiery orb anomaly">' +
				'<span class="void-anomaly-tail" aria-hidden="true"></span>' +
				'<span class="void-anomaly-core" aria-hidden="true"></span>' +
				'<span class="void-anomaly-particles" aria-hidden="true">' + particleMarkup + '</span>' +
			'</button>'
		);

		var intersects = function(a, b) {
			return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
		};

		var elementRect = function($element, hostRect, padding) {
			var rect;

			if ($element.length === 0 || !$element[0])
				return null;

			rect = $element[0].getBoundingClientRect();

			return {
				left: rect.left - hostRect.left - padding,
				top: rect.top - hostRect.top - padding,
				right: rect.right - hostRect.left + padding,
				bottom: rect.bottom - hostRect.top + padding
			};
		};

		var centerX = function(rect) {
			return rect.left + ((rect.right - rect.left) * 0.5);
		};

		var centerY = function(rect) {
			return rect.top + ((rect.bottom - rect.top) * 0.5);
		};

		var buildSafePositions = function() {
			var hostRect = $host[0].getBoundingClientRect(),
				padding = 28,
				orbSize = 68,
				halfOrb = orbSize * 0.5,
				minX = halfOrb,
				maxX = hostRect.width - halfOrb,
				minY = halfOrb,
				maxY = hostRect.height - halfOrb,
				nameRect = elementRect($host.find('h1').first(), hostRect, padding),
				titleRect = elementRect($host.find('p').first(), hostRect, padding),
				linksRect = elementRect($host.find('ul').first(), hostRect, padding),
				blocked = [],
				candidates = [];

			if (nameRect)
				blocked.push(nameRect);

			if (titleRect)
				blocked.push(titleRect);

			if (linksRect)
				blocked.push(linksRect);

			var addCandidate = function(name, x, y) {
				var box = {
					left: x - halfOrb,
					top: y - halfOrb,
					right: x + halfOrb,
					bottom: y + halfOrb
				};

				if (x < minX || x > maxX || y < minY || y > maxY)
					return;

				for (var j = 0; j < blocked.length; j++) {
					if (intersects(box, blocked[j]))
						return;
				}

				candidates.push({ name: name, x: Math.round(x), y: Math.round(y) });
			};

			var addAroundRect = function(label, rect, offset) {
				if (!rect)
					return;

				addCandidate(label + '-left', rect.left - offset, centerY(rect));
				addCandidate(label + '-right', rect.right + offset, centerY(rect));
				addCandidate(label + '-above', centerX(rect), rect.top - offset);
				addCandidate(label + '-below', centerX(rect), rect.bottom + offset);
			};

			addAroundRect('name', nameRect, 42);
			addAroundRect('title', titleRect, 42);
			addAroundRect('links', linksRect, 42);

			if (nameRect && titleRect) {
				addCandidate('name-title-left-gap', Math.min(nameRect.left, titleRect.left) - 38, (nameRect.bottom + titleRect.top) * 0.5);
				addCandidate('name-title-right-gap', Math.max(nameRect.right, titleRect.right) + 38, (nameRect.bottom + titleRect.top) * 0.5);
			}

			if (titleRect && linksRect) {
				addCandidate('title-links-left-gap', Math.min(titleRect.left, linksRect.left) - 38, (titleRect.bottom + linksRect.top) * 0.5);
				addCandidate('title-links-right-gap', Math.max(titleRect.right, linksRect.right) + 38, (titleRect.bottom + linksRect.top) * 0.5);
			}

			addCandidate('header-upper-left', hostRect.width * 0.2, hostRect.height * 0.22);
			addCandidate('header-upper-right', hostRect.width * 0.8, hostRect.height * 0.22);
			addCandidate('header-lower-left', hostRect.width * 0.18, hostRect.height * 0.74);
			addCandidate('header-lower-right', hostRect.width * 0.82, hostRect.height * 0.74);

			availablePositions = candidates;

			$void.toggleClass('is-hidden', availablePositions.length === 0);
		};

		var choosePosition = function() {
			var nextPosition;

			if (availablePositions.length === 0)
				return null;

			if (availablePositions.length === 1)
				return availablePositions[0];

			do {
				nextPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
			} while (nextPosition.name === activePositionName);

			return nextPosition;
		};

		var choosePaletteIndex = function() {
			var nextIndex;

			if (palettes.length <= 1)
				return 0;

			do {
				nextIndex = Math.floor(Math.random() * palettes.length);
			} while (nextIndex === activeColorIndex);

			return nextIndex;
		};

		var applyPalette = function(index) {
			var palette = palettes[index];

			activeColorIndex = index;

			$void
				.attr('data-orb-color', palette.name)
				.css({
					'--orb-hot': palette.hot,
					'--orb-core': palette.core,
					'--orb-edge': palette.edge,
					'--orb-trail': palette.trail,
					'--orb-glow': palette.glow,
					'--orb-wide': palette.wide
				});
		};

		var applyRandomPositionAndColor = function() {
			var position;

			buildSafePositions();

			position = choosePosition();

			if (!position)
				return false;

			activePositionName = position.name;

			$void
				.attr('data-orb-position', position.name)
				.css({
					left: position.x + 'px',
					top: position.y + 'px'
				});

			applyPalette(choosePaletteIndex());

			return true;
		};

		var resetClickProgress = function() {
			clickCount = 0;
		};

		var queueClickReset = function() {
			window.clearTimeout(clickResetTimer);
			clickResetTimer = window.setTimeout(resetClickProgress, 3800);
		};

		var playJump = function() {
			window.clearTimeout(stageTimer);
			$void.removeClass('is-jumping');

			if (!applyRandomPositionAndColor())
				return;

			if ($void[0])
				$void[0].offsetWidth;

			$void.addClass('is-jumping');

			stageTimer = window.setTimeout(function() {
				$void.removeClass('is-jumping');
			}, 370);
		};

		$host.append($void);
		applyRandomPositionAndColor();

		$(window).on('resize orientationchange', function() {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(function() {
				applyRandomPositionAndColor();
			}, 160);
		});

		$void.on('click', function() {

			if ($void.hasClass('is-popping') || $void.hasClass('is-dormant') || $void.hasClass('is-reforming') || $void.hasClass('is-hidden'))
				return;

			clickCount += 1;

			if (clickCount < 3) {
				playJump();
				queueClickReset();
				return;
			}

			window.clearTimeout(clickResetTimer);
			window.clearTimeout(stageTimer);
			resetClickProgress();
			$void.removeClass('is-jumping').addClass('is-popping');

			window.setTimeout(function() {
				$void.removeClass('is-popping').addClass('is-dormant');
			}, 850);

			window.setTimeout(function() {
				applyRandomPositionAndColor();
				$void.removeClass('is-dormant').addClass('is-reforming');
			}, 4300);

			window.setTimeout(function() {
				$void.removeClass('is-reforming');
			}, 5000);

		});

	});

})(jQuery);
