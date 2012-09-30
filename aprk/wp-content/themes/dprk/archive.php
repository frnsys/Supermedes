<?php get_header(); ?>
 
    <div id="blog">
				<?php if(have_posts()) : ?>

					<h4>
						<?php
							if (single_cat_title('',false) != '') {
								echo "<img src='/img/blog/icon-".strtolower(single_cat_title('', false)).".png' />";
							}
						?>

						Viewing excerpts for <span class="archive-title">
						<?php
							if (single_cat_title('',false) != '') {
								single_cat_title(); 
							}
							else {
								single_month_title(' ');
							}
						?>
					</span></h4>

				<?php while(have_posts()) : the_post(); ?>
 
        <article class="post">
 
						<div class="date">
							<h5><?php the_time('F j'); ?></h5>
						</div>

            <div class="entry">
							<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?><img src="/img/r-arrow.png" /></a></h3>

							<?php if ( is_category() || is_archive() ) {
								the_excerpt();
							} else { ?>
								<div class="excerpt"><?php the_excerpt(); ?></div>
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

