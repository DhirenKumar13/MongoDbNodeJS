var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var commandLineArgs = require('command-line-args');

function queryBuilder(options) {
	console.log(options);
	var query = {
		"founded_year" : {
			"$gte" : options.firstYear,
			"$lte" : options.lastYear
		}
	};
	if ("employees" in options) {
		query.number_of_employees = {
			"$gte" : options.employees
		};
	}
	return query;
}


function commandLineOptions() {

    var cli = commandLineArgs([
        { name: "firstYear", alias: "f", type: Number },
        { name: "lastYear", alias: "l", type: Number },
        { name: "employees", alias: "e", type: Number }
    ]);
    
    var options = cli.parse()
    if ( !(("firstYear" in options) && ("lastYear" in options))) {
        console.log(cli.getUsage({
            title: "Usage",
            description: "The first two options below are required. The rest are optional."
        }));
        process.exit();
    }

    return options;
    
}


var options = commandLineOptions();

MongoClient.connect("mongodb://localhost:27017/crunchbase", function(err, db) {

	assert.equal(err, null);

	console.log("Successfully connected to MongoDB.");

	var query = queryBuilder(options);

	var projections = {
		"name" : 1,
		"founded_year" : 1,
		"_id" : 0
	};

	var cursors = db.collection('facebook').find(query, projections);

	cursors.forEach(function(docs) {
		console.log(docs.name);
		console.log(docs.founded_year);
		console.log(docs);
	}, function(error) {
		if (error) {
			console.log(error.message);
		}
		db.close();
	});

});
