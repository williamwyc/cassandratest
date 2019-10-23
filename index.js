var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ 
    contactPoints: ['127.0.0.1:9042'],
    localDataCenter: 'datacenter1',
    keyspace: 'hw6'
  });

client.connect(function (err) {
    if(err){
        console.log(err);
    }
    else{
        console.log("Cassandra connected")
        app.locals.client = client;
    }
});

var deposit = require("./deposit.js")
var retrieve = require("./retrieve.js")

app.use('/deposit', deposit)
app.use('/retrieve', retrieve)

app.listen(3000,'0.0.0.0', () => {
    console.log('Listening...');
})