<?php get_header(); ?>
 
    <div id="blog" class="index">
        <?php if(have_posts()) : ?><?php while(have_posts()) : the_post(); ?>
 
        <article class="post">
 
						<div class="date">
							<h5><?php the_time('F j'); ?></h5>

							<?php 
								foreach((get_the_category()) as $category) { 
										echo '<a href="'.esc_url( get_category_link( $category->cat_ID ) ).'" title="' . $category->cat_name . '"><img src="/img/blog/icon-' . strtolower($category->cat_name) . '.png" title="' . $category->cat_name . '" /></a>'; 
								} 
							?>

						</div><!-- .date -->

            <div class="entry">
							<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?><img src="/img/blog/r-arrow.png" /></a></h3>

							<?php if ( is_category() || is_archive() ) {
								the_excerpt();
							} else { ?>
								<?php if( $post->post_excerpt ) { ?>
									<p class="excerpt"><?php echo $post->post_excerpt; ?></p>
								<?php } ?>
	
                <?php the_content(); ?>
							<?php } ?>
 
                <p class="categories"><?php the_category(' &middot; ') ?></p>
 
            </div>
        </article>

				<?php endwhile; ?>

				<nav class="pages">
					<?php posts_nav_link(' ','<span class="prev">&laquo; Previous Page</span>', '<span class="next">Next Page &raquo;</span>'); ?>
        </nav>
 
        <?php endif; ?>
    </div>
<?php get_footer(); ?>
