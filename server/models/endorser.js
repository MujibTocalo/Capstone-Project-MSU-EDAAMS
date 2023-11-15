import mongoose from "mongoose";


const endorser = new mongoose.Schema({

	Name: String,
	Designation: String,
	EndorsementDate: Date,
	endorsementLetter: String,
	Signature: String,
	Remarks: String
}, { timestamps: true })

const Endorser = mongoose.model("Endorsers", endorser)

export default Endorser;