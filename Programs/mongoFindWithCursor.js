
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect("mongodb://localhost:27017/crunchbase", function(err,db){
	
	assert.equal(err,null);
	console.log("Successfully connected to MongoDB.");
	var query = {"category_code" : "biotech"};
	db.collection('companies').find(query).toArray(function(err,docs){
		if(!err){
			docs.forEach(function(doc) {
				console.log(doc.name + " is the company name.");
			});
		}
		else{
			console.log(err.message);
			console.log("Error");
			db.close();
		}
	});
});