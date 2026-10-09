/*
	Full Motion by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Add NDA-safe unannounced project cards.
			var addUnannouncedCards = function() {
				var $thumbs = $('.thumbnails');

				if ($thumbs.length === 0 || $thumbs.find('.unannounced-game-card').length > 0)
					return;

				if ($('#unannounced-game-card-styles').length === 0) {
					$('head').append('\
						<style id="unannounced-game-card-styles">\
							.unannounced-game-card .nda-card-art-link {\
							\tdisplay: block;\
							\tborder: 0 !important;\
							\tbackground: #090909;\
							}\
							.unannounced-game-card .nda-card-art {\
							\tposition: relative;\
							\tdisplay: block;\
							\theight: 210px;\
							\toverflow: hidden;\
							\tbackground-color: #090909;\
							\tbackground-image: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0px, rgba(255, 255, 255, 0.06) 2px, transparent 2px, transparent 20px), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.035) 0px, rgba(255, 255, 255, 0.035) 1px, transparent 1px, transparent 7px);\
							}\
							.unannounced-game-card .nda-card-art:before {\
							\tcontent: "";\
							\tposition: absolute;\
							\tinset: 0;\
							\tbackground: linear-gradient(90deg, transparent 0 12%, rgba(0, 0, 0, 0.76) 12% 39%, transparent 39% 52%, rgba(0, 0, 0, 0.76) 52% 84%, transparent 84% 100%);\
							\topacity: 0.82;\
							}\
							.unannounced-game-card .nda-card-art:after {\
							\tcontent: "REDACTED";\
							\tposition: absolute;\
							\tleft: 50%;\
							\ttop: 50%;\
							\ttransform: translate(-50%, -50%);\
							\tfont-family: "Courier New", "Lucida Console", monospace;\
							\tfont-size: 2.45em;\
							\tfont-weight: 700;\
							\tletter-spacing: 0.08em;\
							\tcolor: #f5f5f5;\
							\tbackground: #050505;\
							\tborder: 1px solid rgba(255, 255, 255, 0.28);\
							\tpadding: 0.18em 0.42em;\
							\tbox-shadow: 0 10px 22px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -2px 0 rgba(0, 0, 0, 0.8);\
							}\
							.unannounced-game-card .nda-disabled-button {\
							\tcursor: default;\
							\topacity: 0.86;\
							}\
						</style>');
				}

				var cards = [
					{
						title: 'Unannounced Project',
						badges: ['Designer'],
						description: 'Designed gameplay and encounter content for an unannounced project, collaborating across design, art, engineering, VFX, audio, and production while staying NDA-safe.'
					},
					{
						title: 'Unannounced Project',
						badges: ['Designer'],
						description: 'Supported levels, systems, characters, weapons, enemies, and live/event content for an unannounced project, helping drive implementation from concept through iteration.'
					}
				];

				var cardHtml = cards.map(function(card) {
					var badges = card.badges.map(function(badge) {
						return '<span class="game-card-meta-pill">' + badge + '</span>';
					}).join('');

					return '\
						<div class="box game-card unannounced-game-card">\
						\t<a href="images/CameronFullerResume.pdf" target="_blank" class="image fit game-card-main-image nda-card-art-link" aria-label="Resume details for unannounced project"><span class="nda-card-art" aria-hidden="true"></span></a>\
						\t<div class="inner">\
						\t\t<h3>' + card.title + '</h3>\
						\t\t<p class="game-card-developer">Airship Syndicate</p>\
						\t\t<div class="game-card-meta">' + badges + '</div>\
						\t\t<div class="game-card-actions">\
						\t\t\t<span class="button fit nda-disabled-button"><i class="fa fa-lock" aria-hidden="true"></i> Under NDA</span>\
						\t\t\t<a href="images/CameronFullerResume.pdf" target="_blank" class="button fit"><i class="fa fa-file-text" aria-hidden="true"></i> Resume</a>\
						\t\t</div>\
						\t\t<p class="game-card-description">' + card.description + '</p>\
						\t</div>\
						</div>';
				}).join('');

				var $wayfinderCard = $thumbs.find('.game-card').first();

				if ($wayfinderCard.length > 0)
					$wayfinderCard.after(cardHtml);
				else
					$thumbs.append(cardHtml);
			};

			addUnannouncedCards();

		// Banner.
			var $banner = $('#banner');

			if ($banner.length > 0) {

				// IE fix.
					if (skel.vars.IEVersion < 12) {

						$window.on('resize', function() {

							var wh = $window.height() * 0.60,
								bh = $banner.height();

							$banner.css('height', 'auto');

							window.setTimeout(function() {

								if (bh < wh)
									$banner.css('height', wh + 'px');

							}, 0);

						});

						$window.on('load', function() {
							$window.triggerHandler('resize');
						});

					}

				// Video check.
					var video = $banner.data('video');

					if (video)
						$window.on('load.banner', function() {

							// Disable banner load event (so it doesn't fire again).
								$window.off('load.banner');

							// Append video if supported.
								if (!skel.vars.mobile
								&&	!skel.breakpoint('large').active
								&&	skel.vars.IEVersion > 9)
									$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

						});

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}

		// Scrolly.
			$('.scrolly').scrolly();

		// Poptrox.
			$window.on('load', function() {

				var $thumbs = $('.thumbnails');

				if ($thumbs.length > 0)
					$thumbs.poptrox({
						onPopupClose: function() { $body.removeClass('is-covered'); },
						onPopupOpen: function() { $body.addClass('is-covered'); },
						baseZIndex: 10001,
						useBodyOverflow: false,
						overlayColor: '#222226',
						overlayOpacity: 0.75,
						popupLoaderText: '',
						fadeSpeed: 500,
						usePopupDefaultStyling: false,
						windowMargin: (skel.breakpoint('small').active ? 5 : 50)
					});

			});

		// Initial scroll.
			$window.on('load', function() {
				$window.trigger('scroll');
			});

	});

})(jQuery);