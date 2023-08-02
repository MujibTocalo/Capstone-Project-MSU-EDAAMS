import UploadedFile from "../models/signatures"


export const uploadSignature = async (req, res) => {
	const file = req.file

	await UploadedFile.insertOne({
		name: file.originalname,
		type: file.mimetype,
		size: file.size,
		data: file.buffer
	})

	console.log("File Uploaded Successfully")
}