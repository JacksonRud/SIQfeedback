var express = require('express');
var router = express.Router();

var questionlist =  [
	{"question": "how?", "type": "scale", "answer": ""},
	{"question": "2", "type": "text", "answer": ""},
	{"question": "3", "type": "text", "answer": ""}
	]


/* GET home page. */
var questionlist =  [
	{"question": "Vibhu??", "type": "scale-faces",},
	{"question": "Are you confused", "type": "scale-stars",},
	{"question": "Do you love me", "type": "scale-hearts",},
	{"question": "tell me your life story", "type": "text"},
	{"question": "how isnt it quite", "type": "text"}
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

module.exports = router;

