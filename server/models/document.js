import mongoose from 'mongoose'

// Document Schema
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
	deanName: String,
	deanDesignation: String,
	deanEndorsementHeader: String,
	deanEndorsementSubject: String,
	deanEndorsementContent: String,
	deanSignature: String,
	deanEndorsementDate: Date,
	deanRemarks: String,

	// OVCAA date
	endorserName: String,
	endorserDesignation: String,
	endorsementDate: Date,
	endorsementHeader: String,
	endorsementSubject: String,
	endorsementContent: String,
	endorserSignature: String,
	endorserRemarks: String,

	// Office of the President Data
	approverName: String,
	approverDesignation: String,
	approvalDate: Date,
	approverHeader: String,
	approverSubject: String,
	approverContent: String,
	approverSignature: String,
	approverRemarks: String,


	// RMO Data
	releaserName: String,
	releaseDate: Date,
	rmoRemark: String,

	// Workflow Status

	documentStatus: {
		type: String,
		enum: ['Pending', 'Dean Approved', 'Endorsed', 'OP Approved', 'Released', 'Rejected | OVCAA', 'Rejected | Dean', 'Rejected | OP', 'Not Released', 'Rejected'],
		default: 'Pending'
	}


}, { timestamps: true })

const Document = mongoose.model('Documents', documentSchema)

export default Document