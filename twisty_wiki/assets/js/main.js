$(document).ready(function(){
	vis_state = new Array(); //wert%2 = 0 entspricht unsichtbar, wert%2 = 1 sichtbar
	for (var i = 0; i < 8; i++) {
		vis_state[i] = 0;
	}
	
});

function setRandomPage() {
	var randomid = Math.floor((Math.random() * size));
	$("#randompage").attr("href", "page.php?page=" + randomid);
}

function setPOTD() {
	var d = new Date;
	var day = d.getUTCDate();
	var month = d.getUTCMonth() + 1;
	var year = d.getUTCFullYear();
	var date_number = day + 100*month + 10000*year;
	var date_string = toString(date_number);
	var hash = CryptoJS.MD5(date_string);		//ergebnis = Array aus 4 32bit-Integern (hash.words[])
	var result_number = 0;
	for (var i=0; i<4; i++) {
		result_number += hash.words[i];
	}
	result_id = Math.abs(result_number % size);
	$("#potd").attr("href", "page.php?page=" + result_id);
}

function createNav(data) {
	$("nav").empty();
	var navigation_content = "<ul><li><a>Categories</a></li>";	//Nav-Start
	for (category_id = 0; category_id < 8; category_id++) {
		navigation_content += "<li class='tag" + category_id + "'>";		//Kategorie-Start
		var category_array = new Array();
		var i = 0;
		var tag_name = "";
		$.each(data, function(json_id, content) {		//alle Tag-Instanzen dieser Kategorie finden
			var tag_id = 0;
			$.each(content.tags, function(number, tag) {
				if (tag_id == category_id) {
					if (category_array.indexOf(tag) == -1) {		//nur hinzufügen wenn noch nicht im Array
						tag_name = number;
						category_array[i] = tag;
						i++;
					}
				}
				tag_id++;
			});	
		});
		if (tag_name == "puzzlelayers") {			//sollen richtig sortiert werden, ansonsten kommen zB 10 vor 6
			category_array.sort(function(a,b) {
				var layers_a = a.replace(" layers", "");
				var layers_b = b.replace(" layers", "");
				var temp_array = new Array();
				temp_array[0] = layers_a;
				temp_array[1] = layers_b;
				temp_array.sort(function(c,d){return(c-d)});
				if ((temp_array[0] == layers_a) && (temp_array[1] == layers_b)) {
					return -1;
				}
				else {
					return 1;
				}
			});
		}
		if (tag_name == "axis") {
			category_array.sort(function(a,b) {
				var axis_a = a.replace(" axis", "");
				var axis_b = b.replace(" axis", "");
				var temp_array = new Array();
				temp_array[0] = axis_a;
				temp_array[1] = axis_b;
				temp_array.sort(function(c,d){return(c-d)});
				if ((temp_array[0] == axis_a) && (temp_array[1] == axis_b)) {
					return -1;
				}
				else {
					return 1;
				}
			});
		}
		else {
		category_array.sort();		//alles andere alphabetisch sortieren
		}
		navigation_content += "<a onclick='toggleVisibility(" + category_id + "); adjustHeight()'>" + tag_name + "</a>";		//Kategoriename anfügen
		$.each(category_array, function(tag_id, tag_value) {
			navigation_content += "<a href='search.php?search=" + tag_value + "' data-category='" + category_id + "'>" + tag_value + "</a>";		//einzelne Tags auflisten + anfügen
		});
		navigation_content += "</li>";		//Kategorie-Ende
	}
	navigation_content += "</ul>";		//Nav-Ende
	$("nav").append(navigation_content);	//in HTML einfügen
	$.each(vis_state, function(category, state){
		var target = $("nav li a[data-category=" + category + "]");
		target.hide();
	})
}

function toggleVisibility(category) {
	vis_state[category]++;
	if (vis_state[category]%2 == 1) {
		var target = $("nav li a[data-category=" + category + "]");
		target.slideDown();
	}
	else {
		if (vis_state[category]%2 == 0) {
			var target = $("nav li a[data-category=" + category + "]");
			target.slideUp();
		}
	}
}

function adjustHeight() {
	var nav = parseFloat($("nav ul").css("height"));
	var newHeight = nav + 400;
	$("#container").css("min-height", newHeight);
	$("#maincontent").css("min-height", newHeight);
}



