import React, { useEffect, useState } from 'react'
import documentsStore from '../../config/documentsStore'
import { useToast } from '../../components/ToastService'
import DocumentApproverDetail from './DocumentApproverDetail'

import ReactQuill from 'react-quill'
import EditorToolbar, { modules, formats } from '../../components/EditorToolbar'
import "react-quill/dist/quill.snow.css";
import '../../components/TextEditor.css';
import { LuAlertCircle } from "react-icons/lu";

import { io } from "socket.io-client";

import {
	Button,
	Alert,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Input,
	Textarea
} from "@material-tailwind/react";
import axios from 'axios'
import DocumentCompleteDetail from '../DocumentCompleteDetail'

const DeanEndorsementPage = () => {

	const userDetail = JSON.parse(localStorage.getItem('userDetails'))
	const store = documentsStore()
	const toast = useToast()
	const [documents, setDocuments] = useState([]);

	const [endorse, setEndorse] = useState(false)
	const [endorseSelectedDocument, setEndorseSelectedDocument] = useState(null);

	const [open, setOpen] = useState(false);
	const [reject, setReject] = useState(false);
	const [rejectSelected, setRejectSelected] = useState(null);
	const [selectedDocument, setSelectedDocument] = useState(null);



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


	const [documentDetail, setDocumentDetail] = useState({
		name: userDetail.firstName + ' ' + userDetail.lastName,
		header: '',
		subject: '',
		content: '',
		designation: userDetail.designation,
		signature: userDetail.signature,
		remarks: '',
		decision: 'true'
	})

	useEffect(() => {
		const socket = io('http://localhost:7000');

		socket.on('deanEndorsedDocument', (deanEndorsedDocument) => {
			// Update documents state when a document is endorsed
			setDocuments((prevDocuments) => [deanEndorsedDocument, ...prevDocuments]);
		});

		// Fetch initial documents
		const fetchDocuments = async () => {
			try {
				await store.fetchDocuments();
				setDocuments(store.documents);
			} catch (error) {
				console.error('Error fetching documents:', error);
			}
		};
		fetchDocuments();
		// Clean up the Socket.io connection when the component unmounts
		return () => {
			socket.disconnect();
		};
	}, [store]);



	const pendingDocuments = documents
		? documents
			.filter((document) => document.documentStatus === 'Pending')
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		: [];

	const EndorseDocument = async (e, documentId) => {
		e.preventDefault()
		try {
			axios.put(`http://localhost:7000/document/deanEndorsement/${documentId}`, {
				name: userDetail.firstName + ' ' + userDetail.lastName,
				header: documentDetail.header,
				subject: documentDetail.subject,
				content: documentDetail.content,
				designation: documentDetail.designation,
				signature: documentDetail.signature,
				remarks: documentDetail.remarks,
				decision: 'true'
			})
				.then(res => {
					console.log(res)
					setEndorse(false)
					setOpen(false)
					if (res.status === 200) {
						store.fetchDocuments()
						toast.open(
							<div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
								<LuAlertCircle size={40} />
								<div>
									<Typography variant="h5">Success!</Typography>
									<Typography variant="paragraph">
										Document Endorsement Successful
									</Typography>
								</div>
							</div>
						);
					} else {
						setEndorse(false)
						setOpen(false)
						toast.open(
							<div className='flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg'>
								<LuAlertCircle size={40} />
								<div>
									<Typography variant='h5'>Failed!</Typography>
									<Typography variant='paragraph'>Document Rejection Failed</Typography>
								</div>

							</div>
						)
					}
				})
		} catch (error) {
			setEndorse(false)
			setOpen(false)
			toast.open(
				<div className='flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg'>
					<LuAlertCircle size={40} />
					<div>
						<Typography variant='h5'>Error!</Typography>
						<Typography variant='paragraph'>Document Submittion Error</Typography>
					</div>

				</div>
			)
			throw error;
		}
	}

	const RejectDocument = async (e, documentId) => {
		e.preventDefault()
		try {
			axios.put(`http://localhost:7000/document/deanEndorsement/${documentId}`, {
				name: userDetail.firstName + ' ' + userDetail.lastName,
				designation: documentDetail.designation,
				signature: null,
				remarks: documentDetail.remarks,
				decision: 'false'
			})
				.then(res => {
					console.log(res)
					setReject(false)
					setOpen(false)
					if (res.status === 200) {
						toast.open(
							<div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
								<LuAlertCircle size={40} />
								<div>
									<Typography variant="h5">Success!</Typography>
									<Typography variant="paragraph">
										Document Rejection Successful
									</Typography>
								</div>
							</div>
						);
					} else {
						setOpen(false)
						setReject(false)
						toast.open(
							<div className='flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg'>
								<LuAlertCircle size={40} />
								<div>
									<Typography variant='h5'>Failed!</Typography>
									<Typography variant='paragraph'>Document Rejection Failed</Typography>
								</div>

							</div>
						)
					}
				})
		} catch (error) {
			setOpen(false)
			setReject(false)
			toast.open(
				<div className='flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg'>
					<LuAlertCircle size={40} />
					<div>
						<Typography variant='h5'>Error!</Typography>
						<Typography variant='paragraph'>Document Rejection Error</Typography>
					</div>

				</div>
			)
			throw error;
		}
	}


	const onHeader = (e) => {
		setDocumentDetail({
			...documentDetail,
			header: e.target.value
		})
	}

	const onSubject = (e) => {
		setDocumentDetail({
			...documentDetail,
			subject: e.target.value
		})
	}

	const onContent = (value) => {
		setDocumentDetail({
			...documentDetail,
			content: value
		})
	}

	const onRemarks = (value) => {
		setDocumentDetail({
			...documentDetail,
			content: value
		})
	}



	return (
		<div className='grid grid-cols-4 p-2 overflow-y-scroll'>
			{pendingDocuments.map((document) => (
				<div key={document._id} className='flex flex-col bg-indigo-50/50 p-1.5 m-2 rounded-lg shadow-md hover:scale-105'>
					<DocumentApproverDetail document={document} />

					<Dialog
						className='flex flex-col overflow-y-scroll bg-white rounded-t-xl max-h-[100vh]'
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
									Make Endorsement
								</Button>

								<Dialog
									size='xl'
									open={endorse && endorseSelectedDocument && endorseSelectedDocument._id === document._id}
									handler={() => setEndorse(false)}>
									<div className="flex items-center justify-between"
									>
										<DialogHeader className='flex w-[100%] bg-indigo-900 '>
											<Typography
												className='flex mx-auto font-semibold text-2xl text-white'
											> Dean Endorsement
											</Typography>
										</DialogHeader>
									</div>
									<DialogBody className='overflow-y-scroll'>
										<div className="flex flex-col gap-1.5 h-[70vh]">
											<div className="flex flex-col gap-2 ">
												<Textarea
													color='cyan'
													variant="standard"
													label="Header"
													value={documentDetail.header}
													onChange={onHeader}
												/>
												<Textarea
													color='cyan'
													variant="standard"
													label="Subject"
													value={documentDetail.subject}
													onChange={onSubject}
												/>
											</div>
											<EditorToolbar toolbarId={'t1'} />
											<ReactQuill
												theme="snow"
												value={documentDetail.content}
												onChange={onContent}
												placeholder={"Write the Document Content Here..."}
												modules={modules('t1')}
												formats={formats}

											/>
										</div>
									</DialogBody>
									<DialogFooter className="space-x-2">
										<Button variant="standard" color="green" onClick={(e) => EndorseDocument(e, document._id) && setEndorse(false) && setOpen(false)}>
											Endorse Document To OVCAA
										</Button>
										<Button variant="outlined" color="red" onClick={() => setEndorse(false) && setOpen(false)}>
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
										<DialogHeader>Remarks</DialogHeader>
									</div>
									<DialogBody divider>
										<div className="flex h-72">
											<Textarea
												label="Message"
												onChange={onRemarks} />
										</div>
									</DialogBody>
									<DialogFooter className="space-x-2">
										<Button variant="gradient" color="red" onClick={(e) => RejectDocument(e, document._id) && setReject(false) && setOpen(false)}>
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
						<Button className='flex flex-row text-black font-medium items-center m-2 hover:font-semibold hover:scale-105' size='sm' color='white' variant='text'
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
		</div >
	);
};


export default DeanEndorsementPage