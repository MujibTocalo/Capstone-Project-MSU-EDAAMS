import { useEffect } from "react";
import documentsStore from "../../config/documentsStore";
import { Avatar, Typography } from "@material-tailwind/react";
import { format } from "date-fns";

import logo from '../../assets/msulogo.png'

const DocumentEndorsementDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store])

	return (
		<div key={document._id}
			className='flex flex-col bg-white p-4 px-5 rounded-xl'>
			<div className="flex flex-col items-center justify-start whitespace-pre">
				<img src={logo} className="flex w-16" />
				<Typography
					className='bg-yellow-500/80 font-semibold text-sm rounded-lg m-1 p-2 text-black'>
					{document.documentType}
				</Typography>
				<Typography
					className='text-md rounded-lg p-1 font-bold '>
					{document.collegeName}
				</Typography>
			</div>
			<div className="flex flex-col rounded-lg text-center">
				<Typography className='text-sm py-1'>
					Date Endorsed: {format(new Date(document.deanEndorsementDate), 'yyyy-MM-dd')}
				</Typography>
				<Typography className='text-sm py-1 '>
					Endorsed By: {document.deanDesignation}, {document.deanName}
				</Typography>
			</div>
		</div>
	)

}

export default DocumentEndorsementDetail;