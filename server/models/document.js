import mongoose from 'mongoose'
import Dean from './dean'
import Endorser from './endorser'
import FinalApprover from './op'
import Releaser from './rmo'


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

	dean: Dean,
	endorser: Endorser,
	finalApprover: FinalApprover,
	releaser: Releaser,

	// Dean Data
	// deanApproverName: String,
	// deanApproverDesignation: String,
	// deanApproverSignature: String,
	// dateDeanApproved: Date,
	// deanRemarks: String,

	// OVCAA date
	// endorserName: String,
	// endorserDesignation: String,
	// endorsementDate: Date,
	// endorsementLetter: String,
	// endorserSignature: String,
	// EndorserRemarks: String,

	// Office of the President Data
	// opApproverName: String,
	// opApproverDesignation: String,
	// opApprovalDate: Date,
	// opApprovalRemark: String,
	// opSignature: String,

	// RMO Data
	// releaserName: String,
	// releaseDate: Date,
	// rmoRemark: String,

	// Workflow Status
	documentStatus: {
		type: String,
		enum: ['Pending', 'Dean Approved', 'Endorsed', 'OP Approved', 'Released', 'Rejected | OVCAA', 'Rejected | Dean', 'Rejected | OP', 'Not Released', 'Rejected'],
		default: 'Pending'
	}


}, { timestamps: true })

const Document = mongoose.model('Documents', documentSchema)

export default Document