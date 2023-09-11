import { useEffect, useState } from "react";
import documentsStore from "../config/documentsStore";
import logo from '../assets/msulogo.png'
import { Avatar, Typography } from "@material-tailwind/react";
import { format } from "date-fns";

const DocumentCompleteDetail = ({ document }) => {

	const store = documentsStore();

	const [signature, setSignature] = useState()
	const [deanSignature, setDeanSignature] = useState()
	const [endorserSignature, setEndorserSignature] = useState()
	const [opSignature, setOPSignature] = useState()

	useEffect(() => {
		store.fetchDocuments();
		setSignature(document.uploaderSignature);
		setDeanSignature(document.deanApproverSignature);
		setEndorserSignature(document.endorserSignature);
		setOPSignature(document.opSignature);
	}, [store]);

	return (
		<div className="text-black">
			<div key={document._id}>
				<div className="flex flex-col p-2">
					<Typography variant='paragraph'>{'Control No. ' + document.controlNumber + ' - ' + document.collegeName}</Typography>
					<Typography variant='paragraph'>Date: {format(new Date(document.createdAt), 'yyyy-MM-dd')}</Typography>
				</div>
				<div className="p-2">
					<div className="gap-3.5">
						<Typography variant='paragraph'>To: {document.header}</Typography>
						<Typography variant='paragraph'>Subject: {document.subject}</Typography>
					</div>
					<Typography variant='paragraph' className='m-3 whitespace-break-spaces'>{document.content}</Typography>
				</div>
				<div className="flex flex-row justify-evenly">
					<div className="flex flex-col">
						{signature && (
							<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${signature}`} alt="signature" />
						)}
						<Typography variant='paragraph'><u>{document.uploaderName}</u></Typography>
						<Typography variant='paragraph'>{document.uploaderDesignation}</Typography>
					</div>
					<div className="flex flex-col">
						{deanSignature && (
							<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${deanSignature}`} alt="signature" />
						)}
						<Typography variant='paragraph'><u>{document.deanApproverName}</u></Typography>
						<Typography variant='paragraph'>{document.deanApproverDesignation}</Typography>
					</div>
					<div className="flex flex-col">
						{endorserSignature && (
							<img className="flex mx-auto translate-y-8 w-24 h-24" src={`http://localhost:7000${endorserSignature}`} alt="signature" />
						)}
						<Typography variant='paragraph'><u>{document.endorserName}</u></Typography>
						<Typography variant='paragraph'>{document.endorserDesignation}</Typography>
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
		</div>
	)

}

export default DocumentCompleteDetail;