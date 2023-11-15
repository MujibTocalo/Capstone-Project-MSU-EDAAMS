import mongoose from "mongoose";

const finalApprovers = new mongoose.Schema({

	Name: String,
	Designation: String,
	Signature: String,
}, { timestamps: true })

const FinalApprover = mongoose.model("FinalApprovers", finalApprovers)

export default FinalApprover