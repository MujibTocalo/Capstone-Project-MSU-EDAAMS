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
		const { name, header, subject, content, remarks, rejected, designation, signature } = req.body;

		const document = await Document.findById(id);

		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}


		if (rejected === false) {
			document.deanName = name;
			document.deanEndorsementHeader = header;
			document.deanEndorsementSubject = subject;
			document.deanEndorsementContent = content;
			document.deanDesignation = designation;
			document.deanSignature = signature;
			document.deanEndorsementDate = Date.now();
			document.documentStatus = 'Dean Endorsed'

		} else if (rejected === true) {
			document.rejectedName = name;
			document.rejectedDesignation = designation;
			document.rejectedRemarks = remarks;
			document.deanDecision = false;
			document.rejectedDate = Date.now();
			document.documentStatus = 'Rejected'
			document.rejectedPoint = 'Rejected By College Dean'
		}




		console.log("documentStatus: " + document.documentStatus);

		await document.save();

		io.emit("deanEndorsedDocument", {
			senderName: name,
			receiverType: 'Endorser - OVCAA',
		});

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
		const { name, header, subject, content, remarks, rejected, designation, signature } = req.body;

		const document = await Document.findById(id);

		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		if (rejected === false) {
			document.endorserName = name;
			document.endorsementHeader = header;
			document.endorsementSubject = subject;
			document.endorsementContent = content;
			document.endorserDesignation = designation;
			document.endorserSignature = signature;
			document.endorsementDate = Date.now();
			document.documentStatus = 'OVCAA Endorsed';

		} else if (rejected === true) {
			document.rejectedName = name;
			document.rejectedDesignation = designation;
			document.rejectedRemarks = remarks;
			document.deanDecision = false;
			document.rejectedDate = Date.now();
			document.documentStatus = 'Rejected'
			document.rejectedPoint = 'Rejected By Office of Vice Chancellor for Academic Affairs'
		}

		await document.save();

		io.emit("ovcaaEndorsement", {
			senderName: name,
			designation: designation,
			receiverType: 'Approver - OP',
		});

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
		const { name, header, subject, content, designation, remarks, signature, rejected } = req.body

		const document = await Document.findById(id)
		if (!document) {
			return res.status(404).json({ error: 'Document not found' });
		}

		if (rejected === false) {
			document.approverName = name;
			document.approverDesignation = designation;
			document.approvalDate = Date.now();
			document.approverHeader = header;
			document.approverSubject = subject;
			document.approverContent = content;
			document.approverRemarks = remarks;
			document.approverSignature = signature;
			document.documentStatus = 'OP Approved';

		} else if (rejected === true) {
			document.rejectedName = name;
			document.rejectedDesignation = designation;
			document.rejectedRemarks = remarks;
			document.deanDecision = false;
			document.rejectedDate = Date.now();
			document.documentStatus = 'Rejected'
			document.rejectedPoint = 'Rejected By The Office of the President'
		}

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
		io.emit("newDocument", {
			senderName: uploaderName,
			designation: uploaderDesignation,
			receiverType: 'Approver - Dean',
		});

		res.status(201).json({ document });
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
