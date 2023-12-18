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
			className='flex flex-col bg-white p-4 px-5 rounded-xl'>
			<div className="flex flex-col flex-wrap  items-center justify-start whitespace-pre">
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
			<div className="flex flex-col rounded-lg text-start">
				{/* <Typography className='text-sm font-semibold py-1'>
					Control Number :
				</Typography>
				<Typography className='text-sm '>
					{document.controlNumber}
				</Typography> */}
				<Typography className='text-sm text-center py-1'>
					Date : {format(new Date(document.createdAt), 'yyyy-MM-dd')}
				</Typography>

				<Typography className='text-sm text-center py-1'>
					Submitted By : {document.uploaderName}
				</Typography>
			</div>
		</div>
	)

}

export default DocumentApproverDetail;