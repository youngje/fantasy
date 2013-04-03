var jsdom = require('jsdom'),
	request = require('request');

var pcode = {};

pcode.get = function(position) {
	var self = this;
	self.playerPcodeList = [];
	
	var positionUri = 'http://www.koreabaseball.com/Record/PlayerSearch.aspx?position=' + position;
	
	request({uri: positionUri }, function(err, response, body) {	

		if(err && response.statusCode !== 200) {
			console.log('Request error.');
		}

		function getPcodeListFromKBO(callback) {
			jsdom.env({
				html: body,
				scripts: ['http://code.jquery.com/jquery-1.6.min.js'] 
			}, function(err, window) {
				//use jQuery just as in a regular HTML page
				var $ = window.jQuery;

				var playerlist = $(".playerList");	

				var getPcode = function() {
					var playerPcodeList = [];
					for(var i = 0; i < playerlist.length; i++) {
						self.list = playerlist[i].querySelectorAll("li a");
						for(var j = 0; j < self.list.length; j++) {
							var ahref  = self.list[j].getAttribute("href");
							var player = {};
							var playerSet = self.list[j].innerHTML;
							player.pcode = ahref.substr(ahref.length-5, 5);
							player.pname = playerSet.split('-')[0];
							player.pteam = playerSet.split('-')[1];
							playerPcodeList.push(player);
							console.log(player.pcode + " " + player.pname + " " + player.pteam);
						}
					}
				return playerPcodeList;
				}
			});
			callback(getPcode());
		}
		getPcodeListFromKBO(function(playerList){
			self.playerPcodeList = playerList;
		});

	});
}

exports.get = function(req, res) {
	var pcodeList = {
		pitcherPcodeList : pcode.get('투'),	 	//투수 %ED%88%AC
		hitterPcodeList : pcode.get('포'),		//포수 %ED%8F%AC
		inFieldPcodeList : pcode.get('내'),		//내야수 %EB%82%B4
		outFieldPcodeList : pcode.get('외')		//외야수 %EC%99%B8
	}
	console.log(pcodeList);
	res.end("done");
}

