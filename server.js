require('dotenv').config();
require('express-async-errors');

const express = require('express');


//async errors

const app = express();
const PORT = process.env.PORT || 4000
app.use(express.json());
const connectDB = require('./db')
//routes
app.get('/api/v1/', (req, res) => {
	console.log('first')
	res.send('here')
})

//middlewares


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