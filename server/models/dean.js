import mongoose from "mongoose";


const dean = new mongoose.Schema({

	Name: String,
	Designation: String,
	Signature: String,
	ApprovalDate: Date,
	Remarks: String
}, { timestamps: true })

const Dean = mongoose.model('Deans', dean)

export default Dean;