(function($) {

	$(function() {

		var $body = $('body'),
			$host = $('#banner header').first();

		// Footer version marker.
		$('.site-version').text('V52');

		if ($('#void-anomaly').length > 0)
			return;

		if ($host.length === 0)
			$host = $body;

		$host.addClass('void-anomaly-host');

		$('head').append(
			'<style id="void-anomaly-styles">' +
				'#banner header.void-anomaly-host {' +
					'position: relative;' +
					'overflow: visible;' +
				'}' +
				'.void-anomaly {' +
					'position: absolute;' +
					'z-index: 8;' +
					'width: 38px;' +
					'height: 28px;' +
					'padding: 0;' +
					'border: 0;' +
					'background: transparent;' +
					'cursor: pointer;' +
					'opacity: 0.92;' +
					'overflow: visible;' +
					'appearance: none;' +
					'-webkit-appearance: none;' +
					'filter: drop-shadow(0 0 6px rgba(255, 94, 0, 0.34)) drop-shadow(0 0 8px rgba(33, 159, 255, 0.25));' +
					'transition: opacity 220ms ease, transform 220ms ease, filter 220ms ease;' +
				'}' +
				'.void-anomaly:hover,' +
				'.void-anomaly:focus {' +
					'opacity: 1;' +
					'transform: scale(1.13);' +
					'outline: 0;' +
					'filter: drop-shadow(0 0 8px rgba(255, 126, 0, 0.55)) drop-shadow(0 0 10px rgba(57, 181, 255, 0.42));' +
				'}' +
				'.void-anomaly-light-tail,' +
				'.void-anomaly-accretion,' +
				'.void-anomaly-core,' +
				'.void-anomaly-particles {' +
					'position: absolute;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly-light-tail {' +
					'left: -17px;' +
					'top: 8px;' +
					'z-index: 1;' +
					'width: 72px;' +
					'height: 14px;' +
					'border-radius: 999px;' +
					'background: linear-gradient(90deg, rgba(48, 167, 255, 0.34) 0%, rgba(48, 167, 255, 0.18) 20%, rgba(0, 0, 0, 0) 39%, rgba(255, 247, 174, 0.54) 51%, rgba(255, 153, 0, 0.50) 65%, rgba(255, 56, 0, 0.18) 100%);' +
					'filter: blur(2px);' +
					'transform: rotate(-13deg);' +
					'animation: voidAnomalyTail 4.8s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-accretion {' +
					'left: -8px;' +
					'top: 7px;' +
					'z-index: 2;' +
					'width: 56px;' +
					'height: 15px;' +
					'border-radius: 50%;' +
					'background: conic-gradient(from 214deg, rgba(255, 44, 0, 0.08), rgba(255, 72, 0, 0.88), rgba(255, 163, 0, 0.98), rgba(255, 246, 153, 0.96), rgba(255, 180, 18, 0.92), rgba(255, 80, 0, 0.68), rgba(77, 166, 255, 0.38), rgba(255, 44, 0, 0.08));' +
					'box-shadow: 0 0 8px rgba(255, 111, 0, 0.72), 0 0 13px rgba(255, 26, 0, 0.34), 0 0 10px rgba(66, 168, 255, 0.28);' +
					'transform: rotate(-13deg);' +
					'animation: voidAnomalyDisk 5.6s linear infinite;' +
				'}' +
				'.void-anomaly-accretion:after {' +
					'content: "";' +
					'position: absolute;' +
					'inset: 3px 6px;' +
					'border-radius: 50%;' +
					'border-top: 2px solid rgba(255, 236, 123, 0.92);' +
					'border-bottom: 2px solid rgba(255, 75, 0, 0.58);' +
					'filter: blur(0.2px);' +
				'}' +
				'.void-anomaly-core {' +
					'left: 14px;' +
					'top: 4px;' +
					'z-index: 3;' +
					'width: 20px;' +
					'height: 18px;' +
					'border-radius: 50%;' +
					'background: #000;' +
					'transform: rotate(-11deg) scaleX(1.12);' +
					'box-shadow: inset -2px 1px 0 rgba(255, 255, 255, 0.58), -5px 4px 7px rgba(255, 184, 22, 0.82), 5px -2px 9px rgba(56, 174, 255, 0.50), 0 0 13px rgba(0, 0, 0, 0.95);' +
					'animation: voidAnomalyCorePulse 4.6s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-particles {' +
					'inset: 0;' +
					'z-index: 5;' +
				'}' +
				'.void-anomaly-particle {' +
					'position: absolute;' +
					'left: 50%;' +
					'top: 50%;' +
					'width: 2px;' +
					'height: 2px;' +
					'border-radius: 50%;' +
					'background: var(--void-particle-color);' +
					'box-shadow: 0 0 7px var(--void-particle-color);' +
					'opacity: 0;' +
					'transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(0);' +
				'}' +
				'.void-anomaly.is-click-one {' +
					'animation: voidAnomalyRumbleOne 420ms ease-out;' +
				'}' +
				'.void-anomaly.is-click-one .void-anomaly-accretion {' +
					'filter: brightness(1.28) saturate(1.18);' +
				'}' +
				'.void-anomaly.is-click-two {' +
					'animation: voidAnomalyRumbleTwo 620ms ease-out;' +
					'filter: drop-shadow(0 0 11px rgba(255, 126, 0, 0.72)) drop-shadow(0 0 13px rgba(57, 181, 255, 0.55));' +
				'}' +
				'.void-anomaly.is-click-two .void-anomaly-accretion {' +
					'animation: voidAnomalyDisk 500ms linear infinite;' +
					'filter: brightness(1.42) saturate(1.34);' +
				'}' +
				'.void-anomaly.is-shattering {' +
					'animation: voidAnomalyShatter 900ms cubic-bezier(0.15, 0.85, 0.22, 1) forwards;' +
				'}' +
				'.void-anomaly.is-shattering .void-anomaly-light-tail {' +
					'animation: voidAnomalyTailBreak 900ms ease-out forwards;' +
				'}' +
				'.void-anomaly.is-shattering .void-anomaly-accretion {' +
					'animation: voidAnomalyDiskBreak 900ms ease-out forwards;' +
				'}' +
				'.void-anomaly.is-shattering .void-anomaly-core {' +
					'animation: voidAnomalyCoreCollapse 900ms ease-out forwards;' +
				'}' +
				'.void-anomaly.is-shattering .void-anomaly-particle {' +
					'animation: voidAnomalyParticle 900ms cubic-bezier(0.13, 0.82, 0.33, 1) forwards;' +
					'animation-delay: var(--void-delay);' +
				'}' +
				'.void-anomaly.is-dormant {' +
					'opacity: 0;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly.is-reforming {' +
					'animation: voidAnomalyReform 700ms ease-out forwards;' +
				'}' +
				'@keyframes voidAnomalyTail {' +
					'0%, 100% { opacity: 0.64; transform: rotate(-13deg) scaleX(0.94); }' +
					'50% { opacity: 0.9; transform: rotate(-13deg) scaleX(1.05); }' +
				'}' +
				'@keyframes voidAnomalyDisk {' +
					'0% { transform: rotate(-13deg) scaleX(1); }' +
					'50% { transform: rotate(167deg) scaleX(1.05); }' +
					'100% { transform: rotate(347deg) scaleX(1); }' +
				'}' +
				'@keyframes voidAnomalyCorePulse {' +
					'0%, 100% { transform: rotate(-11deg) scaleX(1.12) scale(0.96); }' +
					'50% { transform: rotate(-11deg) scaleX(1.12) scale(1.05); }' +
				'}' +
				'@keyframes voidAnomalyRumbleOne {' +
					'0%, 100% { transform: translate(0, 0) scale(1); }' +
					'25% { transform: translate(-1px, 0) scale(1.07); }' +
					'50% { transform: translate(1px, -1px) scale(1.04); }' +
					'75% { transform: translate(0, 1px) scale(1.09); }' +
				'}' +
				'@keyframes voidAnomalyRumbleTwo {' +
					'0%, 100% { transform: translate(0, 0) scale(1); }' +
					'15% { transform: translate(-2px, 1px) scale(1.17); }' +
					'30% { transform: translate(2px, -1px) scale(1.08); }' +
					'45% { transform: translate(-2px, -2px) scale(1.2); }' +
					'60% { transform: translate(2px, 1px) scale(1.12); }' +
					'78% { transform: translate(-1px, 2px) scale(1.18); }' +
				'}' +
				'@keyframes voidAnomalyShatter {' +
					'0% { transform: scale(1); opacity: 1; }' +
					'24% { transform: scale(2.1); opacity: 1; }' +
					'100% { transform: scale(1.1); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyTailBreak {' +
					'0% { transform: rotate(-13deg) scaleX(1); opacity: 0.95; }' +
					'100% { transform: rotate(-23deg) scaleX(2.4); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyDiskBreak {' +
					'0% { transform: rotate(-13deg) scaleX(1) scaleY(1); opacity: 1; }' +
					'45% { transform: rotate(120deg) scaleX(1.7) scaleY(1.22); opacity: 0.9; }' +
					'100% { transform: rotate(260deg) scaleX(2.6) scaleY(1.75); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyCoreCollapse {' +
					'0% { transform: rotate(-11deg) scaleX(1.12) scale(1); opacity: 1; }' +
					'32% { transform: rotate(-11deg) scaleX(1.12) scale(0.56); opacity: 1; }' +
					'100% { transform: rotate(-11deg) scaleX(1.12) scale(0.05); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyParticle {' +
					'0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(0); }' +
					'18% { opacity: 1; }' +
					'100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(var(--void-distance)); }' +
				'}' +
				'@keyframes voidAnomalyReform {' +
					'0% { transform: scale(0.1); opacity: 0; }' +
					'60% { transform: scale(1.25); opacity: 0.96; }' +
					'100% { transform: scale(1); opacity: 0.92; }' +
				'}' +
				'@media screen and (max-width: 736px) {' +
					'.void-anomaly { display: none; }' +
				'}' +
				'@media (prefers-reduced-motion: reduce) {' +
					'.void-anomaly,' +
					'.void-anomaly-light-tail,' +
					'.void-anomaly-accretion,' +
					'.void-anomaly-core,' +
					'.void-anomaly-particle {' +
						'animation: none !important;' +
						'transition: none !important;' +
					'}' +
					'.void-anomaly.is-click-one,' +
					'.void-anomaly.is-click-two {' +
						'transform: scale(1.1);' +
					'}' +
					'.void-anomaly.is-shattering { opacity: 0; }' +
				'}' +
			'</style>'
		);

		var voidPositions = [
			{ name: 'name-upper-left', top: '0.85rem', left: 'calc(50% - 18.2rem)' },
			{ name: 'name-upper-right', top: '0.85rem', left: 'calc(50% + 16.4rem)' },
			{ name: 'title-lower-left', top: '5.95rem', left: 'calc(50% - 8.35rem)' },
			{ name: 'title-lower-right', top: '5.95rem', left: 'calc(50% + 7.25rem)' }
		];

		var particleMarkup = '',
			particleColors = ['#ff5300', '#ffb000', '#fff09a', '#38aeff'];

		for (var i = 0; i < 18; i++) {
			particleMarkup += '<span class="void-anomaly-particle" style="--void-angle:' + (i * 20) + 'deg; --void-distance:' + (24 + (i % 6) * 5) + 'px; --void-delay:' + (i % 5) * 22 + 'ms; --void-particle-color:' + particleColors[i % particleColors.length] + ';"></span>';
		}

		var $void = $(
			'<button type="button" id="void-anomaly" class="void-anomaly" aria-label="Charge hidden void anomaly">' +
				'<span class="void-anomaly-light-tail" aria-hidden="true"></span>' +
				'<span class="void-anomaly-accretion" aria-hidden="true"></span>' +
				'<span class="void-anomaly-core" aria-hidden="true"></span>' +
				'<span class="void-anomaly-particles" aria-hidden="true">' + particleMarkup + '</span>' +
			'</button>'
		);

		var activePositionIndex = -1,
			clickCount = 0,
			clickResetTimer = null,
			stageTimer = null;

		var choosePositionIndex = function() {
			var nextIndex;

			if (voidPositions.length <= 1)
				return 0;

			do {
				nextIndex = Math.floor(Math.random() * voidPositions.length);
			} while (nextIndex === activePositionIndex);

			return nextIndex;
		};

		var applyRandomPosition = function() {
			var position;

			activePositionIndex = choosePositionIndex();
			position = voidPositions[activePositionIndex];

			$void
				.attr('data-void-position', position.name)
				.css({
					top: position.top,
					left: position.left,
					right: 'auto'
				});
		};

		var resetClickProgress = function() {
			clickCount = 0;
			$void.removeClass('is-click-one is-click-two');
		};

		var queueClickReset = function() {
			window.clearTimeout(clickResetTimer);
			clickResetTimer = window.setTimeout(resetClickProgress, 3800);
		};

		var playClickStage = function(stageClass, duration) {
			window.clearTimeout(stageTimer);
			$void.removeClass('is-click-one is-click-two');

			if ($void[0])
				$void[0].offsetWidth;

			$void.addClass(stageClass);

			stageTimer = window.setTimeout(function() {
				$void.removeClass(stageClass);
			}, duration);
		};

		$host.append($void);
		applyRandomPosition();

		$void.on('click', function() {

			if ($void.hasClass('is-shattering') || $void.hasClass('is-dormant') || $void.hasClass('is-reforming'))
				return;

			clickCount += 1;

			if (clickCount === 1) {
				playClickStage('is-click-one', 420);
				queueClickReset();
				return;
			}

			if (clickCount === 2) {
				playClickStage('is-click-two', 620);
				queueClickReset();
				return;
			}

			window.clearTimeout(clickResetTimer);
			window.clearTimeout(stageTimer);
			resetClickProgress();
			$void.addClass('is-shattering');

			window.setTimeout(function() {
				$void.removeClass('is-shattering').addClass('is-dormant');
			}, 920);

			window.setTimeout(function() {
				applyRandomPosition();
				$void.removeClass('is-dormant').addClass('is-reforming');
			}, 7600);

			window.setTimeout(function() {
				$void.removeClass('is-reforming');
			}, 8350);

		});

	});

})(jQuery);
