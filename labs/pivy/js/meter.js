	$(function() {

		var level, degrees, deg, meterTime, wiggleTime, wiggleWiggle,
				damping = 1,
				theta = 0,
				percent = 50 / 100;

		// Allow passing percentages through the hash for showing off
    var hashVal = parseInt(window.location.hash.substr(1));
    if ( hashVal ) {
    	percent = hashVal/100;
    	degrees = (180 * percent);
    	deg = degrees + 'deg';
    }

    // Initialize the meter
		meter();

		// Vertically center the meter
		$('.themeter').css('padding-top', ($(window).height()/2) - ($('.meter').height()/1.5));
		$(window).resize( function() {
			$('.themeter').css('padding-top', ($(window).height()/2) - ($('.meter').height()/1.5));
		})


		// Setting the meter
		function meter() {
			degrees = 180 * percent;
			deg = degrees + 'deg';

			switch ( Math.floor(percent/0.2) )  {
				case 0:
					level = '1';
					break;
				case 1:
					level = '2';
					break;
				case 2:
					level = '3';
					break;
				case 3:
					level = '4';
					break;
				case 4:
					level = '5';
					break;
				case 5:
					level = '5';
					break;
			}

			if ( percent * 100 > 100 ) {
				level = '5';
			} else if ( percent * 100 < 0 ) {
				level = '1';
			}

			clearTimeout( meterTime );
			clearTimeout( wiggleTime );
			clearTimeout( wiggleWiggle );
			meterTime = setTimeout( function() {
				$('.needle').css({
					'-ms-transform': 'rotate(' + deg + ')',
					'-webkit-transform': 'rotate(' + deg + ')',
					'-moz-transform': 'rotate(' + deg + ')',
					'-o-transform': 'rotate(' + deg + ')',
					'transform': 'rotate(' + deg + ')'
				});
				$('.business > div').attr('class', 'level' + level).fadeIn('400');

				// Initiate wiggle, but only after this first animation has completed
				wiggleTime = setTimeout( function() {
					(function loop() {
				    var rand = Math.round(Math.random() * (1000 - 500));
				    wiggleWiggle = setTimeout(function() {
				            wiggle();
				            loop();  
				    }, rand);
					}());
				}, 800);

			}, 200);

			if ( percent * 100 <= 100 ) {
				$('.percent').html( (Math.floor(percent * 100)) + '%' );
			} else if ( percent * 100 > 100 ) {
				$('.percent').html( '!!!' );
			} else if ( percent * 100 < 0 ) {
				$('.percent').html( 'blah' );
			}
		}

		// For realism
		function wiggle() {
			var wiggle = (degrees + (3 * damping * Math.cos(theta))) + 'deg';
			theta++;
			damping = damping <= 0 ? 1 : damping - 0.1;

			$('.needle').css({
				'-ms-transform': 'rotate(' + wiggle + ')',
				'-webkit-transform': 'rotate(' + wiggle + ')',
				'-moz-transform': 'rotate(' + wiggle + ')',
				'-o-transform': 'rotate(' + wiggle + ')',
				'transform': 'rotate(' + wiggle + ')'
			});
		}

		$('input').focus();
		$('input').keydown( function(e) {
			if ( e.keyCode == 13 ) {
				if ( isNumber( $(this).val() ) ) {
					percent = $(this).val() / 100;
					meter();
				}
			}
		});


	});



// Gorgeous...from:
// CMS @ http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}