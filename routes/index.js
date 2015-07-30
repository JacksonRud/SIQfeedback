var express = require('express');
var router = express.Router();

var questionlist =  [
	{"question": "Vibhu??", "type": "scale-faces",},
	{"question": "Yes or no?", "type": "scale-faces",},
	{"question": "how isnt it quite", "type": "text",}
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


router.get('/graphs', function(req, res, next){
	res.render('graphs', {num: numbers});
});

router.get('/topiclist', function(req, res, next){
	res.render('topiclist', {clList : clList});
});

router.get('/thankyou', function(req, res, next){
	res.render('thankyou');
});
router.get("/setquestions", function(req, res, next){
	res.render('setquestions');
});
router.post('/postForSet', function(req, res) {
	questionlist = JSON.parse(req.body.obj);
	res.send("ok");
});
router.get('/pretty', function(req, res, next){
	res.render('indexPretty', { ql : questionlist});
});


module.exports = router;

