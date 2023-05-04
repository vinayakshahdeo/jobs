require('dotenv').config()
//async errors
require('express-async-errors')
//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
//express
const express = require('express')

const AuthenticationMiddleware = require('./middlewares/AuthenticationMiddleware')
//error handler
const NotFound = require('./middlewares/NotFound')
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandlerMiddleware')
const AuthRouter = require('./routes/Auth')
const JobsRouter = require('./routes/Jobs')
const app = express()
const PORT = process.env.PORT || 4000

app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, //15 minutes
        max: 100, //limit each IP to 100 requests for windowMs
    })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
const connectDB = require('./db')
//routes
app.use('/api/v1/auth', AuthRouter)
//authenticated routes
app.use('/api/v1/jobs', AuthenticationMiddleware, JobsRouter)

//middlewares
app.use(NotFound)
app.use(ErrorHandlerMiddleware)

//start server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
