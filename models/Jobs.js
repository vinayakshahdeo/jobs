const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
	company: {
		type: String,
		required: [true, 'Please provide company name'],
		maxLength: 50
	},
	position: {
		type: String,
		required: [true, 'Please provide position'],
		maxLength: 100
	},
	status: {
		type: String,
		enum: ['interview', 'shortlisted', 'declined', 'pending', 'offer'],
		default: 'pending'
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user']
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Jobs', JobSchema);