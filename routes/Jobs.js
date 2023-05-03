const express = require('express');
const Router = express.Router();

const {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob
} = require('../controllers/Jobs');

Router.route('/').post(createJob).get(getAllJobs);
Router.route('/:id').get(getSingleJob).delete(deleteJob).patch(updateJob);

module.exports = Router;