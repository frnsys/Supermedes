$(function() {

		//smooth anchor tags
		$('nav:first a').live('click',function(e) {
			e.preventDefault();
			var href = $(this).attr('href');
			var link = href.substr(1,href.length);
			$('html, body').animate({scrollTop:$('a[name='+link+']').offset().top+20}, 'slow');
		});

		$('a[href=#top]').live('click',function(e) {
			e.preventDefault();
			$('html, body').animate({scrollTop:$('a[name=top]').offset().top - 20}, 'slow');
		});

});
