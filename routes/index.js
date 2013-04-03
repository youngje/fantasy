/*
 * GET home page.
 */
var team = require('../public/javascripts/team');
var dailyScore = require('../public/javascripts/dailyScore');

exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};

exports.team = function(req, res) {
	var id = req.params.id
	  , teamName = "그런 팀 없어"; 

	if (id) {
		teamName = team.getTeamName(id);
	}
	res.render('teampage', { title: teamName});
};

exports.draft = function(req, res) {
	res.render('draft', { title: 'draft'});
}

exports.get = dailyScore.get;