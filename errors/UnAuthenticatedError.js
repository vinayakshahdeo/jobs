const CustomError = require("./CustomError");
const {
	StatusCodes
} = require('http-status-codes');

class UnAuthenticatedError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}


module.exports = UnAuthenticatedError;