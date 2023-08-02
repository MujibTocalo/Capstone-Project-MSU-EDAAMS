import Document from '../models/document.js'


// Controller For Getting all the Document
export const fetchDocuments = async (req, res) => {
	try {
		const document = await Document.find()

		res.json({ document })
	} catch (error) {
		res.json(error)
	}
}

// Controller For Getting a Single Document
export const fetchDocument = async (req, res) => {
	try {
		const id = req.params.id

		const document = await Document.findById(id)

		res.json({ document })
	} catch (error) {
		res.json(error)
	}
}

// // Controller For Document Deletion
// export const deleteDocument = async (req, res) => {
// 	try {
// 		const id = req.params.id

// 		const result = await Document.deleteOne({ id: id })

// 		if (result.deletedCount === 1) {
// 			res.json({ success: "Document Deleted" })
// 		} else {
// 			res.status(404).json({ error: "Document not found" })
// 		}
// 	} catch (error) {
// 		res.status(500).json({ error: "Internal Server Error" })
// 	}
// }

// Assuming you have imported the 'Document' model properly.

export const deleteDocument = async (req, res) => {
	try {
		const id = req.params.id;

		// Use 'findOneAndDelete' to find the document by its '_id' and delete it.
		const result = await Document.findOneAndDelete({ _id: id });

		if (result) {
			// 'findOneAndDelete' returns the deleted document or null if not found.
			res.json({ success: "Document Deleted" });
		} else {
			// If the document is not found, 'result' will be null.
			res.status(404).json({ error: "Document not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};


// Controller For Document Endorsement
export const endorseDocument = async (req, res) => {
	try {
		const { id } = req.params
		const { endorserId, endorsementLetter } = req.body

		const document = await Document.findById(id)
		if (!document) {
			return res.status(404).json({ error: 'Document Not Found.' })
		}

		document.endorser = endorserId
		document.endorsementDate = new Date()
		document.endorseLetter = endorsementLetter;
		document.documentStatus = decision === 'approved' ? 'approved' : 'rejected'
		if (decision === 'approved') {
			document.workflowStatus = 'Endorsed'
		}

		await document.save()
		res.json({ message: 'Document endorsed successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export const deanApproval = async (req, res) => {
	try {
		const { id } = req.params
		const { deanName, deanRemark, decision } = req.body

		const document = await Document.findById(id)

		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		document.deanApproverName = deanName;
		document.dateDeanApproved = Date.now();
		document.deanRemarks = deanRemark;
		document.deanDecision = decision;
		console.log(decision)

		if (decision === 'true') {
			document.documentStatus = 'DeanApproved';
			console.log(document.documentStatus)
		} else {
			document.documentStatus = 'Rejected';
		}

		await document.save();

	} catch (e) {

	}
}

export const approveDocument = async (req, res) => {
	try {
		const { id } = req.params
		const { approverId, decision, approvalRemarks } = req.body

		const document = await Document.findById(id)
		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		document.approver = approverId;
		document.approvalDate = new Date();
		document.approvalRemark = approvalRemarks;
		document.status = decision === 'approved' ? 'approved' : 'rejected'

		await document.save()
		res.json({ message: 'Document approved successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}


export const updateDocument = async (req, res) => {
	try {
		const id = req.params.id

		const { header, subject, content } = req.body

		await Document.findByIdAndUpdate(id, {
			header,
			subject,
			content,
			modifiedDate: Date.now()
		})

		const document = await Document.findById(id)

		res.json({ document })
		console.log("update pa nga")
	} catch (error) {
		res.json(error)
	}
}


export const createDocument = async (req, res) => {
	try {
		const { controlNumber, collegeName, documentType, header, subject, content, approverDesignation, approverName, uploaderName } = req.body

		const document = await Document.create({
			controlNumber,
			collegeName,
			documentType,
			header,
			subject,
			content,
			approverDesignation,
			approverName,
			uploaderName
		})

		res.json({ document })
		console.log(document)

	} catch (error) {
		throw (error)
	}
}

export const totalDocuments = async (req, res) => {
	try {
		const totalDocuments = await Document.countDocuments();
		res.json({ count: totalDocuments });
		console.log('hello')
		console.log({ totalDocuments })
	} catch (error) {
		console.error('Error fetching total number of documents:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
