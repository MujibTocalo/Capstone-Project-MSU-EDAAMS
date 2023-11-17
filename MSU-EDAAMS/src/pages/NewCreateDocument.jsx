import React, { useState } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import EditorToolbar, { modules, formats } from '../components/EditorToolbar'
import "react-quill/dist/quill.snow.css";
import '../components/TextEditor.css';
import { LuAlertCircle } from "react-icons/lu";

import {
	Alert,
	Select,
	Option,
	Input,
	Textarea,
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
} from "@material-tailwind/react";
import { useToast } from '../components/ToastService';

const NewCreateDocument = () => {
	const uploaderDetail = JSON.parse(localStorage.getItem('userDetails'))

	const [confirmationOpen, setConfirmationOpen] = React.useState(false);

	const handleConfirmationOpen = () => setConfirmationOpen(true);
	const handleConfirmationClose = () => setConfirmationOpen(false);

	const confirmSubmission = () => {
		addDocument();
		handleConfirmationClose();
	};

	const [documentDetail, setDocumentDetail] = useState({
		controlNumber: '',
		collegeName: '',
		documentType: '',
		header: '',
		subject: '',
		content: '',
		uploaderName: uploaderDetail.firstName + ' ' + uploaderDetail.lastName,
		uploaderDesignation: uploaderDetail.designation,
		uploaderSignature: uploaderDetail.signature,
	})

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(!open);
	const toast = useToast();

	const onDocumentType = (value) => {
		setDocumentDetail({
			...documentDetail,
			documentType: value
		})
	}

	const onControlNumber = (e) => {
		setDocumentDetail({
			...documentDetail,
			controlNumber: e.target.value
		})
	}

	const onCollegeName = (value) => {
		setDocumentDetail({
			...documentDetail,
			collegeName: value
		})
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

	const addDocument = async () => {
		try {


			if (
				!documentDetail.controlNumber ||
				!documentDetail.collegeName ||
				!documentDetail.documentType ||
				!documentDetail.header ||
				!documentDetail.subject ||
				!documentDetail.content
			) {
				handleOpen();
				toast.open(
					<div className="flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
						<LuAlertCircle size={40} />
						<div>
							<Typography variant="h4">Incomplete Detail!</Typography>
							<Typography variant="paragraph">
								Please fill in all necessary details.
							</Typography>
						</div>
					</div>
				);
				return;
			} else {
				axios.post('http://localhost:7000/document/createDocument', {
					controlNumber: documentDetail.controlNumber,
					collegeName: documentDetail.collegeName,
					documentType: documentDetail.documentType,
					header: documentDetail.header,
					subject: documentDetail.subject,
					content: documentDetail.content,
					uploaderName: documentDetail.uploaderName,
					uploaderDesignation: documentDetail.uploaderDesignation,
					uploaderSignature: documentDetail.uploaderSignature,
				})
					.then(res => {
						console.log(res)
						if (res.status === 200) {
							toast.open(
								<div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
									<LuAlertCircle size={40} />
									<div>
										<Typography variant="h5">Success!</Typography>
										<Typography variant="paragraph">
											Document Submittion Successful
										</Typography>
									</div>
								</div>
							);
							setDocumentDetail({
								controlNumber: "",
								collegeName: "",
								documentType: null,
								header: "",
								subject: "",
								content: '',
								uploaderName: uploaderDetail.firstName + ' ' + uploaderDetail.lastName,
								uploaderDesignation: uploaderDetail.designation,
								uploaderSignature: uploaderDetail.signature,
							})
						} else {
							toast.open(
								<div className='flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg'>
									<LuAlertCircle size={40} />
									<div>
										<Typography variant='h5'>Failed!</Typography>
										<Typography variant='paragraph'>Document Submittion Failed</Typography>
									</div>

								</div>
							)
						}
					})
			}

		} catch (error) {
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

	return (
		<div className='flex flex-col mt-4 px-20 rounded-xl overflow-y-scroll'>
			<h3 className='flex bg-deep-purple-900 text-xl shadow-lg p-3 text-white font-bold rounded-xl justify-center'>Document Creation Page</h3>
			<div className='flex gap-14 my-4'>
				<Select
					className='text-[#4477CE]'
					variant='outlined'
					label="Select Document Type"
					onChange={onDocumentType}
					value={documentDetail.documentType}
					animate={{
						mount: { y: 0 },
						unmount: { y: 25 },
					}}
				>
					<Option value="Memorandum">Memorandum</Option>
					<Option value="Special Order">Special Order</Option>
				</Select>

				<Input
					color='cyan'
					variant="standard"
					label="Control Number"
					value={documentDetail.controlNumber}
					onChange={onControlNumber}
				/>
				<Select
					color='cyan'
					variant='outlined'
					label="Select College"
					onChange={onCollegeName}
					value={documentDetail.documentType}

					animate={{
						mount: { y: 0 },
						unmount: { y: 25 },
					}}>
					<Option value="COA">College of Agriculture</Option>
					<Option value="CBAA">College of Business Administration and Accountancy</Option>
					<Option value="CED">College of Education</Option>
					<Option value="COE">College of Engineering</Option>
					<Option value="CHARM">College of Hotel and Restaurant Management</Option>
					<Option value="CICS">College of Information and Computing Sciences</Option>
					<Option value="CSPEAR">CSPEAR</Option>
					<Option value="CNSM">College of Natural Science and Mathematics</Option>
					<Option value="CPA">College of Public Affairs</Option>

				</Select>
			</div>

			<div className="flex flex-col gap-1.5">
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
			<div>
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
			<div className="flex col-sm-12 text-right">
				<button onClick={handleConfirmationOpen} className="flex mx-auto bg-green-400 border border-black p-2 px-8 m-4 rounded-xl font-semibold"> Submit </button>
				<Dialog
					open={confirmationOpen}
					handler={handleConfirmationClose}
					animate={{
						mount: { scale: 1, y: 0 },
						unmount: { scale: 0.9, y: -100 },
					}}
				>
					<DialogHeader>Submit Document?</DialogHeader>
					<DialogBody divider>
						Make sure all the details entered are correct.
					</DialogBody>
					<DialogFooter className='flex gap-3'>
						<button
							onClick={confirmSubmission}
							className='flex border border-green-700 rounded-lg p-1 px-4 text-md text-black hover:bg-green-400'>
							<span>Confirm</span>
						</button>
						<button
							onClick={handleConfirmationClose}
							className='flex border border-red-700 rounded-lg p-1 px-4 text-md text-black hover:bg-red-400'
						>
							<span>Cancel</span>
						</button>
					</DialogFooter>
				</Dialog>
			</div>
		</div >
	)
}

export default NewCreateDocument