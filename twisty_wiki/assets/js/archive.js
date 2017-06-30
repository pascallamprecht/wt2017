$(document).ready(function(){		//dieser Code ist sehr identisch zu search.js, die einzige Veränderung liegt darin, dass das Ausgabearray einfach mit allen IDs gefüllt wird
	onload();
});

function onload() {
	$.getJSON("assets/json/content.json", function(input) {
		data = input.articles;
		size = $(data).length;
		setRandomPage();
		setPOTD();
		createNav(data);
		number_of_items = 10;
		showAll();
	});
}

function getUserInput() {
	var inputstring = document.getElementById("searchstring").value;
	return inputstring;
}

function showAll() {
	ausgabearray = new Array();		//Array aller IDs der gefundenen Seiten
	page = 1;
	for (var i=0; i<$(data).length; i++) {
		ausgabearray[i] = i;
	}
	ausgabearray.sort(function(a, b) {			//sortieren alphabetisch nach Name, da IDs nicht sortiert sind
		var name_a = data[a].tags.name;
		var name_b = data[b].tags.name;
		var temp_array = new Array();
		temp_array[0] = name_a;
		temp_array[1] = name_b;
		temp_array.sort();
		if ((temp_array[0] == name_a) && (temp_array[1] == name_b)) {
			return -1;
		}
		else {
			return 1;
		}
	});
	appendresult(ausgabearray, data, page, number_of_items);
	updateButtons();
}

function drawButtons() {
	$("#pageconfig").empty();
	var buttons = "<div id='activepage'><p>";
	buttons += "<button id='previous' onclick='prevClick()' disabled='true'>Previous Page</button>";
	buttons += "<button id='next' onclick='nextClick()' disabled='true'>Next Page</button>";
	buttons += "</p></div><div id='numberofitems'><p>";
	buttons += "<button id='10pp' onclick='pp10Click()' disabled='true'>10</button>";
	buttons += "<button id='20pp' onclick='pp20Click()'>20</button>";
	buttons += "<button id='30pp' onclick='pp30Click()'>30</button>";
	buttons += "</p></div>";
	$("#pageconfig").append(buttons);
	var result_string = "<p id='numberofresults'>" + $(ausgabearray).length + " results found</p>";
	$("#searchbutton").after(result_string);
}

function updateButtons() {
	drawButtons();
	if (page == 1) {
		document.getElementById("previous").disabled = true;
	}
	else {
		document.getElementById("previous").disabled = false;
	}
	var number_of_result_pages = Math.floor(($(ausgabearray).length - 1) / number_of_items) + 1;
	if (page >= number_of_result_pages) {
		document.getElementById("next").disabled = true;
	}
	else {
		document.getElementById("next").disabled = false;
	}
	$("#activepage p").prepend("Page: " + page + " of " + number_of_result_pages);
	
	if (number_of_items == 10) {
		document.getElementById("10pp").disabled = true;
		document.getElementById("20pp").disabled = false;
		document.getElementById("30pp").disabled = false;
	}
	if (number_of_items == 20) {
		document.getElementById("10pp").disabled = false;
		document.getElementById("20pp").disabled = true;
		document.getElementById("30pp").disabled = false;
	}
	if (number_of_items == 30) {
		document.getElementById("10pp").disabled = false;
		document.getElementById("20pp").disabled = false;
		document.getElementById("30pp").disabled = true;
	}
	$("#numberofitems p").prepend("Items per page: ");
}

function prevClick() {
	appendresult(ausgabearray, data, --page, number_of_items);
	updateButtons();
}

function nextClick() {
	appendresult(ausgabearray, data, ++page, number_of_items);
	updateButtons();
}

function pp10Click() {
	number_of_items = 10;
	page = 1;
	appendresult(ausgabearray, data, page, number_of_items);
	updateButtons();
}

function pp20Click() {
	number_of_items = 20;
	page = 1;
	appendresult(ausgabearray, data, page, number_of_items);
	updateButtons();
}

function pp30Click() {
	number_of_items = 30;
	page = 1;
	appendresult(ausgabearray, data, page, number_of_items);
	updateButtons();
}

function appendresult(ausgabearray, data, page, number_of_items) {
	$("#searchresult").empty();
	
	if ($(ausgabearray).length == 0) {
		$("#searchresult").append("<article><h1>Leider keine Ergebnisse</h1></article>");
	}
	else {
		$(ausgabearray).each(function(result_id, value){
			if (((result_id + 1) <= page * number_of_items) && ((result_id + 1) >= ((page - 1) * number_of_items) + 1)) {		//wenn Artikel auf aktueller Seite
				var json_id = ausgabearray[result_id];
				//Zuweisen
				var name = data[json_id].tags.name;
				var short_desc = data[json_id].descriptions.short_description;
				var pic_link = data[json_id].links[0];
				//String zusammenbasteln
				var content = "<div class='img-wrapper'><img src='assets/img/" + pic_link +  "'></img></div>";
				content += "<h1>"+ name +"</h1>";
				content += "<br>";
				content += "<p>"+ short_desc +"</p>";
				
				//String einpacken
				var article = "<a href='page.php?page="+json_id+"'><article class = 'result'>" + content + "</article></a>";
				//String in Seite einbinden
				$("#searchresult").append(article);
			}
		});
	}
	scaleImages();
}
