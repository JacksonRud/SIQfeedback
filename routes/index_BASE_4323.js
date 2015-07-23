var express = require('express');
var router = express.Router();

/* GET home page. */
var questionlist =  {
	"a": 
		{"question": "on a scale of whatever", "type": "scale",},
	"b":
		{"question": "tell me your life story", "type": "text"},
	"c":
		{"question": "how isnt it quite", "type": "text"}

}

router.get('/', function(req, res, next) { res.render('index', {ql : questionlist });
});


module.exports = router;
