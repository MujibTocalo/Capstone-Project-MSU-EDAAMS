import React, { useEffect, useState } from 'react';
import { Button, Alert, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
import documentsStore from '../config/documentsStore';
import DocumentDetail from './DocumentDetail';
import DocumentCompleteDetail from './DocumentCompleteDetail';
import { ArrowLongRightIcon, ArrowUpRightIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';

const ApproveDocument = () => {
	const store = documentsStore();

	const [deanName, setDeanName] = useState('');
	const [deanRemark, setDeanRemark] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [alertType, setAlertType] = useState('');
	const [open, setOpen] = React.useState(false);
	const [selectedDocument, setSelectedDocument] = useState(null);

	const handleApproverName = (userDetail) => {
		const approverFirstName = userDetail.firstName;
		const approverLastName = userDetail.lastName;

		setDeanName(approverFirstName + ' ' + approverLastName);
	};

	const hideAlertAfterDelay = () => {
		setTimeout(() => {
			setAlertMessage('');
			setAlertType('');
		}, 5000);
	};

	const [currentPage, setCurrentPage] = useState(1);
	const documentsPerPage = 8;

	const handleOpen = (document) => {
		setSelectedDocument(document);
		setOpen(true);
	};

	useEffect(() => {
		store.fetchDocuments();
		const userDetail = JSON.parse(localStorage.getItem('userDetails'));
		handleApproverName(userDetail);
	}, [store]);

	if (!store.documents) {
		// Return null or a loading state while waiting for data to fetch
		return null;
	}

	const indexOfLastDocument = currentPage * documentsPerPage;
	const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
	const currentDocuments = store.documents.slice(indexOfFirstDocument, indexOfLastDocument);
	const numRows = Math.ceil(currentDocuments.length / 4);

	const nextPage = () => {
		if (currentPage < Math.ceil(store.documents.length / documentsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleApproveDocument = async (e, documentId) => {
		e.preventDefault();

		try {
			const data = {
				deanName,
				deanRemark,
				decision: 'true',
			};

			const res = await fetch(`http://localhost:7000/document/deanApproval/${documentId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (res.ok) {
				setAlertMessage('Document Approved.');
				setAlertType('success');
				hideAlertAfterDelay();
			} else {
				setAlertMessage('Document Approval Failed.');
				setAlertType('error');
				hideAlertAfterDelay();
			}
		} catch (error) {
			console.log(error);
			setAlertMessage('Approval Error.');
			setAlertType('error');
			hideAlertAfterDelay();
		}
	};

	const handleRejectDocument = async (e, documentId) => {
		e.preventDefault();

		try {
			const data = {
				deanName,
				deanRemark,
				decision: 'false',
			};

			const res = await fetch(`http://localhost:7000/document/deanApproval/${documentId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (res.ok) {
				setAlertMessage('Document Rejected.');
				setAlertType('error');
				hideAlertAfterDelay();
			}
		} catch (error) {
			console.log(error);
			setAlertMessage('Document Rejection Error.');
			setAlertType('error');
			hideAlertAfterDelay();
		}
	};

	return (
		<div className='flex flex-col mx-auto'>
			{alertMessage && (
				<Alert className='flex mx-auto justify-center ' color={alertType === 'success' ? 'green' : 'red'}
					variant='outlined'
					size='sm'>
					<span>{alertMessage}</span>
				</Alert>
			)}
			<Typography className='flex mx-auto font-bold text-2xl p-2 '>APPROVAL PAGE</Typography>
			<div className='grid grid-cols-4'>
				{Array.from({ length: numRows }, (_, rowIndex) => (
					<div key={rowIndex} className='grid grid-cols-4 col-span-full '>
						{currentDocuments.slice(rowIndex * 4, (rowIndex + 1) * 4).map((document) => (
							<div key={document._id} className='flex flex-col p-4 m-2 rounded-lg border border-gray-100 shadow-lg'>
								<DocumentDetail document={document} />
								<Dialog
									className='bg-white rounded-xl'
									size='lg'
									open={open && selectedDocument && selectedDocument._id === document._id}
									handler={() => setOpen(false)}
									animate={{
										mount: { scale: 1, y: 0 },
										unmount: { scale: 0.9, y: -100 },
									}}
								>
									<DialogHeader className='bg-cyan-800 text-white rounded-t-xl'>{document.documentType}</DialogHeader>
									<DialogBody divider>
										<DocumentCompleteDetail document={document} />
									</DialogBody>
									<DialogFooter>
										<div className='flex gap-1.5'>
											<Button variant='outlined' color='green' onClick={(e) => handleApproveDocument(e, document._id)}>
												Approve Document
											</Button>
											<Button variant='outlined' color='red' onClick={(e) => handleRejectDocument(e, document._id)}>
												Reject Document
											</Button>
											<Button variant='text' color='cyan' onClick={() => setOpen(false)} className='mr-1'>
												<span>Return</span>
											</Button>
										</div>
									</DialogFooter>
								</Dialog>
								<div className='flex'>
									<Button className='flex flex-row items-center m-2' size='sm' variant='text' color='cyan'
										onClick={() => handleOpen(document)}>
										Read More{" "}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="h-5 w-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
											/>
										</svg>
									</Button>

								</div>
							</div>
						))}
					</div>
				))}
			</div>

			<div className='flex flex-row place-content-center mx-auto p-4 gap-1.5 '>
				<Button variant='text' color='cyan' onClick={prevPage} disabled={currentPage === 1}>
					Prev
				</Button>
				<Button
					color='cyan'
					variant='text'
					onClick={nextPage}
					disabled={currentPage === Math.ceil(store.documents.length / documentsPerPage)}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default ApproveDocument;
