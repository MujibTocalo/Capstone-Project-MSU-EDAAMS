import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		auto: true
	},
	firstName: String,
	lastName: String,
	designation: String,
	office: String,
	email: {
		unique: true,
		required: true,
		type: String
	},
	password: {
		type: String,
		required: true,
		min: 8
	},
	userType: {
		type: String
	},
	year: {
		type: Date
	},

	signature: String,

	status: {
		type: String,
		enum: ['Active', 'InActive']
	},
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User
