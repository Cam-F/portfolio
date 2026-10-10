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

		// Browser tab title.
		document.title = 'Cameron Fuller';

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
		$('.site-version').text('V46');

		// Add script-injected portfolio project cards.
		var addUnannouncedCards = function() {
			var $thumbs = $('.thumbnails');

			if ($thumbs.length === 0 || $thumbs.find('.unannounced-game-card').length > 0)
				return;

			if ($('#unannounced-game-card-styles').length === 0) {
				$('head').append(
					'<style id="unannounced-game-card-styles">' +
						'.unannounced-game-card .nda-card-art-link {' +
							'display: block;' +
							'border: 0 !important;' +
							'background: #090909;' +
							'line-height: 0;' +
							'overflow: hidden;' +
						'}' +
						'.unannounced-game-card .nda-disabled-button {' +
							'cursor: default;' +
							'opacity: 0.86;' +
						'}' +
						'.game-card {' +
							'--card-glow-border: rgba(255, 255, 255, 0.18);' +
							'--card-glow-soft: rgba(255, 255, 255, 0.10);' +
							'--card-glow-wide: rgba(255, 255, 255, 0.08);' +
							'transition: transform 220ms ease, box-shadow 220ms ease;' +
							'will-change: transform;' +
						'}' +
						'.game-card:hover {' +
							'transform: translateY(-4px);' +
							'box-shadow: 0 12px 26px rgba(0, 0, 0, 0.28), inset 0 0 0 1px var(--card-glow-border), 0 0 18px var(--card-glow-soft), 0 0 38px var(--card-glow-wide);' +
						'}' +
						'.dust-game-card {' +
							'--card-glow-border: rgba(245, 237, 44, 0.58);' +
							'--card-glow-soft: rgba(245, 237, 44, 0.24);' +
							'--card-glow-wide: rgba(245, 237, 44, 0.16);' +
						'}' +
						'.redacted-game-card {' +
							'--card-glow-border: rgba(0, 0, 0, 0.78);' +
							'--card-glow-soft: rgba(0, 0, 0, 0.60);' +
							'--card-glow-wide: rgba(0, 0, 0, 0.46);' +
						'}' +
						'.wayfinder-game-card {' +
							'--card-glow-border: rgba(125, 8, 226, 0.52);' +
							'--card-glow-soft: rgba(125, 8, 226, 0.24);' +
							'--card-glow-wide: rgba(125, 8, 226, 0.18);' +
						'}' +
						'.ruined-king-game-card {' +
							'--card-glow-border: rgba(68, 158, 125, 0.52);' +
							'--card-glow-soft: rgba(68, 158, 125, 0.24);' +
							'--card-glow-wide: rgba(68, 158, 125, 0.18);' +
						'}' +
						'.vicious-circle-game-card {' +
							'--card-glow-border: rgba(33, 248, 247, 0.50);' +
							'--card-glow-soft: rgba(33, 248, 247, 0.22);' +
							'--card-glow-wide: rgba(33, 248, 247, 0.16);' +
						'}' +
						'.jar-wars-game-card {' +
							'--card-glow-border: rgba(104, 218, 212, 0.44);' +
							'--card-glow-soft: rgba(104, 218, 212, 0.16);' +
							'--card-glow-wide: rgba(198, 89, 85, 0.14);' +
						'}' +
						'.jar-wars-game-card:hover {' +
							'box-shadow: 0 12px 26px rgba(0, 0, 0, 0.28), inset 0 0 0 1px rgba(104, 218, 212, 0.44), -14px 0 26px rgba(198, 89, 85, 0.22), 14px 0 26px rgba(104, 218, 212, 0.22), 0 0 38px rgba(80, 174, 181, 0.12);' +
						'}' +
						'.game-card .game-card-main-image {' +
							'overflow: hidden;' +
						'}' +
						'.game-card .game-card-main-image img {' +
							'transition: transform 340ms ease, filter 340ms ease;' +
						'}' +
						'.game-card:hover .game-card-main-image img {' +
							'transform: scale(1.018);' +
							'filter: saturate(1.05) brightness(1.03);' +
						'}' +
						'@media (prefers-reduced-motion: reduce) {' +
							'.game-card {' +
								'transition: none;' +
								'will-change: auto;' +
							'}' +
							'.game-card:hover {' +
								'transform: none;' +
							'}' +
							'.game-card .game-card-main-image img {' +
								'transition: none;' +
							'}' +
						'}' +
						'.game-card-details {' +
							'margin: 0;' +
							'text-align: center;' +
						'}' +
						'.game-card-details summary {' +
							'cursor: pointer;' +
							'display: inline-flex;' +
							'align-items: center;' +
							'font-family: "Courier New", "Lucida Console", monospace;' +
							'font-size: 0 !important;' +
							'font-weight: 700;' +
							'letter-spacing: 0 !important;' +
							'line-height: 1;' +
							'text-transform: uppercase;' +
							'color: rgba(255, 255, 255, 0.68);' +
							'border: 0 !important;' +
							'user-select: none;' +
						'}' +
						'.game-card-details summary:before {' +
							'content: "[ + DETAILS ]";' +
							'font-size: 0.78rem;' +
							'letter-spacing: 0.14em;' +
						'}' +
						'.game-card-details[open] summary:before {' +
							'content: "[ - DETAILS ]";' +
						'}' +
						'.game-card-details summary:hover,' +
						'.game-card-details summary:focus {' +
							'color: #ffffff;' +
						'}' +
						'.game-card-details summary::-webkit-details-marker {' +
							'display: none;' +
						'}' +
						'.game-card-details summary::marker {' +
							'content: "";' +
						'}' +
						'.game-card-details p {' +
							'color: rgba(255, 255, 255, 0.88);' +
							'font-weight: 700;' +
							'line-height: 1.45;' +
							'margin: 0.85em 0 0 0;' +
							'text-align: left;' +
						'}' +
					'</style>'
				);
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
					details: 'Designed and implemented levels from concept through completion in Unreal Engine 5, including scripted gameplay events, dialogue, and combat encounters. Iterated gameplay scenarios and combat pacing through testing and feedback.'
				},
				{
					title: 'Isometric ARPG',
					developer: 'Airship Syndicate',
					badges: ['Designer'],
					details: 'Designed and implemented gameplay spaces, combat encounters, and boss experiences in Unreal Engine 5. Iterated on level flow and combat pacing through testing and feedback.'
				},
				{
					title: 'Open World Survival',
					developer: 'Airship Syndicate',
					badges: ['Designer'],
					details: 'Developed level design prototypes exploring world structure, player navigation, and core gameplay concepts. Created greybox environments and gameplay scenarios to validate design direction and support feature development.'
				}
			];

			var cardHtml = cards.map(function(card) {
				var badges = card.badges.map(function(badge) {
					return '<span class="game-card-meta-pill">' + badge + '</span>';
				}).join('');

				var cardClass = card.image ? 'box game-card dust-game-card' : 'box game-card redacted-game-card unannounced-game-card';
				var imageMarkup = card.image
					? '<a href="' + card.steam + '" target="_blank" class="image fit game-card-main-image"><img src="' + card.image + '" alt="' + card.imageAlt + '" /></a>'
					: '<a href="images/CameronFullerResume.pdf" target="_blank" class="image fit game-card-main-image nda-card-art-link" aria-label="Resume details for unannounced project"><img src="images/redacted-card.svg" alt="Redacted project artwork" /></a>';
				var actions = card.image
					? '<a href="' + card.trailer + '" target="_blank" class="button fit"><i class="fa fa-youtube-play" aria-hidden="true"></i> Trailer</a><a href="' + card.steam + '" target="_blank" class="button fit"><i class="fa fa-steam" aria-hidden="true"></i> Steam</a>'
					: '<span class="button fit nda-disabled-button"><i class="fa fa-lock" aria-hidden="true"></i> Under NDA</span><a href="images/CameronFullerResume.pdf" target="_blank" class="button fit"><i class="fa fa-file-text" aria-hidden="true"></i> Resume</a>';
				var details = '<details class="game-card-details"><summary>[ + DETAILS ]</summary><p>' + card.details + '</p></details>';

				return '<div class="' + cardClass + '">' +
					imageMarkup +
					'<div class="inner">' +
						'<h3>' + card.title + '</h3>' +
						'<p class="game-card-developer">' + card.developer + '</p>' +
						'<div class="game-card-meta">' + badges + '</div>' +
						'<div class="game-card-actions">' + actions + '</div>' +
						details +
					'</div>' +
				'</div>';
			}).join('');

			var $wayfinderCard = $thumbs.find('.game-card').first();

			if ($wayfinderCard.length > 0)
				$wayfinderCard.before(cardHtml);
			else
				$thumbs.append(cardHtml);
		};

		var addExpandableDescriptions = function() {
			var staticCardDescriptions = {
				'Wayfinder': 'Started as the sole tester and grew into a producer role, coordinating multiple cross-disciplinary teams, tracking work, unblocking dependencies, and helping drive features and content to completion.',
				'Ruined King': 'Supported QA testing for this turn-based RPG set in the League of Legends universe, helping identify bugs, validate gameplay, and improve release polish.',
				'Jar Wars': 'Supported QA testing for this multiplayer VR title, helping identify bugs, validate gameplay interactions, and improve release polish.',
				'Vicious Circle': 'Owned testing for multiplayer features, built test cases and documentation, created and tracked bugs in JIRA, and supported playtesting and feedback sessions.'
			};

			var staticCardClasses = {
				'Wayfinder': 'wayfinder-game-card',
				'Ruined King': 'ruined-king-game-card',
				'Jar Wars': 'jar-wars-game-card',
				'Vicious Circle': 'vicious-circle-game-card'
			};

			$('.thumbnails .game-card').each(function() {
				var $card = $(this),
					title = $.trim($card.find('h3').first().text()),
					copy = staticCardDescriptions[title],
					$description = $card.find('.game-card-description').first();

				if (staticCardClasses[title])
					$card.addClass(staticCardClasses[title]);

				if (!copy || !$description.length || $card.find('.game-card-details').length > 0)
					return;

				$description.replaceWith('<details class="game-card-details"><summary>[ + DETAILS ]</summary><p>' + copy + '</p></details>');
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