import { useEffect } from "react";
import documentsStore from "../../config/documentsStore";
import { Avatar, Typography } from "@material-tailwind/react";

import { format } from "date-fns";

const DocumentOPDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store])


	return (
		<div key={document._id}
			className='flex flex-col bg-white p-3 rounded-md overflow-hidden'>
			<div className="flex flex-row items-center justify-start whitespace-pre">
				<Typography
					className='bg-indigo-600 font-semibold text-sm rounded-lg m-1 p-1 text-white'>
					{document.documentType}
				</Typography>
				<Typography
					className='text-md rounded-lg p-1 text-indigo-900 font-bold '>
					{document.collegeName}
				</Typography>
			</div>
			<div className="flex flex-col py-2 rounded-lg">
				<Typography className='text-sm pl-2 py-1'>
					Control No. {document.controlNumber}
				</Typography>
				<Typography className='text-sm pl-2 py-1'>
					<b>Date: </b> {format(new Date(document.createdAt), 'yyyy-MM-dd')}
				</Typography>
				<Typography className='text-sm pl-2 py-1'>
					Endorsed By: {document.endorserName}
				</Typography>
				<Typography className='text-sm pl-2 py-1'>
					<b>Date Endorsed: </b> {format(new Date(document.endorsementDate), 'yyyy-MM-dd')}
				</Typography>
			</div>
		</div>
	)

}

export default DocumentOPDetail;