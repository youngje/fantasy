var jsdom = require('jsdom');
var request = require('request');

exports.get = function(pcode, isPitcher, pindex, team, callback) {
	var fullUri;
	if (isPitcher) {
		fullUri = 'http://www.koreabaseball.com/Record/PitcherDetail1.aspx?pcode=' + pcode;
	} else {
		fullUri = 'http://www.koreabaseball.com/Record/HitterDetail1.aspx?pcode=' + pcode;
	}
	
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

			var score = 0;

			var scoreParameter1 = []
				, scoreParameter2 = [];

			if (isPitcher) {
				scoreParameter1 = [0, 0, 0, 0, 2, 10, -1, 8, 5, 0, 0, 0, 2, -0.5, 0, 0, 0];
				scoreParameter2 = [0, 0, -0.5, -0.5, -0.5, 0.7, 0, 0, 0, -1, -1, 0, 0, 2];
			} else {
				scoreParameter1 = [0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 0, 1, 2, -0.5, 0, 0];
				scoreParameter2 = [1, 1, 1, -0.2, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0];
			}

			console.log(pcode + '/' + isPitcher + '/' + pindex);
			
			var result = $("#contents > table")[0].querySelectorAll("tbody tr td");
			var result2 = $("#contents > table")[1].querySelectorAll("tbody tr td");
			var index = 0;

			var resultLength = result.length;
			for (var i = 0; i < resultLength; i++) {
				if (scoreParameter1[i] != 0) {
					var eachSpec = result[i].innerHTML;
					if (i == 12) {
						var inning = eachSpec.split(' ')
						if (inning.length == 2) {
							eachSpec = Number(inning[0]) + Number(inning[1].slice(0, 1) * 0.33);	
						}
					}
					score += eachSpec * +(scoreParameter1[i]);
					console.log(index + '/' + score);
					self.playerResult[index] = eachSpec;	
					index++;
				}
			}

			var result2Length = result2.length;
			for (var i = 0; i < result2Length; i ++) {
				if (scoreParameter2[i] != 0) {
					score += result2[i].innerHTML * +(scoreParameter2[i]);
					console.log(index + '/' + score);
					self.playerResult[index] = result2[i].innerHTML;
					index++;
				}
			}

			if (isPitcher) {
				var isRescueWin = (self.playerResult[1] == 1) && (self.playerResult[5] < 5)
					,isNoHitNoRun = (self.playerResult[0] == 1) && (self.playerResult[6] == 0) && (self.playerResult[11] == 0)
					,isPerfect = isNoHitNoRun && ((self.playerResult[7] + self.playerResult[8] + self.playerResult[9]) == 0);

				if (isRescueWin) {
					score -= 2;
				} 
				if (isNoHitNoRun) {
					score += 50; 
				}
				if (isPerfect) {
					score += 100;
				}

				score = Math.round(score * 100) / 100;
			}

			console.log(self.playerResult);
			callback(team, isPitcher, pindex, score);
		});
	});
}