import React, { useEffect } from "react";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { LuAlertCircle } from "react-icons/lu";
import documentsStore from "../config/documentsStore";
import { useToast } from "../components/ToastService";

const DocumentList = ({ document }) => {

	const store = documentsStore();
	const toast = useToast();

	useEffect(() => {
		const userDetail = JSON.parse(localStorage.getItem('userDetails'));
		// handleApproverName(userDetail);
	}, [store])


	const handleOpenDocument = async (e, documentId) => {
		e.preventDefault();

		const res = await fetch(`http://localhost:7000/document/${documentId}`)
		const documentDetail = await response.json();
	}

	const handleDeleteDocument = async (e, documentId) => {
		e.preventDefault();

		try {
			const response = await store.deleteDocument(documentId);

			if (response.ok) {
				toast.open(
					<div className='flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg'>
						<LuAlertCircle size={40} />
						<div>
							<Typography variant='h4'>Success!</Typography>
							<Typography variant='paragraph'>Deletion Success</Typography>
						</div>

					</div>
				)

				store.fetchDocuments();
			} else {
				toast.open(
					<div className='flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg'>
						<LuAlertCircle size={40} />
						<div>
							<Typography variant='h4'>Failed!</Typography>
							<Typography variant='paragraph'>Deletion Failed</Typography>
						</div>

					</div>
				)
			}
		} catch (error) {
			toast.open(
				<div className='flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg'>
					<LuAlertCircle size={40} />
					<div>
						<Typography variant='h4'>Error!</Typography>
						<Typography variant='paragraph'>Deletion Error</Typography>
					</div>

				</div>
			)
			console.error("Error deleting document:", error);
		}
	}



	return (
		<div key={document._id} className="flex flex-col border">
			<div className="flex border p-1">{document.documentType}</div>
			<div className="flex border p-1">{document.collegeName}</div>
			<div className="flex border p-1">{document.header}</div>
			<div className="flex border p-1">{document.subject}</div>
			<div className="flex flex-col p-2 whitespace-pre gap-1.5">
				<Button
					size="sm"
					className="openDocumentButton"
					onClick={(e) => handleOpenDocument(e, document._id)}
				>
					Open Document
				</Button>
				<Button
					size="sm"
					color="red"
					className="flex flex-row items-center"
					onClick={(e) => handleDeleteDocument(e, document._id)}
				>
					Delete
				</Button>
			</div>
		</div>
	)
};

export default DocumentList;
