var jsdom = require('jsdom'),
	request = require('request');

var pcodeList = {
		pitcherPcodeList : [],
		catcherPcodeList : [],
		inFieldPcodeList : [],
		outFieldPcodeList : []
};

var count = 0;

var getPcode = function(position, setPcode, res) {
	var positionUri = 'http://www.koreabaseball.com/Record/PlayerSearch.aspx?position=' + position;
	
	request({uri: positionUri }, function(err, response, body) {	

		if(err && response.statusCode !== 200) {
			console.log('Request error.');
		}

		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-1.6.min.js'] 
		}, function(err, window) {
			//use jQuery just as in a regular HTML page
			var $ = window.jQuery;

			var playerPcodeList = [];
			var playerlist = $(".playerList");	

			for(var i = 0; i < playerlist.length; i++) {
				var list = playerlist[i].querySelectorAll("li a");
				for(var j = 0, length = list.length; j < length; j++) {
					var ahref  = list[j].getAttribute("href");
					var player = {};
					var playerSet = list[j].innerHTML;
					player.code = ahref.substr(ahref.length-5, 5);
					player.name = playerSet.split('-')[0];
					player.team = playerSet.split('-')[1];
					player.position = position;
					playerPcodeList.push(player);
					res.write("\'" + player.name + "\'' : [" + player.code + ", \'" + player.team + "\', \'" + player.position + '\'],\n');
				}
			}
			setPcode(playerPcodeList, position, res);
		});
	});
};

var setPcode = function(playerPcodeList, position, res) {
	switch(position) {
		case '투' : pcodeList.pitcherPcodeList = playerPcodeList; console.log("ok1"); break;
		case '포' : pcodeList.catcherPcodeList = playerPcodeList; console.log("ok2"); break;
		case '내' : pcodeList.inFieldPcodeList = playerPcodeList; console.log("ok3"); break;
		case '외' : pcodeList.outFieldPcodeList = playerPcodeList; console.log("ok4"); break;
		default : console.log("position 값이 맞지 않음");
	}
	
	res.write('\n\n\n\n\n' + pcodeList.pitcherPcodeList.length + '\n');
	res.write(pcodeList.catcherPcodeList.length + '\n');
	res.write(pcodeList.inFieldPcodeList.length + '\n');
	res.write(pcodeList.outFieldPcodeList.length + '\n');
	res.end("done");
	// if(count < 3) {
	// 	count ++;
	// } else {
	// 	res.end('done');
	// }
};

exports.get = function(req, res) {
	var position = req.params.p;		// p = 투 / 포 / 내 / 외
	console.log(position);
	getPcode(position, setPcode, res);	 	
};