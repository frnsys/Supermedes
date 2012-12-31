<?php include 'header.html' ?>

<div class="page" id="wikidigest">
	<div class="detail">
		<div class="info">
			<div class="icon"></div>
			<div class="text">
				<h2>Wikidigest</h2>
				<p>A Wikipedia database dump parser & digester.</p>
				<p>
					Wikidigest will "digest" a Wikipedia XML data dump into a graph for natural language processing – 
					each article is sanitized & stemmed, 
					then, through TF*IDF, saved as descriptive word vectors into a MySQL DB.</p>
				<p>
					It's written in Ruby which means it's fairly slow (not to mention Wikipedia dumps are <em>huge</em>). I hope to later 
					rewrite it in a faster language with a proper graph db.
				</p>
				<a href="https://github.com/ftzeng/wikidigest">Visit Wikidigest on Github</a>
			</div>
		</div>
		<div class="stage">
			<figure>
				<img src="/img/portfolio/shots/wikidigest.png" alt="wikidigest" />
			</figure>
		</div>
	</div>
</div>

<?php include 'footer.html' ?>
