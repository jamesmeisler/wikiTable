'use strict';

var tables = [];
var json = [];

function addControls(table,idx,width) {
	var row = '<tr id="control' + idx + '"><td colspan="' + width + '"><span class="json">[JSON]</span></td>/tr>';
	table.find('thead').prepend(row);
	table.find('thead > row > span').attr('table', idx).addClass(idx);

	//Click Handler
	table.find('span.json').click(function() {
		table.after('<p>' + JSON.stringify(json[idx-1]) + '</p>');
	})

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

//Send to pastebin

var postParam = {
	'api_user_key': 'fa778fe75637253b610c0af04566ac20',
	'api_paste_private': '1',
	'api_paste_name': 'Wiki Table',

}
