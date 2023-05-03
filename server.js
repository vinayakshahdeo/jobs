require('dotenv').config();
//async errors
require('express-async-errors');

const express = require('express');

//error handler
const NotFound = require('./middlewares/NotFound');
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandlerMiddleware')
const AuthRouter = require('./routes/Auth');
const JobsRouter = require('./routes/Jobs');
const app = express();
const PORT = process.env.PORT || 4000
app.use(express.json());
const connectDB = require('./db')
//routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/jobs', JobsRouter);

//middlewares
app.use(NotFound);
app.use(ErrorHandlerMiddleware);

//start server
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, console.log(`server is listening on port ${PORT}`));
	} catch (error) {
		console.log(error)
	}
}
start();