var jsdom = require('jsdom'),
	request = require('request');


exports.get = function(req, res) {
	request({uri: 'http://www.koreabaseball.com/Record/PitcherDetail1.aspx?pcode=77147'}, function(err, response, body) {
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
		var table2 = $("#contents > table")[1].querySelectorAll("tbody tr td");

		console.log(self.playerResult);
		res.end('done');
		//res.render('list', {title: 'NodeTube', items: self.items});
		});
	});
}