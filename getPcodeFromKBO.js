http://www.koreabaseball.com/Record/PlayerSearch.aspx?position=%ED%88%AC

에서 선수 이름, pcode 뽑아내기


var getPcodeFromKBO = {
	playerPcodeList : []
};
var self = getPcodeFromKBO;

var playerlist = $(".playerList");

var getPcode = function() {
	for(var i =0; i < playerlist.length; i++) {
		self.list = playerlist[i].querySelectorAll("li a");
		for(var j=0; j<self.list.length; j++) {
			var ahref  = self.list[j].getAttribute("href");
			var player = {};
			var playerSet = self.list[j].innerHTML;
			player.pcode = ahref.substr(ahref.length-5, 5);
			player.pname = playerSet.split('-')[0];
			player.pteam = playerSet.split('-')[1];
			self.playerPcodeList.push(player);
			console.log(player.pcode + " " + player.pname + " " + player.pteam);
		}
	}
}

getPcode();
	
	
