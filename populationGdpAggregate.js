var fs= require('fs');

fs.readFile('./output/datafile.json', 'utf8', function(error, jsonData) {
	
	var parseData = JSON.parse(jsonData);
	// console.log(parseData);

	var populationData = [];
	var gdpData = [];
	var aggregateData = [];

	var continents = {
		Argentina : "South America",
		Australia : "Australia",
		Brazil : "South America",
		Canada : "North America",
		China : "Asia",
		France : "Europe",
		Germany : "Europe",
		India : "Asia",
		Indonesia : "Asia",
		Italy : "Europe",
		Japan : "Asia",
		Mexico : "North America",
		Russia : "Europe",
		'Saudi Arabia' : "Asia", 
		'South Africa' : "Africa",
		'Republic of Korea' : "Asia",
		Turkey : "Asia",
		'United Kingdom' : 'Europe',
		USA : 'North America',
		'European Union' : 'Europe'
	}

	var continentWisePopulation = {
		"South America" : 0,
		Australia : 0,
		"North America" : 0,
		Asia : 0,
		Europe : 0,
		Africa : 0
	}

	var continentWiseGdp = {
		"South America" : 0,
		Australia : 0,
		"North America" : 0,
		Asia : 0,
		Europe : 0,
		Africa : 0
	}

	parseData.forEach(function(rowData){
		var populationObj = {};
		var gdpObj = {};

		populationObj.countryName = rowData['Country Name'];
		populationObj.population = rowData['Population (Millions) - 2013'];

		populationData.push(populationObj);

		gdpObj.countryName = rowData['Country Name'];
		gdpObj.gdp = rowData['GDP Billions (US$) - 2013'];

		gdpData.push(gdpObj);

	});
	
	for(var i = 0;i<populationData.length;i++){
		continentWisePopulation[continents[populationData[i].countryName]] += parseFloat(populationData[i].population);
		continentWiseGdp[continents[populationData[i].countryName]] += parseFloat(gdpData[i].gdp);
	}
	
	for (var property in continentWisePopulation) {
		var aggregateObject = {};
	    if (continentWisePopulation.hasOwnProperty(property)) {
	        aggregateObject['Continent'] = property;
	        aggregateObject['Population'] = continentWisePopulation[property];
	        aggregateObject['Gdp'] = continentWiseGdp[property];
	    }
	    aggregateData.push(aggregateObject);
	}
	// console.log(aggregateData);
	fs.writeFileSync('output/aggregate.json', JSON.stringify(aggregateData), encoding = "utf8");
})