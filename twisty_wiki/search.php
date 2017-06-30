<html>
<head>
	<meta charset="utf-8">
	<title>Twisty Wiki</title>
	<link rel="stylesheet" href="assets/css/style2.css" media="all"/>
	<script src='assets/js/jquery-3.2.1.min.js'></script>		<!-- jQuery -->
	<script src='assets/js/md5.min.js'></script>				<!-- MD5-Encoding from CryptoJS -->
	<script src='assets/js/main.js'></script>					<!-- Identischer Code für alle Seiten -->
	<script src='assets/js/search.js'></script>					<!-- Code für diese Seite -->
</head>
<body>
	<div id="container">
	<header>
		<h1>Twisty Wiki</h1>
	</header>
	<div id="menu">
		<ul>
			<li><a href="index.html">Homepage</a></li>
			<li><a id="randompage">Random Page</a></li>
			<li><a id="potd">Page of the Day</a></li>
			<li><a href="archive.html">Archive</a></li>
			<li><a href="search.php" class="active">Search</a></li>
		</ul>
	</div>
	<nav>
		
	</nav>
	<aside>
		<img src="assets/img/ad.jpg"/>
	</aside>
	<div id="maincontent">
		<section>
			<div id="userinput">
				<?php
					function test_input($input) {
						$input = trim($input);
						$input = stripslashes($input);
						$input = htmlspecialchars($input);
						return $input;
					}
					
					if (empty($_GET["search"])) {
						$searchstring = "";
					}
					else {
						$searchstring = test_input($_GET["search"]);
					}
					echo "<input type='text' id='searchstring' value='" . $searchstring . "' size='50' maxlength='40'/>";
				?>
				<button onclick="search(getUserInput(), data);">Search</button>
				<div id="pageconfig">
					
				</div>
			</div>
			<div id="searchresult">
			</div>
		</section>
	</div>
	<footer>
		<ul>
			<li>
				<p>Created by:</p>
				<p>Pascal Lamprecht</p>
			</li>
			<li>
				<p>Used images:</p>
				<a href="assets/img/images.txt" target="_blank">Listed here</a>
			</li>
			<li>
				<p>Used scripts:</p>
				<a href="https://jquery.com/download/" target="_blank">jQuery 3.2.1</a>
				<a href="https://github.com/sytelus/CryptoJS" target="_blank">md5.js from CryptoJS</a>
			</li>
			<li>
				<p>Created for:</p>
				<p>WebTechniken I, SS 2017</p>
		</ul>
	</footer>
	</div>
</body>
</html>