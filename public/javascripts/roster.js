var pcode = require("./pcode")
	, playerDailyScore = require("./playerDailyScore");

var pitcherList = pcode.pitcher;
var hitterList = pcode.hitter;

var oskar = {
	pitcher : ['오승환', '리즈', '손승락', '윤성환', '양현종', '신정락', '정현욱', '올슨'],
	hitter : ['조인성', '이승엽', '조동찬', '정성훈', '김선빈', '최형우', '박용택', '정수빈', '최진행', '최준석', '신종길', '허경민'],
	pCode : [],
	hCode : [],
	pPoint : [],
	hPoint : []
}

var addPcode = function(team) {
	var pitcher = team.pitcher
		, hitter = team.hitter
		, pitcherPcode = []
		, hitterPcode = [];
	
	pitcher.forEach(function(player) {
		pitcherPcode.push(pitcherList[player][0]);
	});
	
	hitter.forEach(function(player) {
		hitterPcode.push(hitterList[player][0]);
	});

	team.pCode = pitcherPcode;
	team.hCode = hitterPcode;
}

var getPoints = function(team) {
	var pitcher = team.pCode
		, hitter = team.hCode;

	
	for (var i = 0, length = pitcher.length; i < length; i++) {
		playerDailyScore.get(pitcher[i], true, i, team, addPoints);
	}

	for (var i = 0, length = hitter.length; i < length; i++) {
		playerDailyScore.get(hitter[i], false, i, team, addPoints);
	}	
}

var addPoints = function(team, isPitcher, index, score) {
	if (isPitcher) {
		team.pPoint[index] = score;
	} else {
		team.hPoint[index] = score;
	}
}

var printTeamScoreBoard = function(team, res) {
	var pitcher = team.pitcher
		, hitter = team.hitter;

	for (var i = 0, length = pitcher.length; i < length; i++) {
		res.write(pitcher[i] + '\t' + team.pPoint[i] + '\n');
	}
	for (var i = 0, length = hitter.length; i < length; i++) {
		res.write(hitter[i] + '\t' + team.hPoint[i] + '\n');
	}
	res.end("done");
}

exports.oskar = function(req, res) {
	addPcode(oskar);
	getPoints(oskar);

	var check = setTimeout(function(){
		printTeamScoreBoard(oskar, res);
	}, 10000);
}