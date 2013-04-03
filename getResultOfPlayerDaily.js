var table = $("#contents > table")[0];
var table2 = $("#contents > table")[1];
var result = table.querySelectorAll("tbody tr td");
var result2 = table2.querySelectorAll("tbody tr td");
var playerResult = [];

var resultLength = result.length;
for (var i = 0; i < resultLength; i++) {
	playerResult[i] = result[i].innerHTML;
}
var result2Length = result2.length;
for (var i = 0; i < result2Length; i ++) {
	playerResult[i+ resultLength] = result2[i].innerHTML;
}
