import { useEffect, useState } from "react";
import documentsStore from "../config/documentsStore";
import logo from '../assets/msulogo.png'
import { Avatar, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import ReactQuill from "react-quill";
import { formats } from "../components/EditorToolbar";
import 'react-quill/dist/quill.snow.css';
import '../components/TextEditor.css';




const DocumentCompleteDetail = ({ document }) => {
	const currentUser = JSON.parse(localStorage.getItem('userDetails'))
	const store = documentsStore();

	const [signature, setSignature] = useState()
	const [deanSignature, setDeanSignature] = useState()
	const [endorserSignature, setEndorserSignature] = useState()
	const [opSignature, setOPSignature] = useState()
	const [userAccess, setUserAccess] = useState(currentUser.userType)

	useEffect(() => {
		setUserAccess(currentUser.userType)
		store.fetchDocuments();
		setSignature(document.uploaderSignature);
		setDeanSignature(document.deanSignature);
		setEndorserSignature(document.endorserSignature);
		setOPSignature(document.approverSignature);
	}, [store]);


	return (
		<div className="text-black">
			<div key={document._id} className="p-2">
				<div className="flex flex-col border border-gray-400 p-2 mx-2 justify-between shadow-md">
					{/* <Typography className='font-semibold'>{document.collegeName}</Typography> */}
					<div className="flex">
						<Typography variant='paragraph'>Control No. </Typography>
						<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '.5em' }}>{document.controlNumber}</Typography>
					</div>
					<div className="flex">
						<Typography variant='paragraph'>Date: </Typography>
						<Typography variant='paragraph' style={{ textIndent: '.5em' }} className='font-semibold'>{format(new Date(document.createdAt), 'yyyy-MM-dd')}</Typography>
					</div>
				</div>

				{/* RMO DOCUMENT ACCESS */}
				{(userAccess === 'Administrator' || userAccess === 'Releaser') && (
					<div className="p-2">
						<div className="gap-3.5">
							<Typography className='text-center font-semibold bg-indigo-800 text-white p-1 mt-4 rounded-md shadow-lg'>{document.documentType} Endorsement By {document.approverDesignation + ', ' + document.approverName}</Typography>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>To: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.approverHeader}</Typography>
							</div>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>Subject: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.approverSubject}</Typography>
							</div>
							{/* <div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph' className='font-medium text-justify whitespace-break-spaces' style={{ textIndent: '3em', lineHeight: 2 }}>{document.approverContent}</Typography>
							</div> */}
							{/* <div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								{document.approverContent.split('\n').map((paragraph, index) => (
									<Typography
										key={index}
										variant='paragraph'
										className='font-medium text-justify whitespace-break-spaces'
										style={{ textIndent: index === 0 ? '3em' : 0, lineHeight: 2 }}
									>
										{paragraph}
									</Typography>
								))}
							</div> */}
							<div >
								<ReactQuill
									value={document.approverContent}
									readOnly={true}
									modules={{ toolbar: false }}
									className="shadow-md" />
							</div>
						</div>
						<div className="flex flex-row mr-12 justify-end">
							<div className="flex flex-col">
								{endorserSignature && (
									<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${endorserSignature}`} alt="signature" />
								)}
								<div className="text-center ">
									<Typography variant='paragraph'><u>{document.approverName}</u></Typography>
									<Typography variant='paragraph'>{document.approverDesignation}</Typography>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* OFFICE OF THE PRESIDENT DOCUMENT ACCESS	 */}
				{(userAccess === 'Approver - OP' || userAccess === 'Administrator' || userAccess === 'Releaser') && (
					<div className="p-2">
						<div className="gap-3.5">
							<Typography className='text-center font-semibold bg-indigo-800 text-white p-1 mt-4 rounded-md shadow-lg'>{document.documentType} Endorsement By {document.endorserDesignation + ', ' + document.endorserName} From OVCAA</Typography>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>To: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.endorsementHeader}</Typography>
							</div>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>Subject: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.endorsementSubject}</Typography>
							</div>
							{/* <div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph' className='font-medium text-justify whitespace-break-spaces' style={{ textIndent: '3em', lineHeight: 2 }}>{document.endorsementContent}</Typography>
							</div> */}
							<div>
								<ReactQuill
									value={document.endorsementContent}
									readOnly={true}
									modules={{ toolbar: false }}
									className="shadow-md" />
							</div>
						</div>
						<div className="flex flex-row mr-12 justify-end">
							<div className="flex flex-col">
								{endorserSignature && (
									<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${endorserSignature}`} alt="signature" />
								)}
								<div className="text-center ">
									<Typography variant='paragraph'><u>{document.endorserName}</u></Typography>
									<Typography variant='paragraph'>{document.endorserDesignation}</Typography>
								</div>
							</div>
						</div>
						<Typography className='text-center font-semibold bg-indigo-800 text-white p-1 mt-4 rounded-md shadow-lg'>{document.documentType} Endorsement Document By {document.deanDesignation + ', ' + document.deanName}</Typography>
					</div>
				)}


				{/* DEAN ENDORSEMENT FOR OVCAA */}
				{(userAccess === "Endorser - OVCAA" || userAccess === 'Approver - OP' || userAccess === 'Administrator' || userAccess === 'Releaser') && (
					<div className="p-2">
						<div className="gap-3.5">
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>To: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.deanEndorsementHeader}</Typography>
							</div>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>Subject: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.deanEndorsementSubject}</Typography>
							</div>
							{/* <div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph' className='font-medium text-justify whitespace-break-spaces' style={{ textIndent: '3em', lineHeight: 2 }}>{document.deanEndorsementContent}</Typography>
							</div> */}
							<div >
								<ReactQuill
									value={document.deanEndorsementContent}
									readOnly={true}
									modules={{ toolbar: false }}
									className="shadow-md" />
							</div>
						</div>
						<div className="flex flex-row mr-12 justify-end">
							<div className="flex flex-col">
								{deanSignature && (
									<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${deanSignature}`} alt="signature" />
								)}
								<div className="text-center ">
									<Typography variant='paragraph'><u>{document.deanName}</u></Typography>
									<Typography variant='paragraph'>{document.deanDesignation}</Typography>
								</div>
							</div>
						</div>
						<Typography className='text-center font-semibold bg-indigo-800 text-white p-1 mt-4 rounded-md shadow-lg'>Original {document.documentType}  Document By {document.uploaderDesignation + ', ' + document.uploaderName}</Typography>
					</div>
				)}

				{/* PENDING STATUS DEAN ACCESS */}
				<div className="p-2">
					<div className="gap-3.5">
						<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
							<Typography variant='paragraph'>To: </Typography>
							<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.header}</Typography>
						</div>
						<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
							<Typography variant='paragraph'>Subject: </Typography>
							<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.subject}</Typography>
						</div>
						{/* <div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
							<Typography variant='paragraph' className='font-medium text-justify whitespace-break-spaces' style={{ textIndent: '3em', lineHeight: 2 }}>{document.content}</Typography>
						</div> */}
						<div >
							<ReactQuill
								theme="snow"
								value={document.content}
								readOnly={true}
								// modules={{ toolbar: false }}
								modules={{ toolbar: false }}
								formats={formats}
								className="shadow-md text-justify"
								style={{ lineHeight: 2}} />
						</div>
					</div>
				</div>

				<div className="flex flex-row justify-end mr-12">
					<div className="flex flex-col">
						{signature && (
							<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${signature}`} alt="signature" />
						)}
						<div className="text-center">
							<Typography variant='paragraph'><u>{document.uploaderName}</u></Typography>
							<Typography variant='paragraph'>{document.uploaderDesignation}</Typography>
						</div>
					</div>
				</div>
			</div>
		</div >
	)

}

export default DocumentCompleteDetail;