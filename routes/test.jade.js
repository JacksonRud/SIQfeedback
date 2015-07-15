var express = require('express');
var router = express.Router();

/* GET home page. */
var list =  {
	"a": 
		{"question": "Name?", "type": "scroll",},
	"b":
		{"question": "sup?", "type": "text"}

}

router.get('/', function(req, res, next) { res.render('', list);
});


module.exports = router;
