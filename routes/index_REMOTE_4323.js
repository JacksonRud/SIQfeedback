var express = require('express');
var router = express.Router();

/* GET home page. */
var questionlist =  [
	{"question": "on a scale of whatever", "type": "scale",},
	{"question": "tell me your life story", "type": "text"},
	{"question": "how isnt it quite", "type": "text"}
]
router.get('/', function(req, res, next) { res.render('index', {ql : questionlist });
});

router.get('/pretty', function(req, res, next){
	res.render('indexPretty', { ql :questionlist});
});

module.exports = router;
