var express = require('express');
var router = express.Router();


var questionlist =  [
	{"question": "how?", "type": "scale", "answer": ""},
	{"question": "2", "type": "text", "answer": ""},
	{"question": "3", "type": "text", "answer": ""}
	]

router.get('/', function(req, res, next) { res.render('collectbuttondata', {ql : questionlist });
});


module.exports = router;

