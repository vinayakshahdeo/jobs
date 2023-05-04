const { StatusCodes } = require('http-status-codes')
// const { CustomError } = require('../errors')
const ErrorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    const customError = {
        //setting default properties
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went Wrong! Try again later!!',
    }
    //validation error
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => {
                console.log(item)
                return item.message
            })
            .join(', ')
        customError.statusCode = 400
    }
    //duplicate field error
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
        customError.statusCode = 400
    }
    //cast error
    if (err.name === 'CastError') {
        customError.msg = `No item found with id ${err.value}`
        customError.statusCode = 404
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })

    // return err instanceof CustomError
    //     ? res.status(err.statusCode).json({
    //           msg: err.message,
    //       })
    //     : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //           err,
    //       })
}
module.exports = ErrorHandlerMiddleware
