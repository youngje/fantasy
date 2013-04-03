var myTeam = {

	id : "oskar",
	name : "분당 신입사원",

	players : {
		C : "none",
		B1 : "none",
		B2 : "none",
		B3 : "none",
		SS : "none",
		LF : "none",
		CF : "none",
		RF : "none",
		DH1 : "none", 
		DH2 : "none", 
		DH3 : "none", 
		DH4 : "none",

		P1 : "none", 
		p2 : "none", 
		p2 : "none", 
		p2 : "none", 
		p2 : "none", 
		p2 : "none", 
		p2 : "none", 
		p2 : "none"],

		RES1 : "none",
		RES1 : "none", 
		RES1 : "none",
		RES1 : "none",
		RES1 : "none"],
		
		DL1 : "none", 
		DL2 : "none"
	},
	
	swap : function(pcode1, pcode2) {
		var position1 = null, 
		  position2 = null,
		  playerLenth = this.players.length();
		  players = this.players;
		  for (var role in players) {

		  	if (players[role] == pcode1) {
		  	 	position1 = players[role];
		  	} else if (players[role] == pcode2) {
		  		position2 = players[role];
		  	}
		  }

		  if (position1 && position2) {
		  	players[position1] = pcode2;
		  	players[position2] = pcode1;
		  }
	},

	findPosition : function(pcode) {
		var position = null;
		var playerLength = this.players.length();
		var players = this.players;
		for (var role in players) {
			if (players[role] == pcode){
				position = players[role];
				break;
			}
		}

		return position;
	}
}

originalTeam = ["SK", "삼성", "LG", "NC", "롯데", "기아", "두산", "한환", "넥센"];

var player = {
	pcode : 0,
	name : ,
	originalTeam : 0,
	currentTeam : "id",

	position : 

}