import { useEffect, useState } from "react";
import documentsStore from "../config/documentsStore";
import logo from '../assets/msulogo.png'
import { Avatar, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import ReactQuill from "react-quill";

const DocumentCompleteDetail = ({ document }) => {

	const store = documentsStore();

	const [signature, setSignature] = useState()
	const [deanSignature, setDeanSignature] = useState()
	const [endorserSignature, setEndorserSignature] = useState()
	const [opSignature, setOPSignature] = useState()

	const [documentStatus, setDocumentStatus] = useState()

	useEffect(() => {
		store.fetchDocuments();
		setSignature(document.uploaderSignature);
		setDeanSignature(document.deanSignature);
		setEndorserSignature(document.endorserSignature);
		setOPSignature(document.approverSignature);
		setDocumentStatus(document.documentStatus)
	}, [store]);

	return (
		<div className="text-black">
			<div key={document._id} className="p-2">
				<div className="flex flex-col border border-gray-400 p-2 mx-2 justify-between shadow-md">
					<Typography className='font-semibold'>{document.collegeName}</Typography>
					<div className="flex">
						<Typography variant='paragraph'>Control No. </Typography>
						<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '.5em' }}>{document.controlNumber}</Typography>
					</div>
					<div className="flex">
						<Typography variant='paragraph'>Date: </Typography>
						<Typography variant='paragraph' style={{ textIndent: '.5em' }} className='font-semibold'>{format(new Date(document.createdAt), 'yyyy-MM-dd')}</Typography>
					</div>
				</div>

				{/* FINAL DOCUMENT CONTENT FOR RMO TO RELEASE */}
				{documentStatus === 'OP Approved' && (
					<div className="p-2">
						<div className="gap-3.5">
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>To: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.endorsementHeader}</Typography>
							</div>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>Subject: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.endorsmentSubject}</Typography>
							</div>
						</div>
						<ReactQuill
							value={document.endorsementContent}
							readOnly={true}
							modules={{
								toolbar: false,
							}}
							className="flex border-none shadow-md"
							style={{ textIndent: '1em' }}
						/>
						<div className="flex flex-col">
							{endorserSignature && (
								<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${endorserSignature}`} alt="signature" />
							)}
							<div className="text-center">
								<Typography variant='paragraph'><u>{document.endorserName}</u></Typography>
								<Typography variant='paragraph'>{document.endorserDesignation}</Typography>
							</div>
						</div>

					</div>
				)}

				{/* OVCAA ENDORSEMENT FOR OP */}
				{documentStatus === 'OVCAA Endorsed' && (
					<div className="p-2">
						<div className="gap-3.5">
							<Typography className='text-center font-semibold bg-indigo-800 text-white p-1 mt-4 rounded-md shadow-lg'>Endorsement Document By {document.endorserDesignation + ', ' + document.endorserName}</Typography>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>To: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.endorsementHeader}</Typography>
							</div>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>Subject: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.endorsmentSubject}</Typography>
							</div>
						</div>
						<ReactQuill
							value={document.endorsementContent}
							readOnly={true}
							modules={{
								toolbar: false,
							}}
							className="flex border-none shadow-md"
							style={{ textIndent: '1em' }}
						/>
						<div className="flex flex-col">
							{endorserSignature && (
								<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${endorserSignature}`} alt="signature" />
							)}
							<div className="text-center">
								<Typography variant='paragraph'><u>{document.endorserName}</u></Typography>
								<Typography variant='paragraph'>{document.endorserDesignation}</Typography>
							</div>
						</div>

					</div>
				)}
				{/* DEAN ENDORSEMENT FOR OVCAA */}
				{documentStatus === 'Dean Approved' || documentStatus === 'Dean Endorsed' && (
					<div className="p-2">
						<div className="gap-3.5">
							<Typography className='text-center font-semibold bg-indigo-800 text-white p-1 mt-4 rounded-md shadow-lg'>Endorsement Document By {document.deanDesignation + ', ' + document.deanName}</Typography>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>To: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{documentStatus === 'Dean Approved' || documentStatus === 'Dean Endorsed' ? document.deanEndorsementHeader : document.header}</Typography>
							</div>
							<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
								<Typography variant='paragraph'>Subject: </Typography>
								<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{documentStatus === 'Dean Approved' || documentStatus === 'Dean Endorsed' ? document.deanEndorsmentSubject : document.subject}</Typography>
							</div>
						</div>
						<ReactQuill
							value={documentStatus === 'Dean Approved' || documentStatus === 'Dean Endorsed' ? document.deanEndorsementContent : document.content}
							readOnly={true}
							modules={{
								toolbar: false,
							}}
							className="flex border-none shadow-md"
							style={{ textIndent: '1em' }}
						/>
						<div className="flex flex-col">
							{deanSignature && (
								<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${deanSignature}`} alt="signature" />
							)}
							<div className="text-center">
								<Typography variant='paragraph'><u>{document.deanName}</u></Typography>
								<Typography variant='paragraph'>{document.deanDesignation}</Typography>
							</div>
						</div>
					</div>
				)}

				<div className="p-2">
					<div className="gap-3.5">
						<Typography className='text-center font-semibold bg-indigo-800 text-white p-1 mt-4 rounded-md shadow-lg'>Original Document By {document.uploaderDesignation + ', ' + document.uploaderName}</Typography>
						<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
							<Typography variant='paragraph'>To: </Typography>
							<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.header}</Typography>
						</div>
						<div className="flex flex-col border border-gray-400 p-2 my-2 shadow-md">
							<Typography variant='paragraph'>Subject: </Typography>
							<Typography variant='paragraph' className='font-semibold' style={{ textIndent: '1em' }}>{document.subject}</Typography>
						</div>
					</div>
					<ReactQuill
						value={document.content}
						readOnly={true}
						modules={{
							toolbar: false,
						}}
						className="flex border-none shadow-md"
						style={{ textIndent: '1em' }}
					/>
				</div>

				<div className="flex flex-row justify-evenly">
					<div className="flex flex-col">
						{signature && (
							<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${signature}`} alt="signature" />
						)}
						<div className="text-center">
							<Typography variant='paragraph'><u>{document.uploaderName}</u></Typography>
							<Typography variant='paragraph'>{document.uploaderDesignation}</Typography>
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						{opSignature && (
							<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${opSignature}`} alt="signature" />
						)}
						<Typography variant='paragraph'><u>{document.opApproverName}</u></Typography>
						<Typography variant='paragraph'>{document.opApproverDesignation}</Typography>
					</div>
				</div>
			</div>
		</div >
	)

}

export default DocumentCompleteDetail;