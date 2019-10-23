var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var urlencodedParser = bodyParser.urlencoded({extended: false})
var jsonParser = bodyParser.json()
var cassandra = require('cassandra-driver');

router.get('/',jsonParser,function(req,res){
    var data = req.body
    var query = 'SELECT contents FROM imgs WHERE filename = ?'; 
    var params = [data.filename];
    client = req.app.locals.client
    client.execute(query, params, function(err, result){
        if(err){
            console.log(err);
            res.json({status:"error"});
        }else{
            res.type('image/'+data.filename.split('.')[1])
            res.send(result.first().contents);
        }
    })
})

module.exports = router;