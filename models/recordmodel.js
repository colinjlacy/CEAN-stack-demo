/**
 * Created by colinjlacy on 11/27/15.
 */
'use strict';

const
	uuid = require('uuid'),
	db = require('../index').bucket,
	config = require('../config'),
	query = require('couchbase').N1qlQuery;

function RecordModel() { }

RecordModel.save = (data, callback) => {
	const
		jsonObject = {
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email
		},
		documentId = data.document_id ? data.document_id : uuid.v4();

	db.upsert(documentId, jsonObject, (err, res) => {
		if (err) {
			return callback(err, null);
		} else {
			callback(null, {message: 'baller', data: res});
		}
	});
};

RecordModel.find = (id, callback) => {
	const
		// this is NOT OK
		statement = "SELECT firstname, lastname, email " +
			"FROM `" + config.couchbase.bucket + "` AS users " +
			"WHERE META(users).id = $1";

	db.query(query.fromString(statement), [id], (err, res) => {
		if(err) {
			return callback(err, null);
		} else {
			callback(null, res);
		}
	});

};

RecordModel.delete = (id, callback) => {
	db.remove(id, (err, res) => {
		if(err) {
			return callback(err, null);
		} else {
			callback(null, {message: 'baller', data: res});
		}
	});
};

RecordModel.findAll = callback => {
	const
		statement = "SELECT META(users).id, firstname, lastname, email " +
			"FROM `" + config.couchbase.bucket + "` AS users",
		indexQuery = query.fromString(statement).consistency(query.Consistency.REQUEST_PLUS);

	db.query(indexQuery, (err, res) => {
		if(err) {
			return callback(err, null);
		} else {
			callback(null, res);
		}
	});
};

module.exports = RecordModel;