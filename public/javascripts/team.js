var teamList = {
		흥진 : "대방 시티즌",
		oskar : "분당 신입시원",
		순일 : "강동 이블스",
		승한 : "신촌 할렐루야",
		민경 : "신림 카디널스"
};

var getTeamName = function(id) {
		for (var team in teamList) {
			if (id == team) {
				console.log("ok");

				return teamList[team];
			}
		};
};

exports.getTeamName = getTeamName;