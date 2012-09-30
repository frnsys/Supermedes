
	</div><!-- #main -->


<?php wp_footer(); ?>

<script src="/js/libs/jquery-1.8.2.min.js"></script>

<?php if ( is_category() || is_archive() || is_single() ) { ?>
	<script type="text/javascript">
			$(function() {

				if ( $(window).width() < 680 ) {
					$('html, body').animate({scrollTop:$('#blog').offset().top+20}, 'slow');
				};

			});
	</script>
<? } ?>

</body>
</html>


