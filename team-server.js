var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pbp-teams');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var teamRoutes = require('./routes/team.js')(app);

var server = app.listen(2001, function () {
    console.log('Server running at http://127.0.0.1:2001');
});