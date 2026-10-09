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

		// Footer version marker.
			$('.site-version').text('V36');

		// Add script-injected portfolio project cards.
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
							\tline-height: 0;\
							\toverflow: hidden;\
							}\
							.unannounced-game-card .nda-disabled-button {\
							\tcursor: default;\
							\topacity: 0.86;\
							}\
							.game-card-details {\
							\tmargin: 1.05em 0 0 0;\
							\ttext-align: left;\
							}\
							.game-card-details summary {\
							\tcursor: pointer;\
							\tdisplay: inline-flex;\
							\talign-items: center;\
							\tfont-family: "Courier New", "Lucida Console", monospace;\
							\tfont-size: 0.78em;\
							\tfont-weight: 700;\
							\tletter-spacing: 0.14em;\
							\tline-height: 1;\
							\ttext-transform: uppercase;\
							\tcolor: rgba(255, 255, 255, 0.68);\
							\tborder: 0 !important;\
							\tuser-select: none;\
							}\
							.game-card-details summary:hover,\
							.game-card-details summary:focus {\
							\tcolor: #ffffff;\
							}\
							.game-card-details summary::-webkit-details-marker {\
							\tdisplay: none;\
							}\
							.game-card-details summary::marker {\
							\tcontent: "";\
							}\
							.game-card-details .details-open {\
							\tdisplay: none;\
							}\
							.game-card-details[open] .details-closed {\
							\tdisplay: none;\
							}\
							.game-card-details[open] .details-open {\
							\tdisplay: inline;\
							}\
							.game-card-details p {\
							\tcolor: rgba(255, 255, 255, 0.88);\
							\tfont-weight: 700;\
							\tline-height: 1.45;\
							\tmargin: 0.85em 0 0 0;\
							}\
						</style>');
				}

				var cards = [
					{
						title: 'DUST: Origins',
						developer: 'Airship Syndicate',
						badges: ['Designer', '2024 - Present'],
						image: 'images/Dust.jpg',
						imageAlt: 'DUST: Origins',
						steam: 'https://store.steampowered.com/app/3804800/DUST_Origins/',
						trailer: 'https://www.youtube.com/watch?v=IhIOdUs5zlw',
						summary: 'Level Designer on DUST: Origins, building UE5 gameplay spaces, scripted events, dialogue moments, and combat encounters.',
						details: 'Designed and implemented levels from concept through completion in Unreal Engine 5, including scripted gameplay events, dialogue, and combat encounters. Iterated gameplay scenarios and combat pacing through testing and feedback.'
					},
					{
						title: 'Isometric ARPG',
						developer: 'Airship Syndicate',
						badges: ['Designer'],
						summary: 'Designer on an unannounced isometric ARPG, building UE5 gameplay spaces, combat encounters, and boss experiences.',
						details: 'Designed and implemented gameplay spaces, combat encounters, and boss experiences in Unreal Engine 5. Iterated on level flow and combat pacing through testing and feedback.'
					},
					{
						title: 'Open World Survival',
						developer: 'Airship Syndicate',
						badges: ['Designer'],
						summary: 'Designer on an unannounced open world survival project, prototyping world structure, player navigation, and greybox gameplay scenarios.',
						details: 'Developed level design prototypes exploring world structure, player navigation, and core gameplay concepts. Created greybox environments and gameplay scenarios to validate design direction and support feature development.'
					}
				];

				var cardHtml = cards.map(function(card) {
					var badges = card.badges.map(function(badge) {
						return '<span class="game-card-meta-pill">' + badge + '</span>';
					}).join('');

					var cardClass = card.image ? 'box game-card dust-game-card' : 'box game-card unannounced-game-card';
					var imageMarkup = card.image
						? '<a href="' + card.steam + '" target="_blank" class="image fit game-card-main-image"><img src="' + card.image + '" alt="' + card.imageAlt + '" /></a>'
						: '<a href="images/CameronFullerResume.pdf" target="_blank" class="image fit game-card-main-image nda-card-art-link" aria-label="Resume details for unannounced project"><img src="images/redacted-card.svg" alt="Redacted project artwork" /></a>';
					var actions = card.image
						? '<a href="' + card.trailer + '" target="_blank" class="button fit"><i class="fa fa-youtube-play" aria-hidden="true"></i> Trailer</a><a href="' + card.steam + '" target="_blank" class="button fit"><i class="fa fa-steam" aria-hidden="true"></i> Steam</a>'
						: '<span class="button fit nda-disabled-button"><i class="fa fa-lock" aria-hidden="true"></i> Under NDA</span><a href="images/CameronFullerResume.pdf" target="_blank" class="button fit"><i class="fa fa-file-text" aria-hidden="true"></i> Resume</a>';
					var description = '<p class="game-card-description">' + card.summary + '</p><details class="game-card-details"><summary><span class="details-closed">[ + DETAILS ]</span><span class="details-open">[ - DETAILS ]</span></summary><p>' + card.details + '</p></details>';

					return '\
						<div class="' + cardClass + '">\
						\t' + imageMarkup + '\
						\t<div class="inner">\
						\t\t<h3>' + card.title + '</h3>\
						\t\t<p class="game-card-developer">' + card.developer + '</p>\
						\t\t<div class="game-card-meta">' + badges + '</div>\
						\t\t<div class="game-card-actions">' + actions + '</div>\
						\t\t' + description + '\
						\t</div>\
						</div>';
				}).join('');

				var $wayfinderCard = $thumbs.find('.game-card').first();

				if ($wayfinderCard.length > 0)
					$wayfinderCard.before(cardHtml);
				else
					$thumbs.append(cardHtml);
			};

			var addExpandableDescriptions = function() {
				var staticCardDescriptions = {
					'Wayfinder': {
						summary: 'Producer and QA contributor on Wayfinder, coordinating cross-disciplinary teams and helping drive features and content to completion.',
						details: 'Started as the sole tester and grew into a producer role, coordinating multiple cross-disciplinary teams, tracking work, unblocking dependencies, and helping drive features and content to completion.'
					},
					'Ruined King': {
						summary: 'QA contributor on Ruined King, supporting gameplay validation and release polish for a turn-based RPG.',
						details: 'Supported QA testing for this turn-based RPG set in the League of Legends universe, helping identify bugs, validate gameplay, and improve release polish.'
					},
					'Jar Wars': {
						summary: 'QA contributor on Jar Wars, supporting multiplayer VR testing, interaction validation, and release polish.',
						details: 'Supported QA testing for this multiplayer VR title, helping identify bugs, validate gameplay interactions, and improve release polish.'
					},
					'Vicious Circle': {
						summary: 'QA / Production contributor on Vicious Circle, owning multiplayer testing, documentation, bug tracking, and playtest support.',
						details: 'Owned testing for multiplayer features, built test cases and documentation, created and tracked bugs in JIRA, and supported playtesting and feedback sessions.'
					}
				};

				$('.thumbnails .game-card').each(function() {
					var $card = $(this),
						title = $.trim($card.find('h3').first().text()),
						copy = staticCardDescriptions[title],
						$description = $card.find('.game-card-description').first();

					if (!copy || !$description.length || $card.find('.game-card-details').length > 0)
						return;

					$description.text(copy.summary);
					$description.after('<details class="game-card-details"><summary><span class="details-closed">[ + DETAILS ]</span><span class="details-open">[ - DETAILS ]</span></summary><p>' + copy.details + '</p></details>');
				});
			};

			addUnannouncedCards();
			addExpandableDescriptions();

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