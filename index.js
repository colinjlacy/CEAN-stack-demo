/**
 * Created by colinjlacy on 11/27/15.
 */
'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	couchbase = require('couchbase'),
	path = require('path'),
	config = require('./config'),
	app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/')(app);

var server = app.listen(3000, function () {
	console.log('Listening on port %s...', server.address().port);
});