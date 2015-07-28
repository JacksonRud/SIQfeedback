var express = require('express');
var router = express.Router();

var questionlist =  [
	{"question": "Vibhu??", "type": "scale-faces",},
	{"question": "Yes or no?", "type": "scale-faces",},
	{"question": "how isnt it quite", "type": "text"}
	]

var numbers = [
	{"t":"ones", "num":1 },
	{"t":"twos", "num":2},
	{"t":"threes", "num":3},
	{"t":"fours", "num":5},
	{"t":"fives", "num":4}
]

var clList = [
	{name : "Loving"},
	{name : "Hating"},
	{name : "Dying"},
	{name : "Laughing"}
]

router.get('/', function(req, res, next) {
	res.render('collectbuttondata', {ql : questionlist })
});

router.get('/welcome', function(req, res, next){
	res.render('welcome');
});

router.get('/pretty', function(req, res, next){
	res.render('indexPretty', { ql :questionlist});
});

router.get('/graphs', function(req, res, next){
	res.render('graphs', {num: numbers});
});

router.get('/topiclist', function(req, res, next){
	res.render('topiclist', {clList : clList});
});

router.get('/test', function(req, res, next){
	res.render('test');
});

module.exports = router;

