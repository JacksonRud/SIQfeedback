var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/feedback', function(req, res) {
    var db = req.db;
    var collection = db.get('SIQfeedback');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * POST to adduser.
 */
router.post('/sendfeedback', function(req, res) {

    var db = req.db;   
    var collection = db.get('SIQfeedback');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = router;


