import mongoose from 'mongoose'
import User from './user.js'


const documentSchema = new mongoose.Schema({

	// Uploader Data
	controlNumber: String,
	collegeName: String,
	documentType: String,
	header: String,
	subject: String,
	content: String,
	uploaderName: String,
	uploaderDesignation: String,
	uploaderSignature: String,

	// Dean Data
	deanApproverName: String,
	deanApproverDesignation: String,
	deanApproverSignature: String,
	dateDeanApproved: Date,
	deanRemarks: String,

	// OVCAA date
	endorserName: String,
	endorserDesignation: String,
	endorsementDate: Date,
	endorsementLetter: String,
	endorserSignature: String,
	EndorserRemarks: String,


	// Office of the President Data
	opApproverName: String,
	opApproverDesignation: String,
	opApprovalDate: Date,
	opApprovalRemark: String,
	opESign: String,

	// RMO Data
	releaseDate: Date,
	rmoRemark: String,

	// Workflow Status
	documentStatus: {
		type: String,
		enum: ['Pending', 'DeanApproved', 'Endorsed', 'PresidentApproved', 'Released', 'Rejected'],
		default: 'Pending'
	}


}, { timestamps: true })

const Document = mongoose.model('Documents', documentSchema)

export default Document