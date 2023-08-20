import mongoose from "mongoose";


const collegeSchema = new mongoose.Schema({

	collegeName: String,
	collegeAbbreviation: String,
	collegeDean: String,

})

const College = mongoose.model('College', collegeSchema)

export default College;