var fs = require('fs');
var lineReader = require('readline');
var file = './data/datafile.csv';
var myarray = [];

function readFileLines(file) {
	var rd = lineReader.createInterface({
	  input: fs.createReadStream(file)
	});
	
	rd.on('line', function (line) {
		line = line.replace(/"/g,"");
	 	myarray.push(line);
	});
	rd.on('close', function () {
	    changeArrayToJSON(myarray);
	});
}
var rowArray = [];
function changeArrayToJSON(myarray) {
	var jsonKeys = myarray[0].split(',');	
	for(var i=1;i<myarray.length;i++){
		var rowObj = {};
		var jsonValues = myarray[i].split(',');
		for(var value=0;value<jsonValues.length;value++){
			rowObj[jsonKeys[value]] = jsonValues[value];
		}
		rowArray.push(rowObj);
	}
	// console.log(JSON.stringify(rowArray));
	fs.writeFileSync('output/datafile.json', JSON.stringify(rowArray), encoding = "utf8");
}
readFileLines(file);

