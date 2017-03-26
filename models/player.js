var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    name: String,
    team: String,
    position: String
});

module.exports = mongoose.model('Player', playerSchema);