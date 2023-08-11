import { useEffect } from "react";
import documentsStore from "../config/documentsStore";
import { Avatar, Typography } from "@material-tailwind/react";

import logo from '../assets/msulogo.png'

const DocumentDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store])

	return (
		<div key={document._id}
			className='flex flex-col p-4 border border-gray-100 shadow-md rounded-md'>
			<div className="flex flex-row items-center whitespace-pre">
				<Typography
					className='bg-cyan-700 text-sm rounded-lg m-2 p-2 text-white'>
					{document.documentType}
				</Typography>
				<Typography
					className='bg-cyan-700 text-sm rounded-lg p-2 text-white'>
					{document.collegeName}
				</Typography>
			</div>
			<div className="flex flex-col py-2 rounded-lg">
				<Typography className='text-sm pl-2 py-1'>
					To: {document.header}
				</Typography>
				<Typography className='text-sm pl-2 py-1'>
					Subject: {document.subject}
				</Typography>
			</div>
		</div>
	)

}

export default DocumentDetail;