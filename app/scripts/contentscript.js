'use strict';

var tables = [];
var json = [];

function addControls(table,idx,width) {
	var row = '<tr id="control' + idx + '"><td colspan="' + width + '"><span class="json">[JSON]</span></td>/tr>';
	table.find('thead').prepend(row);
	table.find('thead > row > span').attr('table', idx).addClass(idx);

	//Click Handler
	table.find('span.json').click(function() {
		createGist(JSON.stringify(json[idx-1]));
	});

}

//Grab each wikitable and add it to an array
$('table.wikitable').each(function() {
	tables.push($(this));
});

//Now let's processes the array
$.each(tables, function(idx,table) {
	var cols = [];
	var tableArr = [];
	table.find('thead').find('th').each(function(){
		cols.push($(this).text());
	});
	if (cols.length > 0) {
		table.find('tbody').find('tr').each(function(){
			var rowObj = {};
			var row = $(this).find('th,td');
			$.each(row, function(idx, td) {
				var key = cols[idx];
				rowObj[key] = $(td).text();
			});
			tableArr.push(rowObj);
		});
		json.push(tableArr);
		//Now add a controller
		addControls(table,idx+1,cols.length);
	}
});

//Send to GitHub
function createGist(json) {
	var payload = {
		"discription": "Wikipedia Table JSON",
		"public": true,
		"files": {
			"wikiTable.json": {
				"content": json
			}
		}
	};

	$.ajax({
		type: "POST",
		url: "https://api.github.com/gists",
		dataType: 'json',
		async: true,
		data: JSON.stringify(payload),
		success: function(data) {
			win = window.open(data.html_url, '_blank');
			if (win)
			{
				win.focus();
			}
		}
	});
}