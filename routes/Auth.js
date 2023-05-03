const express = require('express');
const Router = express.Router();

const {
	register,
	login
} = require('../controllers/Auth');
//no psecific way just tring different methods
Router.post('/register', register)
Router.post('/login', login);

module.exports = Router;