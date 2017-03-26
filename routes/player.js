// a utility module that does a lot of things
// on arrays and collections
// map, reduce, find, etc...
// very popular, possibly used more than express (3x more!)
// maybe should just be part of node... 
var _ = require('lodash');

// capital 'P' b/c it's basically a constructor
var Player = require('../models/player.js');


// make this file available to other files
module.exports = function (app) {

    //    var _players = [];

    /* Create */

    // post player
    app.post('/player', function (req, res) {

        // before adding mongoose:
        // _players.push(req.body);

        // no validation.. take body of request
        // declare model
        var newPlayer = new Player(req.body);

        // save it to mongo
        // telling the model to save itself (takes a callback)
        newPlayer.save(function (err) {

            // if there's an error, send info + error
            if (err) {
                res.json({
                    info: 'error during player creation',
                    error: err
                });
            // otherwise, respond with json to exclaim success!
            } else {
                
                res.json({
                    info: 'player created successfully'
                });
            }

        });
    });

    /* Read */
    app.get('/', function (req, res) {
        // res.send('hello motha fucka');

        res.json({
            hello: 'motha fucka!'
        });

    });


    
    app.get('/players', function (req, res) {
        // Player.find and pass in a callback function
        // in the callback, include an err and the players object 
        // 2nd.. node convention.. and how the response from the
        // find() func is designed?)
        Player.find(function (err, players) {
            if (err) {
                res.json({
                    info: 'error finding the list of players',
                    error: err
                });
            }
            res.json({
                info: 'players found successfully',
                data: players
            });
        });
    });

    app.get('/player/:id', function (req, res) {
        
        // findById is a function provided by mongoose
        // John Pappa:
        // we're using Node to talk to Express 
        // to talk to Monngoose to talk to MongoDB
        Player.findById(req.params.id, function (err, player) {

            if (err) {
                res.json({
                    info: 'error while finding the playa',
                    error: err
                });
            }

            if (player) {
                res.json({
                    info: 'successfully found the playa',
                    data: player
                });
            } else {
                res.json({
                    info: 'playa not found'
                });
            }
        });

        //        res.send(
        //            // lodash example
        //            // find in the player array, the player
        //            // whose name matches req.params.id
        //            _.find(
        //                _players, {
        //                    name: req.params.id
        //                }
        //            )
        //        );
    });


    /* Update */
    app.put('/player/:id', function (req, res) {
        Player.findById(req.params.id, function (err, player) {
            if (err) {
                res.json({
                    info: 'error finding playa',
                    error: err
                });
            }

            if (player) {
                // use lodash to merge the existing cat with new data
                _.merge(player, req.body);
                player.save(function (err) {
                    if (err) {
                        res.json({
                            info: 'error during playa update'
                        });
                    }
                    res.json({
                        info: 'playa updated successfully'
                    });
                });
            } else {
                res.json({
                    info: 'playa not found'
                });
            }

        });
        //        // another lodash example, 
        //        // different way to search
        //        // find the index of the player whose
        //        // name matches req.params.id
        //        var index = _.findIndex(
        //            _players, {
        //                name: req.params.id
        //            }
        //        );
        //        _.merge(_players[index], req.body);
        //        res.json({
        //            info: 'player updated successfully'
        //        });
    });


    /* Delete */
    app.delete('/player/:id', function (req, res) {
        Player.findByIdAndRemove(req.params.id, function (err) {

            if (err) {
                res.json({
                    info: 'error during playa removal'
                });
            }

            res.json({
                info: 'playa removed successfully'
            });

        });
        //        _.remove(_players, function (player) {
        //            return player.name === req.param.id;
        //        });
        //        res.json({
        //            info: 'player removed successfully'
        //        });
    });
};