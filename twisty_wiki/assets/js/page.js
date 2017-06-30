$(document).ready(function(){
	onload();
});


function onload() {
	$.getJSON("assets/json/content.json", function(input) {
		data = input.articles;
		size = $(data).length;
		setRandomPage();
		setPOTD();
		createNav(data);
		writeArticle(data);
	});
}


function writeArticle(data) {
	var pageid = document.getElementById("seiten-id").value;
	json_id = pageid;
	
	//alle Tags zuweisen
	var name = data[json_id].tags.name;
	var shape = data[json_id].tags.shape;
	var axis = data[json_id].tags.axis;
	var puzzlelayers = data[json_id].tags.puzzlelayers;
	var turning = data[json_id].tags.turning;
	var production = data[json_id].tags.production;
	var creator = data[json_id].tags.creator;
	var year = data[json_id].tags.year;
	var long_desc = data[json_id].descriptions.full_description;
	var first_picture = data[json_id].links[0];		//prüfen auf empty -> No image available
	picture = 0;
	pictures_amount = $(data[json_id].links).length;
	
	//String zusammenbasteln
	var content = "<h1>"+ name +"</h1>";
	content += "<p>Shape: "+ shape +"</p>";
	content += "<p>Axis: "+ axis +"</p>";
	content += "<p>Layers: "+ puzzlelayers +"</p>";
	content += "<p>Turning: "+ turning +"</p>";
	content += "<p>Production: "+ production +"</p>";
	content += "<p>Creator/Producer: "+ creator +"</p>";
	content += "<p>Year: "+ year +"</p>";
	content += "<br><p>"+ long_desc +"</p>"; 
	
	//Bild hinzufügen
	content += "<div id='pictures'><h4>Pictures:</h4>";
	content += "<a href='assets/img/" + first_picture + "' target='_blank'><img src='assets/img/" + first_picture + "'/></a>";
	content += "<div id='picture-caption'><button id='previous_pic' onclick='prevPic()'>Previous</button>";
	content += "<p>Picture " + (picture+1) + " of " + pictures_amount + "</p>";
	content += "<button id='next_pic' onclick='nextPic()'>Next</button></div></div>";
	
	//Artikel einpacken
	var article = "<article class = 'result'>" + content + "</article>";
	
	//String in Seite einbinden
	$("#article").append(article);
	
	updatePictureButtons();
}

function prevPic() {
	var picArray = data[json_id].links;
	var newPicName = picArray[--picture];
	var newLink = "assets/img/" + newPicName;
	$("#pictures a").attr("href", newLink);
	$("#pictures img").attr("src", newLink);
	updatePictureButtons();
}

function nextPic() {
	var picArray = data[json_id].links;
	var newPicName = picArray[++picture];
	var newLink = "assets/img/" + newPicName;
	$("#pictures a").attr("href", newLink);
	$("#pictures img").attr("src", newLink);
	updatePictureButtons();
}

function updatePictureButtons() {
	if (picture == 0) {
		$("#picture-caption button:first-child").attr("disabled", true);
	}
	else {
		$("#picture-caption button:first-child").attr("disabled", false);
	}
	if (picture >= (pictures_amount-1)) {
		$("#picture-caption button:last-child").attr("disabled", true);
	}
	else {
		$("#picture-caption button:last-child").attr("disabled", false);
	}
	$("#picture-caption p").empty();
	var caption = "Picture " + (picture+1) + " of " + pictures_amount;
	$("#picture-caption p").append(caption);
}



