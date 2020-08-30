var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var recordSchema = new Schema({
	_id:{ type: mongoose.Schema.Types.ObjectId},
	key: String,
	createdAt: Date,
	counts: [Number],
	value: String
});

module.exports = mongoose.model("records", recordSchema);