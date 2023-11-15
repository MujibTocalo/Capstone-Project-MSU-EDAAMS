import mongoose from "mongoose";


const dean = new mongoose.Schema({

	Name: String,
	Designation: String,
	Signature: String,
	EndorsementHeader: String,
	EndorsementSubject: String,
	EndorsementContent: String,
	EndorsementDate: Date,
	Remarks: String
}, { timestamps: true })

const Dean = mongoose.model('Deans', dean)

export default Dean;