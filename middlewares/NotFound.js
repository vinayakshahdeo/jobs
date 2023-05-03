const {
	StatusCodes
} = require('http-status-codes');

const NotFound = (req, res) => {
	res.status(StatusCodes.NOT_FOUND).send(`route doesn't exist`);
}

module.exports = NotFound