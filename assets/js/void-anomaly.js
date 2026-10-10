(function($) {

	$(function() {

		var $body = $('body'),
			$host = $('#banner header').first();

		// Footer version marker.
		$('.site-version').text('V54');

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
					'width: 22px;' +
					'height: 22px;' +
					'padding: 0;' +
					'border: 0;' +
					'border-radius: 50%;' +
					'background: transparent;' +
					'cursor: pointer;' +
					'opacity: 0.92;' +
					'overflow: visible;' +
					'appearance: none;' +
					'-webkit-appearance: none;' +
					'transform: translate(-50%, -50%);' +
					'transition: top 260ms ease, left 260ms ease, opacity 220ms ease, filter 220ms ease;' +
					'filter: drop-shadow(0 0 9px var(--orb-glow, rgba(33, 248, 247, 0.45)));' +
				'}' +
				'.void-anomaly:hover,' +
				'.void-anomaly:focus {' +
					'opacity: 1;' +
					'outline: 0;' +
					'filter: drop-shadow(0 0 14px var(--orb-glow, rgba(33, 248, 247, 0.65)));' +
				'}' +
				'.void-anomaly-core,' +
				'.void-anomaly-particles {' +
					'position: absolute;' +
					'inset: 0;' +
					'border-radius: 50%;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly-core {' +
					'background: radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.95) 0%, var(--orb-rim, #21f8f7) 16%, var(--orb-core, #21f8f7) 48%, rgba(0, 0, 0, 0.92) 100%);' +
					'box-shadow: inset -2px -3px 7px rgba(0, 0, 0, 0.82), 0 0 8px var(--orb-glow, rgba(33, 248, 247, 0.5)), 0 0 22px var(--orb-wide, rgba(33, 248, 247, 0.24));' +
					'animation: voidOrbPulse 3.8s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-core:after {' +
					'content: "";' +
					'position: absolute;' +
					'inset: -5px;' +
					'border-radius: 50%;' +
					'border: 1px solid var(--orb-rim, #21f8f7);' +
					'opacity: 0.28;' +
					'box-shadow: 0 0 12px var(--orb-glow, rgba(33, 248, 247, 0.45));' +
				'}' +
				'.void-anomaly-particle {' +
					'position: absolute;' +
					'left: 50%;' +
					'top: 50%;' +
					'width: 3px;' +
					'height: 3px;' +
					'border-radius: 50%;' +
					'background: var(--orb-rim, #21f8f7);' +
					'box-shadow: 0 0 7px var(--orb-glow, rgba(33, 248, 247, 0.8));' +
					'opacity: 0;' +
					'transform: translate(-50%, -50%) rotate(var(--orb-angle)) translateX(0);' +
				'}' +
				'.void-anomaly.is-jumping {' +
					'animation: voidOrbJump 360ms ease-out;' +
				'}' +
				'.void-anomaly.is-popping {' +
					'animation: voidOrbPop 820ms cubic-bezier(0.15, 0.85, 0.22, 1) forwards;' +
				'}' +
				'.void-anomaly.is-popping .void-anomaly-core {' +
					'animation: voidOrbCorePop 820ms ease-out forwards;' +
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
					'0%, 100% { transform: scale(0.9); }' +
					'50% { transform: scale(1.12); }' +
				'}' +
				'@keyframes voidOrbJump {' +
					'0% { transform: translate(-50%, -50%) scale(1); }' +
					'45% { transform: translate(-50%, -50%) scale(1.38); }' +
					'100% { transform: translate(-50%, -50%) scale(1); }' +
				'}' +
				'@keyframes voidOrbPop {' +
					'0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }' +
					'25% { transform: translate(-50%, -50%) scale(1.85); opacity: 1; }' +
					'100% { transform: translate(-50%, -50%) scale(0.45); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbCorePop {' +
					'0% { transform: scale(1); opacity: 1; }' +
					'35% { transform: scale(0.55); opacity: 1; }' +
					'100% { transform: scale(0.05); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbParticle {' +
					'0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--orb-angle)) translateX(0); }' +
					'18% { opacity: 1; }' +
					'100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--orb-angle)) translateX(var(--orb-distance)); }' +
				'}' +
				'@keyframes voidOrbReform {' +
					'0% { transform: translate(-50%, -50%) scale(0.15); opacity: 0; }' +
					'55% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.9; }' +
					'100% { transform: translate(-50%, -50%) scale(1); opacity: 0.92; }' +
				'}' +
				'@media screen and (max-width: 736px) {' +
					'.void-anomaly { display: none; }' +
				'}' +
				'@media (prefers-reduced-motion: reduce) {' +
					'.void-anomaly,' +
					'.void-anomaly-core,' +
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
			{ name: 'dust', core: '#f5ed2c', rim: '#fff46a', glow: 'rgba(245, 237, 44, 0.7)', wide: 'rgba(245, 237, 44, 0.28)' },
			{ name: 'redacted', core: '#080808', rim: '#a6a6a6', glow: 'rgba(0, 0, 0, 0.82)', wide: 'rgba(170, 170, 170, 0.22)' },
			{ name: 'wayfinder', core: '#7d08e2', rim: '#b35cff', glow: 'rgba(125, 8, 226, 0.72)', wide: 'rgba(125, 8, 226, 0.3)' },
			{ name: 'ruined-king', core: '#449e7d', rim: '#7ee1ba', glow: 'rgba(68, 158, 125, 0.72)', wide: 'rgba(68, 158, 125, 0.3)' },
			{ name: 'jar-wars', core: '#c65955', rim: '#68dad4', glow: 'rgba(104, 218, 212, 0.72)', wide: 'rgba(198, 89, 85, 0.3)' },
			{ name: 'vicious-circle', core: '#21f8f7', rim: '#8dffff', glow: 'rgba(33, 248, 247, 0.76)', wide: 'rgba(33, 248, 247, 0.3)' }
		];

		for (var i = 0; i < 18; i++) {
			particleMarkup += '<span class="void-anomaly-particle" style="--orb-angle:' + (i * 20) + 'deg; --orb-distance:' + (24 + (i % 6) * 5) + 'px; --orb-delay:' + (i % 5) * 18 + 'ms;"></span>';
		}

		var $void = $(
			'<button type="button" id="void-anomaly" class="void-anomaly" aria-label="Hidden color orb anomaly">' +
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

		var centerY = function(rect) {
			return rect.top + ((rect.bottom - rect.top) * 0.5);
		};

		var buildSafePositions = function() {
			var hostRect = $host[0].getBoundingClientRect(),
				padding = 22,
				orbSize = 58,
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

			var addSideCandidates = function(label, rect, offset) {
				if (!rect)
					return;

				addCandidate(label + '-left', rect.left - offset, centerY(rect));
				addCandidate(label + '-right', rect.right + offset, centerY(rect));
			};

			addSideCandidates('name', nameRect, 36);
			addSideCandidates('title', titleRect, 36);
			addSideCandidates('links', linksRect, 42);

			if (nameRect && titleRect) {
				addCandidate('between-name-title-left', Math.min(nameRect.left, titleRect.left) - 38, (nameRect.bottom + titleRect.top) * 0.5);
				addCandidate('between-name-title-right', Math.max(nameRect.right, titleRect.right) + 38, (nameRect.bottom + titleRect.top) * 0.5);
			}

			if (titleRect && linksRect) {
				addCandidate('between-title-links-left', Math.min(titleRect.left, linksRect.left) - 42, (titleRect.bottom + linksRect.top) * 0.5);
				addCandidate('between-title-links-right', Math.max(titleRect.right, linksRect.right) + 42, (titleRect.bottom + linksRect.top) * 0.5);
			}

			return candidates;
		};

		var choosePosition = function() {
			var choices, index;

			if (availablePositions.length === 0)
				return null;

			choices = availablePositions.filter(function(position) {
				return position.name !== activePositionName;
			});

			if (choices.length === 0)
				choices = availablePositions;

			index = Math.floor(Math.random() * choices.length);

			return choices[index];
		};

		var applyPosition = function(position) {
			if (!position)
				return;

			activePositionName = position.name;

			$void
				.removeClass('is-hidden')
				.attr('data-orb-position', position.name)
				.css({
					top: position.y + 'px',
					left: position.x + 'px',
					right: 'auto'
				});
		};

		var refreshPositions = function(keepCurrent) {
			var currentPosition = null,
				position;

			availablePositions = buildSafePositions();

			if (availablePositions.length === 0) {
				$void.addClass('is-hidden');
				activePositionName = null;
				return;
			}

			if (keepCurrent && activePositionName) {
				for (var i = 0; i < availablePositions.length; i++) {
					if (availablePositions[i].name === activePositionName) {
						currentPosition = availablePositions[i];
						break;
					}
				}
			}

			position = currentPosition || choosePosition();
			applyPosition(position);
		};

		var choosePaletteIndex = function() {
			var index;

			if (palettes.length <= 1)
				return 0;

			do {
				index = Math.floor(Math.random() * palettes.length);
			} while (index === activeColorIndex);

			return index;
		};

		var applyPalette = function() {
			var palette;

			activeColorIndex = choosePaletteIndex();
			palette = palettes[activeColorIndex];

			if ($void[0]) {
				$void[0].style.setProperty('--orb-core', palette.core);
				$void[0].style.setProperty('--orb-rim', palette.rim);
				$void[0].style.setProperty('--orb-glow', palette.glow);
				$void[0].style.setProperty('--orb-wide', palette.wide);
			}

			$void.attr('data-orb-palette', palette.name);
		};

		var resetClickProgress = function() {
			clickCount = 0;
		};

		var queueClickReset = function() {
			window.clearTimeout(clickResetTimer);
			clickResetTimer = window.setTimeout(resetClickProgress, 4200);
		};

		var playJump = function() {
			window.clearTimeout(stageTimer);
			$void.removeClass('is-jumping');

			if ($void[0])
				$void[0].offsetWidth;

			refreshPositions(false);
			applyPalette();
			$void.addClass('is-jumping');

			stageTimer = window.setTimeout(function() {
				$void.removeClass('is-jumping');
			}, 380);
		};

		var playPop = function() {
			window.clearTimeout(clickResetTimer);
			window.clearTimeout(stageTimer);
			resetClickProgress();

			$void.removeClass('is-jumping is-reforming').addClass('is-popping');

			window.setTimeout(function() {
				$void.removeClass('is-popping').addClass('is-dormant');
			}, 850);

			window.setTimeout(function() {
				refreshPositions(false);
				applyPalette();
				$void.removeClass('is-dormant').addClass('is-reforming');
			}, 1600);

			window.setTimeout(function() {
				$void.removeClass('is-reforming');
			}, 2250);
		};

		$host.append($void);
		refreshPositions(false);
		applyPalette();

		$void.on('click', function() {

			if ($void.hasClass('is-popping') || $void.hasClass('is-dormant') || $void.hasClass('is-reforming') || $void.hasClass('is-hidden'))
				return;

			clickCount += 1;

			if (clickCount < 3) {
				playJump();
				queueClickReset();
				return;
			}

			playPop();

		});

		$(window).on('resize orientationchange', function() {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(function() {
				refreshPositions(true);
			}, 140);
		});

	});

})(jQuery);
