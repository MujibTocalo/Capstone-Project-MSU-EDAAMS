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

export const deleteDocument = async (req, res) => {
	try {
		const id = req.params.id;

		const result = await Document.findOneAndDelete({ _id: id });

		if (result) {
			res.json({ success: "Document Deleted" });
		} else {
			res.status(404).json({ error: "Document not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const endorseDocument = async (req, res) => {
	try {
		const { id } = req.params
		const { endorserName, endorserDesignation, endorsementLetter, endorserRemark, decision, endorserSignature } = req.body

		const document = await Document.findById(id)
		if (!document) {
			return res.status(404).json({ error: 'Document Not Found.' })
		}

		document.endorserName = endorserName
		document.endorserDesignation = endorserDesignation
		document.endorserSignature = endorserSignature
		document.endorsementDate = Date.now();
		document.endorsementLetter = endorsementLetter;
		document.EndorserRemarks = endorserRemark

		if (decision === 'true') {
			document.documentStatus = 'Endorsed'
			console.log("documentStatus: " + document.documentStatus)
		} else if (decision === 'false') {
			document.documentStatus = 'Rejected'
			console.log("documentStatus: " + document.documentStatus)
		}

		console.log(document);

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
		const { deanName, deanRemark, decision, deanDesignation, deanSignature } = req.body

		const document = await Document.findById(id)

		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		document.deanApproverName = deanName;
		document.dateDeanApproved = Date.now();
		document.deanRemarks = deanRemark;
		document.deanDecision = decision;
		document.deanApproverSignature = deanSignature;
		document.deanApproverDesignation = deanDesignation;
		console.log(decision)

		if (decision === 'true') {
			document.documentStatus = 'DeanApproved';
			console.log("documentStatus: " + document.documentStatus)
		} else if (decision === 'false') {
			document.documentStatus = 'Rejected';
			console.log("documentStatus: " + document.documentStatus)
		}

		await document.save();

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export const approveDocument = async (req, res) => {
	try {
		const { id } = req.params
		const { ApproverName, ApproverDesignation, Remark, signature, decision } = req.body

		const document = await Document.findById(id)
		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		document.opApproverName = ApproverName;
		document.opApproverDesignation = ApproverDesignation;
		document.opApprovalDate = Date.now();
		document.Remark = Remark;
		document.opSignature = signature;
		document.documentStatus = decision == true ? 'OP Approved' : 'Rejected | OP'

		console.log(document.documentStatus)

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
		const { controlNumber, collegeName, documentType, header, subject, content, uploaderDesignation, uploaderName, uploaderSignature } = req.body



		const document = await Document.create({
			controlNumber,
			collegeName,
			documentType,
			header,
			subject,
			content,
			uploaderDesignation,
			uploaderName,
			uploaderSignature
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
