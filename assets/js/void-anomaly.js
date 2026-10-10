(function($) {

	$(function() {

		var $body = $('body'),
			$host = $('#banner header').first();

		// Footer version marker.
		$('.site-version').text('V53');

		if ($('#void-anomaly').length > 0)
			return;

		if ($host.length === 0)
			$host = $body;

		$host.addClass('void-anomaly-host');

		$('head').append(
			'<style id="void-anomaly-styles">' +
				'.void-anomaly-host {' +
					'position: relative;' +
				'}' +
				'.void-anomaly {' +
					'position: absolute;' +
					'z-index: 8;' +
					'width: 16px;' +
					'height: 16px;' +
					'padding: 0;' +
					'border: 0;' +
					'border-radius: 50%;' +
					'background: transparent;' +
					'cursor: pointer;' +
					'opacity: 0.92;' +
					'overflow: visible;' +
					'appearance: none;' +
					'-webkit-appearance: none;' +
					'transform: translate(-50%, -50%) scale(1);' +
					'transition: top 240ms cubic-bezier(0.18, 0.89, 0.32, 1.28), left 240ms cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 180ms ease, filter 180ms ease;' +
				'}' +
				'.void-anomaly:hover,' +
				'.void-anomaly:focus {' +
					'opacity: 1;' +
					'outline: 0;' +
				'}' +
				'.void-orb-core,' +
				'.void-orb-shine,' +
				'.void-orb-ring,' +
				'.void-orb-particles {' +
					'position: absolute;' +
					'pointer-events: none;' +
				'}' +
				'.void-orb-core {' +
					'inset: 0;' +
					'border-radius: 50%;' +
					'animation: voidOrbPulse 3.8s ease-in-out infinite;' +
				'}' +
				'.void-orb-shine {' +
					'left: 3px;' +
					'top: 3px;' +
					'width: 4px;' +
					'height: 4px;' +
					'border-radius: 50%;' +
					'background: rgba(255, 255, 255, 0.72);' +
					'filter: blur(0.3px);' +
					'opacity: 0.72;' +
				'}' +
				'.void-orb-ring {' +
					'left: -5px;' +
					'top: 5px;' +
					'width: 26px;' +
					'height: 6px;' +
					'border-radius: 50%;' +
					'border: 1px solid rgba(255, 255, 255, 0.28);' +
					'opacity: 0.5;' +
					'transform: rotate(-17deg);' +
					'animation: voidOrbOrbit 4.8s ease-in-out infinite;' +
				'}' +
				'.void-orb-particles {' +
					'inset: 0;' +
				'}' +
				'.void-orb-particle {' +
					'position: absolute;' +
					'left: 50%;' +
					'top: 50%;' +
					'width: 2px;' +
					'height: 2px;' +
					'border-radius: 50%;' +
					'opacity: 0;' +
					'transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(0);' +
				'}' +
				'.void-anomaly.is-jumping {' +
					'animation: voidOrbJump 320ms cubic-bezier(0.18, 0.89, 0.32, 1.28);' +
				'}' +
				'.void-anomaly.is-popping {' +
					'animation: voidOrbPop 760ms cubic-bezier(0.14, 0.9, 0.28, 1) forwards;' +
				'}' +
				'.void-anomaly.is-popping .void-orb-ring {' +
					'animation: voidOrbRingPop 760ms ease-out forwards;' +
				'}' +
				'.void-anomaly.is-popping .void-orb-core {' +
					'animation: voidOrbCorePop 760ms ease-out forwards;' +
				'}' +
				'.void-anomaly.is-popping .void-orb-particle {' +
					'animation: voidOrbParticlePop 760ms cubic-bezier(0.13, 0.82, 0.33, 1) forwards;' +
					'animation-delay: var(--void-delay);' +
				'}' +
				'.void-anomaly.is-dormant {' +
					'opacity: 0;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly.is-reforming {' +
					'animation: voidOrbReform 520ms cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;' +
				'}' +
				'@keyframes voidOrbPulse {' +
					'0%, 100% { transform: scale(0.92); }' +
					'50% { transform: scale(1.12); }' +
				'}' +
				'@keyframes voidOrbOrbit {' +
					'0%, 100% { transform: rotate(-17deg) scaleX(1); opacity: 0.42; }' +
					'50% { transform: rotate(163deg) scaleX(1.08); opacity: 0.68; }' +
				'}' +
				'@keyframes voidOrbJump {' +
					'0% { transform: translate(-50%, -50%) scale(1); }' +
					'42% { transform: translate(-50%, -50%) scale(1.55); }' +
					'100% { transform: translate(-50%, -50%) scale(1); }' +
				'}' +
				'@keyframes voidOrbPop {' +
					'0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }' +
					'25% { transform: translate(-50%, -50%) scale(2.15); opacity: 1; }' +
					'100% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbRingPop {' +
					'0% { transform: rotate(-17deg) scaleX(1); opacity: 0.72; }' +
					'100% { transform: rotate(220deg) scaleX(2.2) scaleY(1.8); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbCorePop {' +
					'0% { transform: scale(1); opacity: 1; }' +
					'45% { transform: scale(0.72); opacity: 0.95; }' +
					'100% { transform: scale(0.05); opacity: 0; }' +
				'}' +
				'@keyframes voidOrbParticlePop {' +
					'0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(0); }' +
					'16% { opacity: 1; }' +
					'100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(var(--void-distance)); }' +
				'}' +
				'@keyframes voidOrbReform {' +
					'0% { transform: translate(-50%, -50%) scale(0.12); opacity: 0; }' +
					'70% { transform: translate(-50%, -50%) scale(1.35); opacity: 1; }' +
					'100% { transform: translate(-50%, -50%) scale(1); opacity: 0.92; }' +
				'}' +
				'@media screen and (max-width: 736px) {' +
					'.void-anomaly { display: none; }' +
				'}' +
				'@media (prefers-reduced-motion: reduce) {' +
					'.void-anomaly,' +
					'.void-orb-core,' +
					'.void-orb-ring,' +
					'.void-orb-particle {' +
						'animation: none !important;' +
						'transition: none !important;' +
					'}' +
					'.void-anomaly.is-popping { opacity: 0; }' +
				'}' +
			'</style>'
		);

		var voidPositions = [
			{ name: 'name-upper-left', top: '2.85rem', left: '29%' },
			{ name: 'name-upper-right', top: '2.85rem', left: '71%' },
			{ name: 'title-lower-left', top: '8.35rem', left: '39%' },
			{ name: 'title-lower-right', top: '8.35rem', left: '61%' }
		];

		var orbThemes = [
			{ name: 'dust', color: '#F5ED2C', accent: '#fff9a8', glow: 'rgba(245, 237, 44, 0.58)' },
			{ name: 'redacted', color: '#080808', accent: '#555555', glow: 'rgba(255, 255, 255, 0.34)' },
			{ name: 'wayfinder', color: '#7D08E2', accent: '#ca7cff', glow: 'rgba(125, 8, 226, 0.62)' },
			{ name: 'ruined-king', color: '#449E7D', accent: '#9ff0cb', glow: 'rgba(68, 158, 125, 0.58)' },
			{ name: 'jar-wars-warm', color: '#C65955', accent: '#ffb0a8', glow: 'rgba(198, 89, 85, 0.58)' },
			{ name: 'jar-wars-cool', color: '#68DAD4', accent: '#c9fffb', glow: 'rgba(104, 218, 212, 0.58)' },
			{ name: 'vicious-circle', color: '#21F8F7', accent: '#b4ffff', glow: 'rgba(33, 248, 247, 0.62)' }
		];

		var particleMarkup = '';

		for (var i = 0; i < 16; i++) {
			particleMarkup += '<span class="void-orb-particle" style="--void-angle:' + (i * 22.5) + 'deg; --void-distance:' + (18 + (i % 5) * 5) + 'px; --void-delay:' + (i % 4) * 18 + 'ms;"></span>';
		}

		var $void = $(
			'<button type="button" id="void-anomaly" class="void-anomaly" aria-label="Hidden glowing orb anomaly">' +
				'<span class="void-orb-core" aria-hidden="true"></span>' +
				'<span class="void-orb-shine" aria-hidden="true"></span>' +
				'<span class="void-orb-ring" aria-hidden="true"></span>' +
				'<span class="void-orb-particles" aria-hidden="true">' + particleMarkup + '</span>' +
			'</button>'
		);

		var activePositionIndex = -1,
			activeThemeIndex = -1,
			clickCount = 0,
			jumpTimer = null;

		var chooseIndex = function(list, currentIndex) {
			var nextIndex;

			if (list.length <= 1)
				return 0;

			do {
				nextIndex = Math.floor(Math.random() * list.length);
			} while (nextIndex === currentIndex);

			return nextIndex;
		};

		var applyTheme = function() {
			var theme = orbThemes[activeThemeIndex],
				coreBackground = 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, ' + theme.accent + ' 16%, ' + theme.color + ' 48%, rgba(0,0,0,0.86) 100%)',
				coreShadow = 'inset 0 0 5px rgba(0,0,0,0.88), 0 0 7px ' + theme.color + ', 0 0 18px ' + theme.glow + ', 0 0 34px ' + theme.glow;

			$void
				.attr('data-orb-theme', theme.name)
				.css({
					'filter': 'drop-shadow(0 0 10px ' + theme.glow + ')'
				});

			$void.find('.void-orb-core').css({
				'background': coreBackground,
				'box-shadow': coreShadow
			});

			$void.find('.void-orb-ring').css({
				'border-color': theme.glow,
				'box-shadow': '0 0 8px ' + theme.glow + ', inset 0 0 6px rgba(0, 0, 0, 0.72)'
			});

			$void.find('.void-orb-particle').css({
				'background': theme.accent,
				'box-shadow': '0 0 6px ' + theme.glow
			});
		};

		var moveOrb = function() {
			var position;

			activePositionIndex = chooseIndex(voidPositions, activePositionIndex);
			activeThemeIndex = chooseIndex(orbThemes, activeThemeIndex);

			position = voidPositions[activePositionIndex];

			$void
				.attr('data-void-position', position.name)
				.css({
					'top': position.top,
					'left': position.left,
					'right': 'auto'
				});

			applyTheme();
		};

		var playJump = function() {
			window.clearTimeout(jumpTimer);
			$void.removeClass('is-jumping');

			if ($void[0])
				$void[0].offsetWidth;

			moveOrb();
			$void.addClass('is-jumping');

			jumpTimer = window.setTimeout(function() {
				$void.removeClass('is-jumping');
			}, 340);
		};

		$host.append($void);
		moveOrb();

		$void.on('click', function() {

			if ($void.hasClass('is-popping') || $void.hasClass('is-dormant') || $void.hasClass('is-reforming'))
				return;

			clickCount += 1;

			if (clickCount < 3) {
				playJump();
				return;
			}

			window.clearTimeout(jumpTimer);
			$void.removeClass('is-jumping').addClass('is-popping');

			window.setTimeout(function() {
				$void.removeClass('is-popping').addClass('is-dormant');
			}, 780);

			window.setTimeout(function() {
				clickCount = 0;
				moveOrb();
				$void.removeClass('is-dormant').addClass('is-reforming');
			}, 1650);

			window.setTimeout(function() {
				$void.removeClass('is-reforming');
			}, 2220);

		});

	});

})(jQuery);
