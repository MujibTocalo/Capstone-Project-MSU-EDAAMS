import mongoose from "mongoose";


const releaser = mongoose.Schema({
	Name: String,
	DateReleased: Date,
	Remark: String,
}, { timestamp: true })

const Releaser = mongoose.model('Releasers', releaser)

export default Releaser