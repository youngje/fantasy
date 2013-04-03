var jsdom = require('jsdom');
var request = require('request');

exports.get = function(req, res) {
	
	var pcode = req.params.pcode;
	var fullUri = 'http://www.koreabaseball.com/Record/PitcherDetail1.aspx?pcode=' + pcode;
	request({uri: fullUri}, function(err, response, body) {
	
	var self = this;
	self.playerResult = [];

	if(err && response.statusCode !== 200) {
		console.log('Request error.');
	}

	// Send the body param as the HTML code we will aprse in jsdom
	// also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
	jsdom.env({
		html: body,
		scripts: ['http://code.jquery.com/jquery-1.6.min.js']
	}, function(err, window) {
		//use jQuery just as in a regular HTML page
		var $ = window.jQuery;

		var result = $("#contents > table")[0].querySelectorAll("tbody tr td");
		var result2 = $("#contents > table")[1].querySelectorAll("tbody tr td");

		var resultLength = result.length;
		for (var i = 0; i < resultLength; i++) {
			self.playerResult[i] = result[i].innerHTML;
		}
		var result2Length = result2.length;
		for (var i = 0; i < result2Length; i ++) {
			self.playerResult[i+ resultLength] = result2[i].innerHTML;
		}

		console.log(self.playerResult);
		//res.end(self.playerResult);
		res.end('done');

		//res.render('list', {title: 'NodeTube', items: self.items});
		});
	});
}