const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
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
	type: {
		type: String,
		required: [true, `please provide a type`],
		enum: {
			values: ['investor', 'admin', 'vendor'],
			message: '{VALUE} is not supported'
		}
	},
	password: {
		type: String,
		required: [true, `please provide a password`],
		minLength: 6
	}
});

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

UserSchema.methods.createJWT = function () {
	return jwt.sign({
		userId: this._id,
		name: this.name
	}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME
	});
}

UserSchema.methods.comparePassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password)
	return isMatch;
}

module.exports = mongoose.model('User', UserSchema);