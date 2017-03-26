// we now have 3 servers, but why?
// having an all server, that communicates with the other servers
// this is b/c we only want to hit one point, not every different service
// easier to maintain, better for security.. not real performance hit
// these will eventually be in different docker 
// containers running simultaniously

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var allRoutes = require('./routes/all.js')(app);

var server = app.listen(2002, function () {
    console.log('Server running at http://127.0.0.1:2002');
});