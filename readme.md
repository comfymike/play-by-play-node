To use, start all-server.js, player-server.js, team-server.js
Also run mongodb and redis

**commands: 


forever start player-server.js
// port 2000

forever start team-server.js
// port 2001

forever list
// to check running processes

node all-server.js
// port 2002

mongod
// start mongo

mongo
// start mongo cli

redis-server
// start redis

redis-cli
// start redis cli
