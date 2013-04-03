var pcodeList = require('getPcodes').get;

var mongoClient = require('mongodb').MongoClient;

MongoClient.dbConnect('mongodb://localhost:27017/fantasy', function(err, db) {
	if(!err) {
		console.log('we are connected to MongoDB');
	} else {
		console.dir(err);
	}

	var collection = db.collection('fantasy');
	var playerList = 
	collection.insert(pcodeList, {w:1}, function(err, result) {});

})