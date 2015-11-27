/**
 * Created by colinjlacy on 11/27/15.
 */
'use strict';

const
	RecordModel = require('../models/recordmodel');

let appRouter = app => {
	const 
		fields = ['firstname', 'lastname', 'email'];
	app
		// init the POST route
		.post('/api/', (req, res, next) => {
			fields.forEach(field => {
				if(!req.body[field]) {
					return res.status(400).send({
						status: 'error',
						message: `A ${field} is required`
					});
				}
			});
			next();
		})
		// run the POST route
		.post('/api/', (req, res) => {
			RecordModel.save(req.body, (err, data) => {
				if(err) {
					return res.status(400).send(err);
				}
				res.send(data);
			});
		})
		// init the 'id' param
		.param('id', (req, res, next) => {
			if(!req.params.id) {
				return res.status(400).send({'status': 'error', 'message': 'A document id is required'});
			}
			next();
		})
		// run the GET to the 'id' param
		.get('/api/:id', (req, res) => {
			RecordModel.find(req.params.id, (err, data) => {
				if(err) {
					return res.status(400).send(err);
				}
				res.send(data);
			});
		})
		// run the DELETE to the 'id' param
		.delete('/api/:id', (req, res) => {
			RecordModel.delete(req.params.id, (err, data) => {
				if(err) {
					return res.status(400).send(err);
				}
				res.send(data);
			});
		})
		// run the GET route
		.get('/api/', (req, res) => {
			RecordModel.findAll((err, data) => {
				if(err) {
					return res.status(400).send(err);
				}
				res.send(data);
			});
		});
};

module.exports = appRouter;