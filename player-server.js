// V1

//// no express
//
//// http included with node?.. must be
//var http = require('http');
//
//
//// createServer comes with the http package
//// which takes a callback function 
//// with request and response objects
//// in short.. take the request, pull properties out of (if need)
//// then add to response and send it back
//http.createServer(function (req, res) {
//    // write header with 200 response and plain text type
//    res.writeHead(200, {
//        'Content-Type': 'text/plain'
//    });
//    // send this text to the server that made the request
//    // and end the response
//    res.end('Hello Motha Fucka\n');
//    
//    // listen on port 2000 on the local host... 
//    // 127.0.0.1 = localhost
//}).listen(2000, '127.0.0.1');
//
//console.log('Server running at http://127.0.0.1:2000/');


// V2
// exactly the same as the code above, but using express
// express is simple. very bare bones, just set up server
// with endpoints
var express = require('express');

// first create an app and execute the express function
var app = express();
// var app = require('express')(); ... should work

// parses request objects into usable json
var bodyParser = require('body-parser');

// require mongoose, so we have an ODM - Object Document Model
var mongoose = require('mongoose');
// this name can be anything?
mongoose.connect('mongodb://localhost/pbp-players');


// w/o this, if someone passes json, you couldn't read it
// don't fucking foget to execute these! breaks code. 
// no errors!! just a server that won't respond
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// pull in players.js, which has all of our routes for players
// also pass it app, so it has access to express (?)
var players = require('./routes/player.js')(app);

var server = app.listen(2000, function () {
    console.log('Server running at http://127.0.0.1:2000/');
});