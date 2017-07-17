var fs= require('fs');
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

function changeArrayToJSON(myarray) {
	var jsonKeys = myarray[0].split(',');
	var rowArray = [];		
	for(var i=1;i<myarray.length;i++){
		var rowObj = {};
		var jsonValues = myarray[i].split(',');
		for(var value=0;value<jsonValues.length;value++){
			rowObj[jsonKeys[value]] = jsonValues[value];
		}
		rowArray.push(rowObj);
	}
	// console.log(JSON.stringify(populationByCountryDescending(rowArray)));
	// console.log(JSON.stringify(gdpByCountry(rowArray)));
	// console.log(JSON.stringify(purchasingPowerByCountry(rowArray)));
	console.log(JSON.stringify(populationPurchasingGrowthFrom2010To2013(rowArray)));
}
readFileLines(file);

var populationWiseData = [];
function populationByCountryDescending(rowArray) {
	for(var i=0;i<rowArray.length;i++){
		populationWiseData.push({
			"CountryName" : rowArray[i]["Country Name"],
			"Population2013" : rowArray[i]['Population (Millions) - 2013']
		})
	}
	//Sorting By Descending Order Population in 2013
	populationWiseData.sort(function(a, b) {
	    return b.Population2013 - a.Population2013;
	});
	return populationWiseData;
}

var gdpWiseData = [];
function gdpByCountry(rowArray) {
	for(var i=0;i<rowArray.length;i++){
		gdpWiseData.push({
			"CountryName" : rowArray[i]["Country Name"],
			"GDP2013" : rowArray[i]["GDP Billions (US$) - 2013"]
		})
	}
	//Sorting By Descending Order GDP in 2013
	gdpWiseData.sort(function(a, b) {
	    return b.GDP2013 - a.GDP2013;
	});
	return gdpWiseData;
}

var purchasingPowerData = [];
function purchasingPowerByCountry(rowArray) {
	for(var i=0;i<rowArray.length;i++){
		purchasingPowerData.push({
			"CountryName" : rowArray[i]["Country Name"],
			"PurchasingPower2013" : rowArray[i]["Purchasing Power in Billions ( Current International Dollar) - 2013"]
		})
	}
	//Sorting By Descending Order Population in 2013
	purchasingPowerData.sort(function(a, b) {
	    return b.PurchasingPower2013 - a.PurchasingPower2013;
	});
	return purchasingPowerData;
}

var populationPurchasingGrowthData = [];
function populationPurchasingGrowthFrom2010To2013(rowArray) {
	for(var i=0;i<rowArray.length;i++){
		populationPurchasingGrowthData.push({
			"CountryName" : rowArray[i]["Country Name"],
			"PurchasingGrowth(In Billions)" : rowArray[i]["Purchasing Power in Billions ( Current International Dollar) - 2013"] - rowArray[i]["Purchasing Power in Billions ( Current International Dollar) - 2010"],
			"PopulationGrowth(In Millions)" : rowArray[i]["Population (Millions) - 2013"] - rowArray[i]["Population (Millions) - 2010"]
		})
	}
	return populationPurchasingGrowthData;
}
