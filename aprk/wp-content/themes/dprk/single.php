<?php get_header(); ?>
 
    <div id="blog">
        <?php if(have_posts()) : ?><?php while(have_posts()) : the_post(); ?>
 
        <article class="post single">
 
            <div class="entry">
							<h3><?php the_title(); ?></h3>
								<?php if( $post->post_excerpt ) { ?>
									<p class="excerpt"><?php echo $post->post_excerpt; ?></p>
								<?php } ?>

								<h5>
									Published <?php the_time('F j, Y'); ?>.

									<?php
										if(get_the_time('F j, Y') != get_the_modified_date('F j, Y')) { ?>
										Last updated: <?php the_modified_date('F j, Y'); ?>.
									<?php } ?>
								</h5>								

                <?php the_content(); ?>
 
                <p class="categories"><?php the_category(' &middot; ') ?></p>
 
            </div>
        </article>

				<?php endwhile; ?>

				<div class="twitter-me"><a href="http://twitter.com/yadonchow"><img src="/img/blog/twitter.png" title="Twitter" />Continue the discussion with me: <span class="at-me">@yadonchow</span></a></div>

				<nav class="pages">
					<span class="prev"><?php previous_post('&laquo; %','','yes'); ?></span>
					<span class="next"><?php next_post('% &raquo;','','yes'); ?></span>
        </nav>

        <?php endif; ?>
    </div>
<?php get_footer(); ?>

