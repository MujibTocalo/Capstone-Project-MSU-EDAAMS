import { useEffect } from "react";
import documentsStore from "../config/documentsStore";
import logo from '../assets/msulogo.png'
import { Avatar, Typography } from "@material-tailwind/react";

const DocumentCompleteDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store]);

	return (
		<div className="text-black">
			<div key={document._id}>
				<div className="flex m-2">
					<Avatar
						src={logo}
						variant="circular"
						size="md"
						alt='Mujib Tocalo'
						className="border border-cyan-800"
					/>
					<Typography variant='lead' className='m-2'>
						{document.uploaderName}
					</Typography>
				</div>
				<div className="flex flex-col p-2">
					<div className="flex flex-row">
						<Typography variant='paraghrap'>{document.controlNumber}</Typography>
						<Typography variant='paraghrap'>{document.collegeName}</Typography>
					</div>
					<Typography variant='paraghrap'>{document.createdAt}</Typography>
				</div>
				<div className="p-2">
					<div className="gap-3.5">
						<Typography variant='paraghrap'>To: {document.header}</Typography>
						<Typography variant='paraghrap'>Subject: {document.subject}</Typography>
					</div>
					<Typography variant='paraghrap' className='h-64 overflow-auto m-3'>{document.content}</Typography>
				</div>
				<div className="flex flex-row-reverse">
					<div className="flex flex-col">
						<Typography variant='paragraph'><u>{document.approverName}</u></Typography>
						<Typography variant='paragraph'>{document.approverDesignation}</Typography>
					</div>
				</div>
			</div>
		</div>
	)

}

export default DocumentCompleteDetail;