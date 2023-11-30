import Document from '../models/document.js'
import { io } from '../index.js'


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
		console.log("Deleting document with ID:", id);

		const result = await Document.findOneAndDelete({ _id: id });

		if (result) {
			console.log("Document deleted:", result);
			res.json({ success: "Document Deleted" });
		} else {
			console.log("Document not found");
			res.status(404).json({ error: "Document not found" });
		}
	} catch (error) {
		console.error("Error deleting document:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};



export const deanEndorsement = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, header, subject, content, remarks, decision, designation, signature } = req.body;

		const document = await Document.findById(id);

		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		document.deanName = name;
		document.deanEndorsementHeader = header;
		document.deanEndorsementSubject = subject;
		document.deanEndorsementContent = content;
		document.deanDesignation = designation;
		document.deanSignature = signature;
		document.deanEndorsementDate = Date.now();
		document.deanRemarks = remarks;
		decision === 'true' ? document.documentStatus = 'Dean Endorsed' : document.documentStatus = 'Rejected | Dean';
		console.log("documentStatus: " + document.documentStatus);

		await document.save();

		// Emit a socket event for Dean Endorsement
		io.emit("deanEndorsedDocument", document);

		res.json({
			message: 'Success'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
};


export const ovcaaEndorsement = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, header, subject, content, remark, decision, designation, signature } = req.body;

		const document = await Document.findById(id);

		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		document.endorserName = name;
		document.endorsementHeader = header;
		document.endorsementSubject = subject;
		document.endorsementContent = content;
		document.endorserDesignation = designation;
		document.endorserSignature = signature;
		document.endorsementDate = Date.now();
		document.endorserRemarks = remark;

		if (decision === 'true') {
			document.documentStatus = 'OVCAA Endorsed';
			console.log("documentStatus: " + document.documentStatus);
		} else if (decision === 'false') {
			document.documentStatus = 'Rejected | OVCAA';
			console.log("documentStatus: " + document.documentStatus);
		}

		await document.save();

		// Emit a socket event for Endorsement
		io.emit("endorsementDocument", document);

		res.json({
			message: 'Success'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export const approveDocument = async (req, res) => {
	try {
		const { id } = req.params
		const { name, header, subject, content, designation, remarks, signature, decision } = req.body

		const document = await Document.findById(id)
		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}
		document.approverName = name;
		document.approverDesignation = designation;
		document.approvalDate = Date.now();
		document.approverHeader = header;
		document.approverSubject = subject;
		document.approverContent = content;
		document.approverRemarks = remarks;
		document.approverSignature = signature;
		document.documentStatus = decision === 'true' ? 'OP Approved' : 'Rejected | OP'

		await document.save();

		res.json({
			message: 'Success'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export const releaseDocument = async (req, res) => {

	try {
		const { id } = req.params
		const { ReleaserName, decision } = req.body

		const document = await Document.findById(id)
		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}


		document.releaserName = ReleaserName;
		document.releaseDate = Date.now();
		document.documentStatus = decision == true ? 'Released' : 'OP Approved'

		await document.save()
		res.json({ message: 'Document Released on ' });
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
		const {
			controlNumber,
			collegeName,
			documentType,
			header,
			subject,
			content,
			uploaderDesignation,
			uploaderName,
			uploaderSignature,
		} = req.body;

		if (
			!controlNumber ||
			!collegeName ||
			!documentType ||
			!header ||
			!subject ||
			!content ||
			!uploaderDesignation ||
			!uploaderName ||
			!uploaderSignature
		) {
			return res.status(400).json({ error: "Missing required parameters" });
		}

		const document = await Document.create({
			controlNumber,
			collegeName,
			documentType,
			header,
			subject,
			content,
			uploaderDesignation,
			uploaderName,
			uploaderSignature,
		});

		// Emit a Socket.io event when a new document is created
		io.emit("newDocument", document);

		res.status(201).json({ document });
		console.log(document);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};



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
