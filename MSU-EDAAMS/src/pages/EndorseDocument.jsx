import React, { useEffect, useState } from 'react'
import documentsStore from '../config/documentsStore'
import DocumentForEndorsement from './DocumentForEndorsement'
import DocumentCompleteDetail from './DocumentCompleteDetail';

import { Button, Alert, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Input, Textarea } from '@material-tailwind/react';

import { useToast } from '../components/ToastService';
import { LuAlertCircle } from 'react-icons/lu';
import DocumentEndorsementDetail from './DocumentEndorsementDetail';

const EndorseDocument = () => {

	const store = documentsStore()
	const toast = useToast()

	const [endorsementLetter, setEndorsementLetter] = useState()

	const [endorserName, setEndorserName] = useState()
	const [endorserDesignation, setEndorserDesignation] = useState()

	const [endorserSignature, setEndorserSignature] = useState()
	const [endorserRemark, setEndorserRemark] = useState()

	const [endorse, setEndorse] = useState(false)
	const [endorseSelectedDocument, setEndorseSelectedDocument] = useState(null);

	const [reject, setReject] = useState(false);
	const [rejectSelected, setRejectSelected] = useState(null);

	const [selectedDocument, setSelectedDocument] = useState(null);
	const [open, setOpen] = useState(false);


	const handleEndorserName = (userDetail) => {
		const EndorserFirstName = userDetail.firstName;
		const EndorserLastName = userDetail.lastName;

		setEndorserName(EndorserFirstName + ' ' + EndorserLastName)
		setEndorserDesignation(userDetail.designation)
		setEndorserSignature(userDetail.signature)
	};

	const handleEndorsementLetter = (e) => {
		setEndorsementLetter(e.target.value);
	}
	const handleEndorserRemark = (e) => {
		setEndorserRemark(e.target.value)
	}

	const hideAlertAfterDelay = () => {
		setTimeout(() => {
			setAlertMessage('');
			setAlertType('');
		}, 5000);
	};


	const handleOpenEndorsement = (document) => {
		setEndorseSelectedDocument(document)
		setEndorse(true)
	}


	const handleRejectOpen = (document) => {
		setRejectSelected(document)
		setReject(true)
	}


	const handleOpen = (document) => {
		setSelectedDocument(document);
		setOpen(true);
	};

	useEffect(() => {
		store.fetchDocuments()
		const userDetail = JSON.parse(localStorage.getItem('userDetails'));
		handleEndorserName(userDetail)
	}, [store])


	if (!store.documents) {
		return null
	}

	const endorseDocument = store.documents
		.filter((document) => document.documentStatus === 'DeanApproved' || document.documentStatus === 'Dean Approved')
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))


	const handleEndorseDocument = async (e, documentId) => {
		e.preventDefault();

		try {
			const data = {
				endorserName,
				endorserDesignation,
				endorserRemark,
				endorsementLetter,
				endorserSignature,
				decision: 'true',
			};

			const res = await fetch(`http://localhost:7000/document/endorseDocument/${documentId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (res.ok) {
				toast.open(
					<div className='flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg'>
						<LuAlertCircle size={40} />
						<div>
							<Typography variant='h4'>Success!</Typography>
							<Typography variant='paragraph'>Document Endorsed</Typography>
						</div>
					</div>
				)
			} else {
				toast.open(
					<div className='flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg'>
						<LuAlertCircle size={40} />
						<div>
							<Typography variant='h4'>Success!</Typography>
							<Typography variant='paragraph'>Document Rejected</Typography>
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
						<Typography variant='paragraph'>Document Error</Typography>
					</div>
				</div>
			)
			console.log(error);
		}
	};

	const handleRejectDocument = async (e, documentId) => {
		e.preventDefault();

		try {
			const data = {
				endorserName,
				endorserDesignation,
				endorserRemark,
				endorsementLetter,
				endorserSignature: null,
				decision: 'false',
			};

			const res = await fetch(`http://localhost:7000/document/endorseDocument/${documentId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (res.ok) {
				console.log(res)
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex flex-col mx-auto'>
			<div className='grid grid-cols-4'>
				{endorseDocument.map((document) => (
					<div key={document._id} className='flex flex-col bg-gray-200 p-2 m-2 rounded-lg shadow-md hover:shadow-xl'>
						<DocumentEndorsementDetail document={document} /><Dialog
							className='flex flex-col overflow-scroll bg-white rounded-t-xl h-screen'
							size='lg'
							open={open && selectedDocument && selectedDocument._id === document._id}
							handler={() => setOpen(false)}
							animate={{
								mount: { scale: 1, y: 0 },
								unmount: { scale: 0.9, y: -100 },
							}}
						>
							<DialogHeader>{document.documentType}</DialogHeader>
							<DialogBody divider>
								<DocumentCompleteDetail document={document} />
							</DialogBody>
							<DialogFooter>
								<div className='flex gap-4'>
									<Button variant='standard' color='green' onClick={() => handleOpenEndorsement(document)}>
										EndorseDocument
									</Button>

									<Dialog
										open={endorse && endorseSelectedDocument && endorseSelectedDocument._id === document._id}
										handler={() => setEndorse(false)}>
										<div className="flex items-center justify-between"
										>
											<DialogHeader>Endorsement</DialogHeader>
										</div>
										<DialogBody divider>
											<div className="flex h-72">
												<Textarea
													label="Endorsement Content"
													onChange={handleEndorsementLetter} />
											</div>
										</DialogBody>
										<DialogFooter className="space-x-2">
											<Button variant="standard" color="green" onClick={(e) => handleEndorseDocument(e, document._id) && setEndorse(false) && setOpen(false)}>
												Endorse Document
											</Button>
											<Button variant="outlined" color="red" onClick={() => setReject(false)}>
												close
											</Button>
										</DialogFooter>
									</Dialog>


									<Button size='sm' variant='standard' color='red' onClick={() => handleRejectOpen(document)}>
										Reject Document
									</Button>

									<Dialog
										open={reject && rejectSelected && rejectSelected._id === document._id}
										handler={() => setReject(false)}>
										<div className="flex items-center justify-between"
										>
											<DialogHeader>Cause of Rejection</DialogHeader>
										</div>
										<DialogBody divider>
											<div className="flex h-72">
												<Textarea
													label="Message"
													onChange={handleEndorserRemark} />
											</div>
										</DialogBody>
										<DialogFooter className="space-x-2">
											<Button variant="gradient" color="red" onClick={(e) => handleRejectDocument(e, document._id) && setReject(false) && setOpen(false)}>
												Reject Document
											</Button>
											<Button variant="outlined" color="red" onClick={() => setReject(false)}>
												close
											</Button>
										</DialogFooter>
									</Dialog>

									<Button size='sm' variant='text' onClick={() => setOpen(false)}>
										<span>Close</span>
									</Button>
								</div>
							</DialogFooter>
						</Dialog>
						<div className='flex content-start whitespace-pre '>
							<Button className='flex flex-row text-black font-medium items-center m-2 hover:font-semibold' size='sm' color='white' variant='text'
								onClick={() => handleOpen(document)}>
								Read More{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
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
		</div>
	);
};

export default EndorseDocument