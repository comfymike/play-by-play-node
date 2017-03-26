// request = kind of like a node version of postman
// we use it so one server can talk to another over http
// request can also be used for webscrapes

var r = require('request').defaults({
	json: true
});

var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

module.exports = function (app) {
	/*READ*/
	app.get('/all', function (req, res) {
		async.parallel({
				teams: function (callback) {
					r({
						uri: 'http://localhost:2001/teams'
					}, function (error, response, body) {
						if (error) {
							callback({
								service: 'teams',
								error: error
							});
							return;
						}
						if (!error && response.statusCode === 200) {
							callback(null, body);
						} else {
							callback(response.statusCode);
						}
					});
				},
				// now using a redis cache
				players: function (callback) {
					client.get('http://localhost:2000/players', function (error, players) {
						if (error) {
							throw error;
						}
						if (players) {
							console.log('redis style');
							callback(null, JSON.parse(players));
						} else {
							console.log('no redis');
							r({
									uri: 'http://localhost:2000/players'
								},
								function (error, response, body) {

									if (error) {
										callback({service: 'players', error: error});
										return;
									}
									if (!error && response.statusCode === 200) {
										callback(null, body.data);
										// no reseting of cache:
										//client.set('http://localhost:2000/players', JSON.stringify(body.data), function (error) {
										client.setex('http://localhost:2000/players', 10,  JSON.stringify(body.data), function (error) {
											if (error) {
												throw error;
											}
										});
									} else {
										callback(response.statusCode);
									}
								});
						}
					});
				}
			},
			function (error, results) {
				res.json({
					error: error,
					results: results
				});
			});
	});
};

// NOTE:
// we'll run these servers with 'forever' which we installed globally
// can start up each server and have the running in background
// otherwise, you run each in a different terminal window
// we can choose to run a single server in the fore-ground if we choose
// forever doesn't watch and restart, so if playing around much, 
// nodemon could be a better option