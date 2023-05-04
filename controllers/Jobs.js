const { StatusCodes } = require('http-status-codes')
const Jobs = require('../models/Jobs')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Jobs.find({
        createdBy: req.user.userId,
    }).sort('createdAt')
    res.status(StatusCodes.OK).json({
        count: jobs.length,
        jobs,
    })
}

const getSingleJob = async (req, res) => {
    console.log(req.params.id)
    const {
        user: { userId },
        params: { id: jobID },
    } = req
    const jobs = await Jobs.findOne({ _id: jobID, createdBy: userId })
    if (!jobs) throw new NotFoundError('Invalid jobID')
    res.status(StatusCodes.OK).json({ jobs })
}
const createJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
    } = req
    if (!company || !position) {
        throw new BadRequestError('please send company and position')
    }
    const jobs = await Jobs.create({
        company,
        position,
        createdBy: userId,
    })
    res.status(StatusCodes.CREATED).json(jobs)
}
const updateJob = async (req, res) => {
    const {
        body: { company, position, status },
        user: { userId },
        params: { id: jobID },
    } = req
    if (!(company || position))
        throw new BadRequestError(`company or position can't be empty`)
    const jobs = await Jobs.findByIdAndUpdate(
        { _id: jobID, createdBy: userId },
        { company, position, status },
        { new: true, runValidators: true }
    )
    if (!jobs) throw new NotFoundError('Invalid jobID')
    res.status(StatusCodes.OK).json({ jobs })
}
const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobID },
    } = req
    const jobs = await Jobs.findByIdAndRemove({ _id: jobID, createdBy: userId })
    if (!jobs) throw new NotFoundError('Invalid jobID')
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
}
