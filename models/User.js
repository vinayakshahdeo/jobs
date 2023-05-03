const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, `please provide a name`],
		minLength: 3,
		maxLength: 100
	},
	email: {
		type: String,
		required: [true, `please provide a email`],
		match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
		unique: true
	},
	password: {
		type: String,
		required: [true, `please provide a password`],
		minLength: 6,
		maxLength: 12
	}
});

module.exports = mongoose.model('User', userSchema);