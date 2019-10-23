var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var urlencodedParser = bodyParser.urlencoded({extended: false})
var jsonParser = bodyParser.json()
var cassandra = require('cassandra-driver');

router.get('/',jsonParser,function(req,res){
    var query = 'SELECT contents FROM imgs WHERE filename = ?'; 
    var params = [req.query.filename];
    console.log(req.query.filename)
    client = req.app.locals.client
    client.execute(query, params, function(err, result){
        if(err){
            console.log(err);
            res.json({status:"error"});
        }else{
            type = 'image/'+req.query.filename.split('.')[1]
            console.log(type)
            res.setHeader('Content-Type', type)
            res.write(result.first().contents)
            res.end()
        }
    })
})

module.exports = router;