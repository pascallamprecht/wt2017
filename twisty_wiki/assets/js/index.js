$(document).ready(function(){
	onload();
});

function onload() {
	$.getJSON("assets/json/content.json", function(input) {
		data = input.articles;
		size = $(data).length;
		setRandomPage();
		setPOTD();
		writeInfo();
		createNav(data);
	});
}

function writeInfo() {
	var images_amount = 0;
	$.each(data, function(json_id, content) {
		images_amount += $(content.links).length;
	});
	var string = "<p>There are currently " + size + " different articles about Twisty Puzzles with a total of " + images_amount + " pictures on them. Have fun finding what you're looking for!</p>";
	$("#intro article").append(string);
}
