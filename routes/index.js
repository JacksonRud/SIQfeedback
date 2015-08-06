var express = require('express');
var fs = require('fs');
var router = express.Router();

end = [{"question": "Did you enjoy the conference?", "type": "scale-faces" , "answer": "" },
			{"question": "Will you come back again next year?", "type": "scale-faces" , "answer": "" },
			{"question": "what would be awesome for next year?", "type": "text" , "answer": "" }];


var questionlist = [{"type":"empty"}];
var qString = ""
if(fs.existsSync("public/info/questions.txt")){
	qString =fs.readFileSync('public/info/questions.txt').toString();
}
if(qString !== ""){
	questionlist= JSON.parse(qString);
}

var clList = [
	{name : "Code-A-Thon"},
	{name : "Continuous Delivery"},
	{name : "Don't Test Your Code"},
	{name : "Clean Code Basics"}
];


router.get('/', function(req, res, next){
	res.redirect("/topiclist");
});

router.get('/graphs', function(req, res, next){
	res.render('graphs', {ql : questionlist});
});

router.get('/comments', function(req, res, next){
	res.render('comments', {ql : questionlist});
});
router.get('/endcomments', function(req, res, next){
	res.render('endcomments', {ql : end});
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
    fs.truncate('"public/info/questions.txt"', 0, function(){console.log('done')})
    var string=req.body.obj
    fs.writeFile("public/info/questions.txt", string)    
    questionlist = JSON.parse(req.body.obj);
    res.send("ok");
});
router.get('/pretty', function(req, res, next){
	res.render('indexPretty', { ql : questionlist});
});
router.get('/end', function(req, res, next){
	res.render('endindexPretty', { ql : end});
});
router.get('/endgraphs', function(req, res, next){
	res.render('endgraphs', {ql : end});
});


module.exports = router;

