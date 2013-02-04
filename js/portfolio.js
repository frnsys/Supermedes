$(function() {
	var index = 0
		, stuck = false;

	// Hide status bar on iOS
	window.addEventListener("load",function() {
	  // Set a timeout...
	  setTimeout(function(){
	    // Hide the address bar!
	    window.scrollTo(0, 1);
	  }, 0);
	});
	

	// ======== Project Pages ===============================

	// Opening project pages
	// Only for non-mobile (mobile is too finicky with fixed positioning)
	if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ) {
		$('.projects li a[type!=external]').live('click', function(e) {
			e.preventDefault();
			var name = $(this).parent().attr('id');
			// Prevent scrolling underneath the page
			$('body').css('overflow', 'hidden');

			// Check if the page is already loaded, if not:
			if ( $('.page[id=' + name + ']').length == 0 ) {
				$.ajax({
			    cache: false,
			    url: '/pages/' + name + '.php',
			    success: function(data) {
			    	page = $(data)
			    		.filter('.page')
			    		.css({
			    			position: 'fixed',
			    			left: '100%'
			    		});
			      $('body').append(page).waitForImages(function() {
			       	showPage( $('.page[id=' + name + ']') );	
			       	$('.loading').hide();
			      });
			    }
				});

			// If the page is already loaded, just show it
			} else {
				showPage( $('.page[id=' + name + ']') );
			}
			
			// Hide back to main button
			$('.page .back-to-main').hide();
			return false;
		});
	}

	// Closing a page
	$('.back').live('click', function() {
		// Reset index
		index = 0;

		// Enable scrolling again
		$('body').css('overflow','auto');

		// Slide away
		var back = $(this);
		$(this).parent().animate({
			left: '100%'
		}, 250, function() {
			back.remove();
			$(this).removeClass('active');
			$(this).find('.paging').remove();
		});
	});

	// Figure sliding
	$('.up').live('click', function() {
			slide( $(this), false );
	});
	$('.down').live('click', function() {
			slide( $(this), true );
	});

	// Key bindings
	$(document).keydown(function(e){
    if (e.keyCode == 38) { 
    	$('.active .up').click();
      return false;
    } else if ( e.keyCode == 40 ) {
    	$('.active .down').click();
    	return false;
    } else if ( e.keyCode == 37 ) {
    	$('.active .back').click();
    	return false;
    }
	});

	// Loading animation
	var loader = new Sonic({
		width: 50,
		height: 20,
		padding: 10,

		stepsPerFrame: 2,
		trailLength: 1,
		pointDistance: 0,

		strokeColor: '#ffffff',
		
		step: 'square',

		multiplier: 1,

		path: [
			['arc', 10, 10, 10, -270, -90],
			['bezier', 10, 0, 40, 20, 20, 0, 30, 20],
			['arc', 40, 10, 10, 90, -90],
			['bezier', 40, 0, 10, 20, 30, 0, 20, 20]
		]
	});
	loader.play();
	$('.loading').append(loader.canvas);

	// Adjustments for retina
	$('.loading canvas').css({
		width: '35px',
		height: '20px'
	});
	positionLoader();

	$('.loading')
		.ajaxStart( function() {
			$(this).show();
		});

	// Window resizing
	$(window).resize( function() {
		positionLoader();
	});


/* 
 * =============================================
 * Single-page initialization
 * =============================================
 */

if ( $('.page').length !== 0 ) {
	spawnControls( $('.page') );
	$('.page').addClass('active');
}

/* 
 * =============================================
 * Functions
 * =============================================
 */

	function showPage( $project ) {
		$project
			.animate({
				left: '0%'
			}, 250, function() {

				// Show the back button
				$(this).find('.back').fadeIn();
				$(this).addClass('active');

			})
			.prepend('<div class="back">back to supermedes</div>');

		spawnControls( $project );
	}

	// Set up sliding if there are multiple figures
	function spawnControls( $project ) {
		figures = $project.find('figure').length;
		if ( figures > 1 || $(window).height() <= 480 ) {
			$project.find('.info').append( '\
				<ul class="paging">\
					<li class="up"></li>\
					<li class="counter">\
						<span class="current">1</span> / \
						<span class="total"></span>\
					</li>\
					<li class="down"></li>\
				</ul>\
			' );

			$project.find('.total').html( figures );
			$project.find('figure').css('top','100%').eq(0).css('top','0%');
		}
	}

	function slide( $el, reverse ) {
		var dir = reverse ? '-100' : '100',
				$figures = $el.closest('.detail').find('.stage figure'),
				figures = $figures.length;

		// Slide up old
		$figures.eq(index).animate({
				top: dir + '%'
			}, 400, function() {
				$(this).css('top', -dir + '%');
			});

		// Increment index
		if ( reverse ) {
			if ( index > 0 ) {
				index--;
			} else {
				index = figures - 1;
			}
		} else {
			if ( index < figures - 1 ) {
				index++;
			} else {
				index = 0;
			}
		}

		// Update counter
		var num = index == 0 ? 1 : figures - index + 1;
		$el.closest('.detail').find('.current').html( num );

		// Slide up new
		$figures.eq(index).css('top', -dir + '%').animate({
			top: '0%'
		}, 400);
	}

	function positionLoader() {
		$('.loading').css({
			top: ($(window).height()/2 - $('.loading').outerHeight()/2) + 'px',
			left: ($(window).width()/2 - $('.loading').outerWidth()/2) + 'px'
		});
	}
			
});

