import { useEffect } from "react";
import documentsStore from "../../config/documentsStore";
import { Avatar, Typography } from "@material-tailwind/react";

import logo from '../../assets/msulogo.png'
import { format } from "date-fns";

const DocumentApproverDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store])

	return (
		<div key={document._id}
			className='flex flex-col bg-white p-2 px-4 rounded-md'>
			<div className="flex flex-col items-center justify-start whitespace-pre">
				<Typography
					className='bg-indigo-500/80 font-semibold text-sm rounded-lg m-1 p-1 text-white'>
					{document.documentType}
				</Typography>
				<Typography
					className='text-md rounded-lg p-1 font-bold '>
					{document.collegeName}
				</Typography>
			</div>
			<div className="flex flex-col py-4 rounded-lg text-start">
				<Typography className='text-sm font-semibold py-1'>
					Control No.
				</Typography>
				<Typography className='text-sm pl-4 py-1'>
					{document.controlNumber}
				</Typography>
				<Typography className='text-sm py-1 font-semibold'>
					Date:
				</Typography>
				<Typography className='text-sm pl-4 py-1'>
					{format(new Date(document.createdAt), 'yyyy-MM-dd')}
				</Typography>
				<Typography className='text-sm py-1 font-semibold'>
					Uploaded By:
				</Typography>
				<Typography className='text-sm pl-4 py-1'>
					{document.uploaderName}
				</Typography>
			</div>
		</div>
	)

}

export default DocumentApproverDetail;