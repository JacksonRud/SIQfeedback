var express = require('express');
var router = express.Router();

/* GET home page. */
var list =  {
	"a": 
		{"question": "on a scale of whatever", "type": "scale",},
	"b":
		{"question": "tell me your life story", "type": "text"}

}

router.get('/', function(req, res, next) { res.render('index', list);
});


module.exports = router;
