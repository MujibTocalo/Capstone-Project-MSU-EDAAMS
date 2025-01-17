import React, { useEffect, useRef, useState } from 'react'
import documentsStore from '../../config/documentsStore'
import { useToast } from '../../components/ToastService'

import ReactQuill from 'react-quill'
import EditorToolbar, { modules, formats } from '../../components/EditorToolbar'
import "react-quill/dist/quill.snow.css";
import '../../components/TextEditor.css';
import { LuAlertCircle } from "react-icons/lu";


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
import DocumentOPDetail from './DocumentOPDetail'
import { io } from "socket.io-client";

const OpApprovalPage = () => {

	const userDetail = JSON.parse(localStorage.getItem('userDetails'))
	const store = documentsStore()
	const toast = useToast()
	const quillRef = useRef(null);
	const [endorse, setEndorse] = useState(false)
	const [endorseSelectedDocument, setEndorseSelectedDocument] = useState(null);

	const [reject, setReject] = useState(false);
	const [rejectSelected, setRejectSelected] = useState(null);

	const [selectedDocument, setSelectedDocument] = useState(null);
	const [open, setOpen] = useState(false);

	const [documents, setDocuments] = useState([]);

	const [confirmEndorseDialog, setConfirmEndorseDialog] = useState(false);
	const [previewDocument, setPreviewDocument] = useState(null);

	const handleOpenConfirmEndorseDialog = () => {
		setConfirmEndorseDialog(true);
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

	const approveDocument = async (e, documentId) => {
		e.preventDefault()
		try {
			axios.put(`http://localhost:7000/document/approveDocument/${documentId}`, {
				name: userDetail.firstName + ' ' + userDetail.lastName,
				header: documentDetail.header,
				subject: documentDetail.subject,
				content: documentDetail.content,
				designation: documentDetail.designation,
				signature: documentDetail.signature,
				remarks: documentDetail.remarks,
				rejected: false
			})
				.then(res => {
					setEndorse(false)
					setOpen(false)
					console.log(res)
					if (res.status === 200) {

						toast.open(
							<div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
								<LuAlertCircle size={40} />
								<div>
									<Typography variant="h5">Success!</Typography>
									<Typography variant="paragraph">
										Document Approval Successful
									</Typography>
								</div>
							</div>
						);
					} else {
						setEndorse(false)
						setOpen(false)
						store.fetchDocuments()
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
			axios.put(`http://localhost:7000/document/approveDocument/${documentId}`, {
				name: userDetail.firstName + ' ' + userDetail.lastName,
				designation: documentDetail.designation,
				signature: null,
				remarks: documentDetail.remarks,
				rejected: true
			})
				.then(res => {
					console.log(res)
					if (res.status === 200) {
						setReject(false)
						setOpen(false)
						store.fetchDocuments()
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
						setReject(false)
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
			setReject(false)
			setOpen(false)
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

	const onContent = (e) => {
		setDocumentDetail({
			...documentDetail,
			content: e.target.value
		})
	}

	const onRemarks = (e) => {
		setDocumentDetail({
			...documentDetail,
			remarks: e.target.value
		})
	}

	useEffect(() => {

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
	}, [store]);

	const endorsedDocuments = documents
		? documents
			.filter((document) => document.documentStatus === 'OVCAA Endorsed')
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		: [];

	return (
		<div className="flex flex-col px-14">
			{/* <h3 className='flex bg-[#182440] text-xl shadow-lg p-3 mx-4 text-white font-bold rounded-xl justify-center'>OP Approval & Endorsement Page</h3> */}
			<div className="flex flex-col p-3">
				<Typography className="text-2xl font-semibold">OP Approval & Endorsement</Typography>
				<Typography className='text-gray-700'>See all Document Pending for Approval and Endorsement</Typography>
			</div>
			<div className='grid grid-cols-4 p-2 max-w-screen'>
				{endorsedDocuments.map((document) => (
					<div key={document._id} className='flex flex-col bg-gray-300/80 m-4 p-3 rounded-xl shadow-lg hover:scale-105'>
						<DocumentOPDetail document={document} />

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
										Make Approved Document
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
												> Final Document
												</Typography>
											</DialogHeader>
										</div>
										<DialogBody className='overflow-y-scroll'>
											<div className="flex flex-col gap-1.5 h-[70vh]">
												<div className="flex flex-col gap-2" style={{ lineHeight: 2 }}>
													<Textarea
														color='cyan'

														label="Header"
														value={documentDetail.header}
														onChange={onHeader}
													/>
													<Textarea
														color='cyan'

														label="Subject"
														value={documentDetail.subject}
														onChange={onSubject}
													/>
													{/* <EditorToolbar toolbarId={"t1"} /> */}
													{/* <ReactQuill
													ref={quillRef}
													theme="snow"
													value={documentDetail.content}
													onChange={onContent}
													placeholder={"Write the Document Content Here..."}
													modules={modules("t1")}
													formats={formats}
												/> */}
													<Textarea
														color='cyan'

														label="Content"
														value={documentDetail.content}
														onChange={onContent}
														className="flex h-screen"
													/>
													{/* <textarea
														placeholder='Content'
														className='border font-medium text-sm border-gray-400 rounded-md h-[40vh] p-2 w-[146.5vh]' /> */}
												</div>

											</div>
										</DialogBody>
										<DialogFooter className="space-x-2">
											<Button
												variant="standard"
												color="green"
												onClick={() => {
													setPreviewDocument({
														header: documentDetail.header,
														subject: documentDetail.subject,
														content: documentDetail.content,
													});
													handleOpenConfirmEndorseDialog();
												}}
											>
												Endorse Document To OP
											</Button>

											<Dialog
												className="h-screen overflow-y-scroll"
												open={confirmEndorseDialog}
												size="lg"
												handler={() => setConfirmEndorseDialog(false)}
											>
												<DialogHeader>Make sure all the details entered are correct.</DialogHeader>
												<DialogBody>
													{previewDocument && (
														<div>
															<Typography className='mb-2 border border-gray-500 p-2' variant="h6">{previewDocument.header}</Typography>
															<Typography className='mb-2 border border-gray-500 p-2'>{previewDocument.subject}</Typography>

															{/* <Typography className='mb-2 border border-gray-500 p-2'>{previewDocument.content}</Typography> */}

															{previewDocument.content && (
																<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
																	{previewDocument.content.split('\n').map((paragraph, index) => (
																		<Typography
																			key={index}
																			variant='paragraph'
																			className='font-medium text-justify whitespace-break-spaces'
																			style={{ textIndent: '3em', lineHeight: 2 }}
																		>
																			{paragraph}
																		</Typography>
																	))}
																</div>
															)}


															{/* <div className='mb-2 border border-gray-500 p-2' dangerouslySetInnerHTML={{ __html: previewDocument.content }} /> */}
														</div>
													)}
												</DialogBody>
												<DialogFooter className="space-x-2 mb-4">
													<Button
														variant="standard"
														color="green"
														onClick={(e) => {
															approveDocument(e, document._id);
															setEndorse(false);
															setOpen(false);
															setConfirmEndorseDialog(false);
														}}
													>
														Yes, Endorse
													</Button>
													<Button
														variant="outlined"
														color="red"
														onClick={() => setConfirmEndorseDialog(false)}
													>
														No, Cancel
													</Button>
												</DialogFooter>
											</Dialog>
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


						<div className='flex items-center justify-center whitespace-pre '>
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
			</div>
		</div>
	)
}

export default OpApprovalPage