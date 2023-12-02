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

	// OVCAA date
	endorserName: String,
	endorserDesignation: String,
	endorsementDate: Date,
	endorsementHeader: String,
	endorsementSubject: String,
	endorsementContent: String,
	endorserSignature: String,

	// Office of the President Data
	approverName: String,
	approverDesignation: String,
	approvalDate: Date,
	approverHeader: String,
	approverSubject: String,
	approverContent: String,
	approverSignature: String,


	// RMO Data
	releaserName: String,
	releaseDate: Date,

	// Rejection Data
	rejectedName: String,
	rejectedDesignation: String,
	rejectedDate: Date,
	rejected: Boolean,
	rejectedPoint: String,
	rejectedRemarks: String,

	// Workflow Status
	documentStatus: {
		type: String,
		enum: ['Pending', 'Dean Endorsed', 'OVCAA Endorsed', 'OP Approved', 'Released', 'Rejected | OVCAA', 'Rejected | Dean', 'Rejected | OP', 'Not Released', 'Rejected'],
		default: 'Pending'
	}


}, { timestamps: true })

const Document = mongoose.model('Documents', documentSchema)

export default Document