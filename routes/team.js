var _ = require('lodash');

var Team = require('../models/team.js');

module.exports = function (app) {

    /* Create */

    // post team
    app.post('/team', function (req, res) {
        var newTeam = new Team(req.body);
        newTeam.save(function (err) {
            if (err) {
                res.json({
                    info: 'error during team creation',
                    error: err
                });
            } else {
                res.json({
                    info: 'team created successfully'
                });
            }

        });
    });

    /* Read */
    app.get('/teams', function (req, res) {
        Team.find(function (err, teams) {
            if (err) {
                res.json({
                    info: 'error finding the list of teams',
                    error: err
                });
            }
            res.json({
                info: 'teams found successfully',
                data: teams
            });
        });
    });

    app.get('/team/:id', function (req, res) {
        Team.findById(req.params.id, function (err, team) {

            if (err) {
                res.json({
                    info: 'error while finding the team',
                    error: err
                });
            }

            if (team) {
                res.json({
                    info: 'successfully found the team',
                    data: team
                });
            } else {
                res.json({
                    info: 'team not found'
                });
            }
        });
    });


    /* Update */
    app.put('/team/:id', function (req, res) {
        Team.findById(req.params.id, function (err, team) {
            if (err) {
                res.json({
                    info: 'error finding team',
                    error: err
                });
            }

            if (team) {
                _.merge(team, req.body);
                team.save(function (err) {
                    if (err) {
                        res.json({
                            info: 'error during team update'
                        });
                    }
                    res.json({
                        info: 'team updated successfully'
                    });
                });
            } else {
                res.json({
                    info: 'team not found'
                });
            }

        });
    });


    /* Delete */
    app.delete('/team/:id', function (req, res) {
        Team.findByIdAndRemove(req.params.id, function (err) {

            if (err) {
                res.json({
                    info: 'error during team removal'
                });
            }

            res.json({
                info: 'team removed successfully'
            });

        });
    });
};