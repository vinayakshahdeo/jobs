const {
	BadRequestError,
	UnAuthenticatedError
} = require('../errors');
const User = require('../models/User');
const {
	StatusCodes
} = require('http-status-codes');

const register = async (req, res) => {
	const {
		body: {
			name,
			email,
			type,
			password
		}
	} = req;

	const user = await User.create({
		name,
		email,
		type,
		password
	});

	const token = user.createJWT();

	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name
		},
		token
	});
}

const login = async (req, res) => {
	const {
		body: {
			email,
			password
		}
	} = req;

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password');
	}

	const user = await User.findOne({
		email
	});

	if (!user) {
		throw new UnAuthenticatedError('Invalid credentials');
	}
	//compare password
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError('Invalid password');
	}

	const token = user.createJWT();

	res.status(StatusCodes.OK).json({
		user: {
			name: user.name
		},
		token
	});
}

module.exports = {
	login,
	register
}