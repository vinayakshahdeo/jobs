const getAllJobs = async (req, res) => {
	res.send('get all jobs')
}

const getSingleJob = async (req, res) => {
	res.send('get single job')
}
const createJob = async (req, res) => {
	res.send('create single job')
}
const updateJob = async (req, res) => {
	res.send('update single job')
}
const deleteJob = async (req, res) => {
	res.send('delete single job')
}

module.exports = {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob
}