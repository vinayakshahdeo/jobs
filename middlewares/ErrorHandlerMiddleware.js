const {
	StatusCodes
} = require('http-status-codes');
const {
	CustomError
} = require('../errors')
const ErrorHandlerMiddleware = (err, req, res, next) => {
	return (err instanceof CustomError) ?
		res.status(err.statusCode).json({
			msg: err.message
		}) :
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			err
		});
}
module.exports = ErrorHandlerMiddleware;