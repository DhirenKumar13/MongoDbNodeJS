
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect("mongodb://localhost:27017/crunchbase", function(err,db){
	
	assert.equal(err,null);
	console.log("Successfully connected to MongoDB.");
	var query = {"category_code" : "biotech"};
	var projections = {"name" : 1,"category_code" : 1,"_id":0};
	var cursors = db.collection('companies').find(query);
	cursors.project(projections);
	
	cursors.forEach(
			function(docs) {
		console.log(docs.name);
		console.log(docs);
	},function(error){
		if(error){
			console.log(error.message);
		}
		db.close();
	});
});