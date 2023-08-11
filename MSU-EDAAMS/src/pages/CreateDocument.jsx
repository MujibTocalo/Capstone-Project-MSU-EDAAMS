import React, { useEffect, useState } from 'react';

import {
	Alert, Select, Option, Input, Textarea, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography,
} from '@material-tailwind/react'

const CreateDocument = () => {

	const [controlNumber, setControlNumber] = useState('')
	const [collegeName, setCollegeName] = useState('')
	const [documentType, setDocumentType] = useState('')
	const [header, setHeader] = useState('')
	const [subject, setSubject] = useState('')
	const [content, setContent] = useState('')
	const [approverDesignation, setApproverDesignation] = useState('')
	const [approverName, setApproverName] = useState('')
	const [uploaderName, setUploaderName] = useState('')

	const [alertMessage, setAlertMessage] = useState('');
	const [alertType, setAlertType] = useState('');

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(!open);

	// HANDLERS
	const handleControlName = (e) => {
		setControlNumber(e.target.value);
	}
	const handleCollegeName = (e) => {
		setCollegeName(e);
	}
	const handleDocumentType = (e) => {
		setDocumentType(e)
	}
	const handleHeader = (e) => {
		setHeader(e.target.value)
	}
	const handleSubject = (e) => {
		setSubject(e.target.value)
	}
	const handleContent = (e) => {
		setContent(e.target.value)
	}
	const handleApproverDesignation = (e) => {
		setApproverDesignation(e.target.value)
	}
	const handleApproverName = (e) => {
		setApproverName(e.target.value)
	}

	const hideAlertAfterDelay = () => {
		setTimeout(() => {
			setAlertMessage('');
			setAlertType('');
		}, 3000);
	};

	const handleSubmitAndOpen = () => {
		handleOpen();
		handleSubmit();
	}


	const handleSubmit = async () => {
		// Check if any of the required fields are empty
		if (
			!controlNumber ||
			!collegeName ||
			!documentType ||
			!header ||
			!subject ||
			!content ||
			!approverDesignation ||
			!approverName ||
			!uploaderName
		) {
			setAlertMessage('Please fill in all the required fields.');
			setAlertType('error');
			hideAlertAfterDelay();
			return; // Prevent form submission
		}

		const data = {
			controlNumber,
			collegeName,
			documentType,
			header,
			subject,
			content,
			approverDesignation,
			approverName,
			uploaderName,
		};

		try {
			const response = await fetch('http://localhost:7000/document/createDocument', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setAlertMessage('Document Submitted.');
				setAlertType('success');
				hideAlertAfterDelay()
				setDocumentType('');
				setCollegeName('');
				setControlNumber('');
				setHeader('');
				setSubject('');
				setContent('');
				setApproverDesignation('');
				setApproverName('');

			} else {
				setAlertMessage('Document Submission Failed.');
				setAlertType('error');
				hideAlertAfterDelay()
			}
		} catch (error) {
			setAlertMessage('Document Submission Error.');
			setAlertType('error');
			hideAlertAfterDelay()
			console.error(error);
		}
	};

	useEffect(() => {
		const userDetail = JSON.parse(localStorage.getItem('userDetails'));
		handleUploaderName(userDetail)
	}, []);

	const handleUploaderName = (userDetails) => {

		const uploaderFirstName = userDetails.firstName;
		const uploaderLastName = userDetails.lastName;
		setUploaderName(uploaderFirstName + '  ' + uploaderLastName);
		//console.log(uploaderName)
	};



	return (
		<div>
			{alertMessage && (
				<Alert
					className='flex justify-center'
					color={alertType === 'success' ? 'green' : 'red'}
					variant="text"

				>
					<span>{alertMessage}</span>
				</Alert>
			)}
			<div className="flex flex-col p-10 gap-1.5 border shadow-xl rounded-lg">
				<Typography variant='h3' className=' flex font-medium mb-4 justify-center'>Create Document</Typography>
				<div className='flex gap-14'>
					<Select
						color='cyan'
						variant='outlined'
						label="Select Document Type"
						onChange={(e) => handleDocumentType(e)}
						value={documentType}
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
						value={controlNumber}
						onChange={handleControlName}
					/>
					<Select

						color='cyan'
						variant='outlined'
						label="Select College"
						onChange={(e) => handleCollegeName(e)}
						value={documentType}

						animate={{
							mount: { y: 0 },
							unmount: { y: 25 },
						}}>
						<Option value="CICS">College of Information and Computing Sciences</Option>
						<Option value="COE">College of Engineering</Option>
						<Option value="CED">College of Education</Option>
						<Option value="COA">College of Agriculture</Option>
						<Option value="CHARM">College of Hotel and Restaurant Management</Option>
						<Option value="CSPEAR">CSPEAR</Option>
						<Option value="CBAA">College of Business Administration and Accountancy</Option>
						<Option value="CNSM">College of Natural Science and Mathematics</Option>
						<Option value="CPA">College of Public Affairs</Option>

					</Select>
				</div>
				<div className="flex flex-col gap-1.5">
					<Input
						color='cyan'
						variant="standard"
						label="Header"
						value={header}
						onChange={handleHeader}
					/>
					<Input
						color='cyan'
						variant="standard"
						label="Subject"
						value={subject}
						onChange={handleSubject}
					/>
				</div>
				<div className='flex mt-4 h-72'>
					<Textarea
						color='cyan'
						label="Content" value={content} onChange={handleContent} />
				</div>
				<div className='flex mx-auto gap-1.5'>
					<Input
						color='cyan'
						variant="outlined"
						label="Approver Designation"
						value={approverDesignation}
						onChange={handleApproverDesignation}
					/>
					<Input
						color='cyan'
						variant="outlined"
						label="Approver Name"
						value={approverName}
						onChange={handleApproverName}
					/>
				</div>
				<div className='flex mx-auto mt-2'>
					<Button variant='text' onClick={handleOpen} size='sm'
						color='green'>Submit</Button>
					<Dialog
						open={open}
						handler={handleOpen}
						animate={{
							mount: { scale: 1, y: 0 },
							unmount: { scale: 0.9, y: -100 },
						}}
					>
						<DialogHeader>Submit Document?</DialogHeader>
						<DialogBody divider>
							Make sure all the details entered are correct.
						</DialogBody>
						<DialogFooter>
							<Button variant="text" color="green" onClick={handleSubmitAndOpen}>
								<span>Confirm</span>
							</Button>
							<Button
								variant="text"
								color="red"
								onClick={handleOpen}
								className="mr-1"
							>
								<span>Cancel</span>
							</Button>
						</DialogFooter>
					</Dialog>
				</div>
			</div>
		</div >
	)

}

export default CreateDocument;