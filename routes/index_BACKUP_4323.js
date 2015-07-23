var express = require('express');
var router = express.Router();

<<<<<<< HEAD

var questionlist =  [
	{"question": "how?", "type": "scale", "answer": ""},
	{"question": "2", "type": "text", "answer": ""},
	{"question": "3", "type": "text", "answer": ""}
	]

router.get('/', function(req, res, next) { res.render('collectbuttondata', {ql : questionlist });
=======
/* GET home page. */
var questionlist =  [
	{"question": "on a scale of whatever", "type": "scale",},
	{"question": "tell me your life story", "type": "text"},
	{"question": "how isnt it quite", "type": "text"}
]
router.get('/', function(req, res, next) { res.render('index', {ql : questionlist });
>>>>>>> b5afb7fbc0542a4d895a824810a623984d7a8cae
});

router.get('/pretty', function(req, res, next){
	res.render('indexPretty', { ql :questionlist});
});

module.exports = router;

