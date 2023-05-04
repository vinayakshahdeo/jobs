const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
	UnAuthenticatedError
} = require('../errors');

const AuthenticationMiddleware = (req, res, next) => {
	const {
		headers: {
			authorization
		}
	} = req;

	if (!(authorization || authorization.startsWith('Bearer '))) {
		throw new UnAuthenticatedError('Authentication Invalid');
	}
	const token = authorization.split(' ')[1];


	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		//attach the user to job route
		req.user = {
			userId: payload.userId,
			name: payload.name
		};
		next();
	} catch (error) {
		throw new UnAuthenticatedError('Authentication Invalid');
	}

}
module.exports = AuthenticationMiddleware;