// Author: Francis Tseng
// URL: supermedes.com
// Last Updated: 09.29.2012
// Copyright 2012 Francis Tseng

$(function() {
	
	$('.show').live('click',function() {
		$(this).toggleClass('hide');
		var expand = $(this).parents('.block').next('.expand');
		expand.slideToggle();
		if ( $(this).hasClass('hide') ) {
			$(this).text('Hide');
			$('html, body').animate({scrollTop:$(expand).offset().top}, 'slow');
		}
		else {
			$(this).text('See More');
		}
	});
	$('.close').live('click',function() {
		assoc_block = $(this).parents('.expand').prev('.block');
		assoc_block.find('.show').click();
		$('html, body').animate({scrollTop:$(assoc_block).offset().top-20}, 'slow');		
	});

});
