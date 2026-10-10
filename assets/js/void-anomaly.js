(function($) {

	$(function() {

		var $body = $('body');

		// Footer version marker.
		$('.site-version').text('V49');

		if ($('#void-anomaly').length > 0)
			return;

		$('head').append(
			'<style id="void-anomaly-styles">' +
				'.void-anomaly {' +
					'position: absolute;' +
					'top: 9.5rem;' +
					'right: 17.5%;' +
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
					'inset: 0;' +
					'border-radius: 50%;' +
					'pointer-events: none;' +
				'}' +
				'.void-anomaly-core {' +
					'inset: 4px;' +
					'background: radial-gradient(circle at 42% 38%, #05050b 0%, #010102 58%, rgba(0, 0, 0, 0.02) 72%);' +
					'box-shadow: inset 0 0 5px #000, 0 0 5px rgba(125, 8, 226, 0.72), 0 0 9px rgba(33, 248, 247, 0.34);' +
					'animation: voidAnomalyPulse 4.8s ease-in-out infinite;' +
				'}' +
				'.void-anomaly-ring {' +
					'inset: 1px;' +
					'border: 1px solid rgba(33, 248, 247, 0.42);' +
					'border-left-color: rgba(125, 8, 226, 0.86);' +
					'border-bottom-color: rgba(245, 237, 44, 0.42);' +
					'box-shadow: 0 0 8px rgba(125, 8, 226, 0.34), inset 0 0 7px rgba(0, 0, 0, 0.9);' +
					'animation: voidAnomalySpin 5.8s linear infinite;' +
				'}' +
				'.void-anomaly-particles {' +
					'position: absolute;' +
					'inset: 0;' +
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
				'@keyframes voidAnomalySpin {' +
					'from { transform: rotate(0deg); }' +
					'to { transform: rotate(360deg); }' +
				'}' +
				'@keyframes voidAnomalyShatter {' +
					'0% { transform: scale(1); opacity: 1; }' +
					'24% { transform: scale(2.45); opacity: 1; }' +
					'100% { transform: scale(1.15); opacity: 0; }' +
				'}' +
				'@keyframes voidAnomalyRingBreak {' +
					'0% { transform: rotate(0deg) scale(1); opacity: 1; }' +
					'40% { transform: rotate(120deg) scale(1.55); opacity: 0.85; }' +
					'100% { transform: rotate(260deg) scale(2.55); opacity: 0; }' +
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
					'.void-anomaly.is-shattering { opacity: 0; }' +
				'}' +
			'</style>'
		);

		var particleMarkup = '';

		for (var i = 0; i < 16; i++) {
			particleMarkup += '<span class="void-anomaly-particle" style="--void-angle:' + (i * 22.5) + 'deg; --void-distance:' + (22 + (i % 5) * 5) + 'px; --void-delay:' + (i % 4) * 24 + 'ms;"></span>';
		}

		var $void = $(
			'<button type="button" id="void-anomaly" class="void-anomaly" aria-label="Shatter hidden void anomaly">' +
				'<span class="void-anomaly-core" aria-hidden="true"></span>' +
				'<span class="void-anomaly-ring" aria-hidden="true"></span>' +
				'<span class="void-anomaly-particles" aria-hidden="true">' + particleMarkup + '</span>' +
			'</button>'
		);

		$body.append($void);

		$void.on('click', function() {

			if ($void.hasClass('is-shattering') || $void.hasClass('is-dormant'))
				return;

			$void.addClass('is-shattering');

			window.setTimeout(function() {
				$void.removeClass('is-shattering').addClass('is-dormant');
			}, 920);

			window.setTimeout(function() {
				$void.removeClass('is-dormant').addClass('is-reforming');
			}, 7600);

			window.setTimeout(function() {
				$void.removeClass('is-reforming');
			}, 8350);

		});

	});

})(jQuery);
