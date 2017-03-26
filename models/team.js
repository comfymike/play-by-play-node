var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    name: String,
    record: String,
    o_rank: Number,
    d_rank: Number
});

module.exports = mongoose.model('Team', teamSchema);