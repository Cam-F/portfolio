(function($) {

	$(function() {

		var $body = $('body');

		// Footer version marker.
		$('.site-version').text('V50');

		if ($('#void-anomaly').length > 0)
			return;

		$('head').append(
			'<style id="void-anomaly-styles">' +
				'.void-anomaly {' +
					'position: absolute;' +
					'top: var(--void-top, 9.5rem);' +
					'left: var(--void-left, auto);' +
					'right: var(--void-right, auto);' +
					'z-index: 3;' +
					'width: 18px;' +
					'height: 18px;' +
					'padding: 0;' +
					'border: 0;' +
					'border-radius: 50%;' +
					'background: transparent;' +
					'cursor: pointer;' +
					'opacity: 0.82;' +
					'overflow: visible;' +
					'appearance: none;' +
					'-webkit-appearance: none;' +
					'filter: drop-shadow(0 0 7px rgba(33, 248, 247, 0.24));' +
					'transition: opacity 220ms ease, transform 220ms ease, filter 220ms ease;' +
				'}' +
				'.void-anomaly:hover,' +
				'.void-anomaly:focus {' +
					'opacity: 1;' +
					'transform: scale(1.18);' +
					'outline: 0;' +
					'filter: drop-shadow(0 0 10px rgba(33, 248, 247, 0.42));' +
				'}' +
				'.void-anomaly-core,' +
				'.void-anomaly-ring {' +
					'position: absolute;' +
					'border-radius: 50%;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly-core {' +
					'inset: 4px;' +
					'z-index: 2;' +
					'background: radial-gradient(circle at 42% 38%, #05050b 0%, #010102 58%, rgba(0, 0, 0, 0.02) 72%);' +
					'box-shadow: inset 0 0 5px #000, 0 0 5px rgba(125, 8, 226, 0.72), 0 0 9px rgba(33, 248, 247, 0.34);' +
					'animation: voidAnomalyPulse 4.8s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-ring {' +
					'left: -7px;' +
					'top: 5px;' +
					'z-index: 3;' +
					'width: 32px;' +
					'height: 8px;' +
					'border: 1px solid rgba(33, 248, 247, 0.48);' +
					'border-left-color: rgba(125, 8, 226, 0.9);' +
					'border-bottom-color: rgba(245, 237, 44, 0.44);' +
					'background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.24) 48%, rgba(0, 0, 0, 0) 68%);' +
					'box-shadow: 0 0 8px rgba(125, 8, 226, 0.34), inset 0 0 6px rgba(0, 0, 0, 0.92);' +
					'animation: voidAnomalyOrbit 5.8s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-particles {' +
					'position: absolute;' +
					'inset: 0;' +
					'z-index: 4;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly-particle {' +
					'position: absolute;' +
					'left: 50%;' +
					'top: 50%;' +
					'width: 2px;' +
					'height: 2px;' +
					'border-radius: 50%;' +
					'background: #21f8f7;' +
					'box-shadow: 0 0 6px rgba(33, 248, 247, 0.85);' +
					'opacity: 0;' +
					'transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(0);' +
				'}' +
				'.void-anomaly.is-click-one {' +
					'animation: voidAnomalyRumbleOne 420ms ease-out;' +
					'filter: drop-shadow(0 0 11px rgba(33, 248, 247, 0.46));' +
				'}' +
				'.void-anomaly.is-click-one .void-anomaly-core {' +
					'box-shadow: inset 0 0 5px #000, 0 0 8px rgba(125, 8, 226, 0.9), 0 0 12px rgba(33, 248, 247, 0.46);' +
				'}' +
				'.void-anomaly.is-click-two {' +
					'animation: voidAnomalyRumbleTwo 620ms ease-out;' +
					'filter: drop-shadow(0 0 15px rgba(33, 248, 247, 0.62));' +
				'}' +
				'.void-anomaly.is-click-two .void-anomaly-ring {' +
					'animation: voidAnomalyOrbit 620ms linear infinite;' +
					'box-shadow: 0 0 12px rgba(125, 8, 226, 0.58), 0 0 10px rgba(33, 248, 247, 0.38), inset 0 0 7px rgba(0, 0, 0, 0.94);' +
				'}' +
				'.void-anomaly.is-shattering {' +
					'animation: voidAnomalyShatter 900ms cubic-bezier(0.15, 0.85, 0.22, 1) forwards;' +
				'}' +
				'.void-anomaly.is-shattering .void-anomaly-ring {' +
					'animation: voidAnomalyRingBreak 900ms ease-out forwards;' +
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
				'@keyframes voidAnomalyPulse {' +
					'0%, 100% { transform: scale(0.92); }' +
					'50% { transform: scale(1.18); }' +
				'}' +
				'@keyframes voidAnomalyOrbit {' +
					'0% { transform: rotate(-20deg) scaleX(1); }' +
					'50% { transform: rotate(160deg) scaleX(1.04); }' +
					'100% { transform: rotate(340deg) scaleX(1); }' +
				'}' +
				'@keyframes voidAnomalyRumbleOne {' +
					'0%, 100% { transform: translate(0, 0) scale(1); }' +
					'25% { transform: translate(-1px, 0) scale(1.08); }' +
					'50% { transform: translate(1px, -1px) scale(1.04); }' +
					'75% { transform: translate(0, 1px) scale(1.1); }' +
				'}' +
				'@keyframes voidAnomalyRumbleTwo {' +
					'0%, 100% { transform: translate(0, 0) scale(1); }' +
					'15% { transform: translate(-2px, 1px) scale(1.18); }' +
					'30% { transform: translate(2px, -1px) scale(1.08); }' +
					'45% { transform: translate(-2px, -2px) scale(1.22); }' +
					'60% { transform: translate(2px, 1px) scale(1.12); }' +
					'78% { transform: translate(-1px, 2px) scale(1.2); }' +
				'}' +
				'@keyframes voidAnomalyShatter {' +
					'0% { transform: scale(1); opacity: 1; }' +
					'24% { transform: scale(2.45); opacity: 1; }' +
					'100% { transform: scale(1.15); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyRingBreak {' +
					'0% { transform: rotate(-20deg) scaleX(1) scaleY(1); opacity: 1; }' +
					'40% { transform: rotate(120deg) scaleX(1.7) scaleY(1.35); opacity: 0.85; }' +
					'100% { transform: rotate(260deg) scaleX(2.7) scaleY(1.9); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyCoreCollapse {' +
					'0% { transform: scale(1); opacity: 1; }' +
					'32% { transform: scale(0.6); opacity: 1; }' +
					'100% { transform: scale(0.05); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyParticle {' +
					'0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(0); }' +
					'18% { opacity: 1; }' +
					'100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--void-angle)) translateX(var(--void-distance)); }' +
				'}' +
				'@keyframes voidAnomalyReform {' +
					'0% { transform: scale(0.1); opacity: 0; }' +
					'60% { transform: scale(1.35); opacity: 0.92; }' +
					'100% { transform: scale(1); opacity: 0.82; }' +
				'}' +
				'@media screen and (max-width: 980px) {' +
					'.void-anomaly { display: none; }' +
				'}' +
				'@media (prefers-reduced-motion: reduce) {' +
					'.void-anomaly,' +
					'.void-anomaly-core,' +
					'.void-anomaly-ring,' +
					'.void-anomaly-particle {' +
						'animation: none !important;' +
						'transition: none !important;' +
					'}' +
					'.void-anomaly.is-click-one,' +
					'.void-anomaly.is-click-two {' +
						'transform: scale(1.12);' +
					'}' +
					'.void-anomaly.is-shattering { opacity: 0; }' +
				'}' +
			'</style>'
		);

		var voidPositions = [
			{ name: 'upper-left', top: '8.95rem', left: '11.5%', right: 'auto' },
			{ name: 'upper-right', top: '8.75rem', left: 'auto', right: '8.7%' },
			{ name: 'lower-left', top: '17.6rem', left: '28.2%', right: 'auto' },
			{ name: 'lower-right', top: '17.35rem', left: 'auto', right: '22.3%' }
		];

		var particleMarkup = '';

		for (var i = 0; i < 16; i++) {
			particleMarkup += '<span class="void-anomaly-particle" style="--void-angle:' + (i * 22.5) + 'deg; --void-distance:' + (22 + (i % 5) * 5) + 'px; --void-delay:' + (i % 4) * 24 + 'ms;"></span>';
		}

		var $void = $(
			'<button type="button" id="void-anomaly" class="void-anomaly" aria-label="Charge hidden void anomaly">' +
				'<span class="void-anomaly-core" aria-hidden="true"></span>' +
				'<span class="void-anomaly-ring" aria-hidden="true"></span>' +
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
					'--void-top': position.top,
					'--void-left': position.left,
					'--void-right': position.right
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

		$body.append($void);
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
