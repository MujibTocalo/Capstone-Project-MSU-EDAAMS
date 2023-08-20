import mongoose from "mongoose";

const officeSchema = new mongoose.Schema({
	officeName: String,
	officeAbbreviation: String,
	officeHead: String,
})

const Office = mongoose.model('Office', officeSchema)

export default Office;