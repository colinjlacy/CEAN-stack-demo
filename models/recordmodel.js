/**
 * Created by colinjlacy on 11/27/15.
 */
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
			callback(err, null);
		} else {
			callback(null, res);
		}
	});
};

module.exports = RecordModel;