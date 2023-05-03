const {
	BadRequestError
} = require('../errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
	StatusCodes
} = require('http-status-codes');

const register = async (req, res) => {

	const {
		body: {
			name,
			email,
			password
		}
	} = req;
	const tempUser = {
		name,
		email,
		password
	};
	if (!name || !email || !password) {
		throw new BadRequestError(`please provide name, email and password`);
	}
	const user = await User.create({
		name,
		email,
		password
	});
	res.status(StatusCodes.CREATED).json(
		user
	);
}

const login = async (req, res) => {
	res.send('user LOGGEDIN')
}

module.exports = {
	login,
	register
}