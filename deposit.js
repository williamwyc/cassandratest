var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');
var urlencodedParser = bodyParser.urlencoded({extended: false})
var cassandra = require('cassandra-driver');
var upload = multer({ dest: 'uploads/' })

router.post('/',upload.single('contents'),function(req,res){
    var data = req.body
    var query = 'INSERT INTO imgs (filename, contents) VALUES (?, ?)'; 
    var params = [data.filename, req.file.buffer];
    client = req.app.locals.client
    console.log(req.file.buffer);
    client.execute(query, params, { prepare: true }, function(err){
        if(err){
            console.log(err);
            res.json({status:"error"});
        }else{
            console.log("INSERT "+data.filename)
            res.json({status:"OK"});
        }
    })
})

module.exports = router;