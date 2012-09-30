<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>APRK - Francis Tseng</title>
	<meta name="description" content="APRK is the blog of Francis Tseng, covering design, data, human behavior, and random other things.">
	<meta name="author" content="Francis Tseng">

	<meta name="viewport" content="width=device-width">

	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<script src="/js/libs/modernizr-2.5.3.min.js"></script>

	<?php
		/* We add some JavaScript to pages with the comment form
		 * to support sites with threaded comments (when in use).
		 */
		if ( is_singular() && get_option( 'thread_comments' ) )
			wp_enqueue_script( 'comment-reply' );

		/* KEEP IT SAFE! */
		/* This is required! */
		wp_head();
	?>
</head>
<body>

<sidebar>
	<h1><a href="<?php echo get_option('home'); ?>"><img src="/img/blog/l-arrow.png" /><?php bloginfo('name'); ?></a></h1>


<?php
	// Get category links

    $design_id = get_cat_ID( 'Design' );
    $design_link = get_category_link( $design_id );

		$behavior_id = get_cat_ID( 'Behavior' );
		$behavior_link = get_category_link( $behavior_id );

		$systems_id = get_cat_ID( 'Systems' );
		$systems_link = get_category_link( $systems_id );

		$misc_id = get_cat_ID( 'Miscellany' );
    $misc_link = get_category_link( $misc_id );
?>

	<div class="archives" role="navigation">
		<h2>Archives</h2>
		<ul>
			<li class="design">
				<a href="<?php echo esc_url( $design_link ); ?>" title="Design">Design</a>
				<div class="tooltip">Design</div>
			</li>
			<li class="behavior">
				<a href="<?php echo esc_url( $behavior_link ); ?>" title="Behavior">Behavior</a>
				<div class="tooltip">Behavior</div>
			</li>
			<li class="systems">
				<a href="<?php echo esc_url( $systems_link ); ?>" title="Systems">Systems</a>
				<div class="tooltip">Systems</div>
			</li>
			<li class="miscellany">
				<a href="<?php echo esc_url( $misc_link ); ?>" title="Miscellany">Miscellany</a>
				<div class="tooltip">Misc</div>
			</li>
		</ul>
	</div>


	<div class="socialmedia">
		<h2>Connect</h2>
		<ul>
			<li class="twitter">
				<a href="http://twitter.com/yadonchow" title="Twitter">Twitter</a>
				<div class="tooltip">Twitter</div>
			</li>
			<li class="quora">
				<a href="http://www.quora.com/Francis-Tseng" title="Quora">Quora</a>
				<div class="tooltip">Quora</div>
			</li>
			<li class="linkedin">
				<a href="http://www.linkedin.com/in/francistseng" title="LinkedIn">LinkedIn</a>
				<div class="tooltip">LinkedIn</div>
			</li>
			<li class="github">
				<a href="https://github.com/ftzeng/" title="Github">Github</a>
				<div class="tooltip">Github</div>
			</li>
			
		</ul>
	</div>


	<div class="about" role="colophon">
		APRK is the blog of Francis Tseng.<br />

		View my portfolio at <a href="http://www.supermedes.com/">supermedes.com</a>.
		<br /><br />
		<div class="copy">This site and its contents are 
		&copy; 2012 Francis Tseng</div>
	</div>	

</sidebar>

<div role="main" id="main">
