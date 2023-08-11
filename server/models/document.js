import mongoose from 'mongoose'
import User from './user.js'


const documentSchema = new mongoose.Schema({

	// Uploader Data
	controlNumber: String,
	collegeName: String,
	documentType: {
		type: String,
	},
	header: String,
	subject: String,
	content: String,
	uploaderName: {
		type: String
	},
	approverDesignation: String,
	approverName: String,

	// Dean Data
	deanApproverName: String,
	dateDeanApproved: Date,
	deanRemarks: String,
	deanDecision: Boolean,

	// OVCAA date
	endorserName: String,
	endorsementDate: Date,
	endorsementLetter: String,
	dateEndorsed: Date,
	endorserESign: String,
	EndorserRemarks: String,
	EndorserDecision: String,


	// Office of the President Data
	opApproverID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	opApprovalDate: Date,
	opApprovalRemark: String,
	opDecision: String,
	opESign: String,

	// RMO Data
	releaseDate: Date,
	rmoRemark: String,

	// Workflow Status
	documentStatus: {
		type: String,
		enum: ['Created', 'DeanApproved', 'Endorsed', 'PresidentApproved', 'Released', 'Rejected'],
		default: 'Created'
	}


}, { timestamps: true })

const Document = mongoose.model('Documents', documentSchema)

export default Document