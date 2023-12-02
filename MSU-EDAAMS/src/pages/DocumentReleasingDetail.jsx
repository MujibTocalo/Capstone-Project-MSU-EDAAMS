import { useEffect } from "react";
import documentsStore from "../config/documentsStore";
import { Avatar, Typography } from "@material-tailwind/react";

import logo from '../assets/msulogo.png'
import { format } from "date-fns";

const DocumentReleasingDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store])

	// if (document.documentStatus !== "Pending") {
	// 	return null;
	// }

	return (
		<div key={document._id}
			className='flex flex-col bg-white p-4 rounded-md'>
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

			{document.documentStatus === 'OP Approved' && (
				<div className="flex flex-col py-2 rounded-lg">
					<Typography className='text-sm pl-2 py-1'>
						Control No. {document.controlNumber}
					</Typography>
					<Typography className='text-sm pl-2 py-1'>
						<b>Date: </b> {format(new Date(document.createdAt), 'yyyy-MM-dd')}
					</Typography>
					<Typography className='text-sm pl-2 py-1'>
						Approved By: {document.approverName}
					</Typography>
					<Typography className='text-sm pl-2 py-1'>
						<b>Date Approved: </b> {format(new Date(document.approvalDate), 'yyyy-MM-dd')}
					</Typography>
				</div>
			)}

			{document.documentStatus === 'Rejected' && (
				<div className="flex flex-col py-2 rounded-lg">
					<Typography className='text-sm pl-2 py-1'>
						Control No. {document.controlNumber}
					</Typography>
					<Typography className='text-sm pl-2 py-1'>
						<b>Date Submitted: </b> {format(new Date(document.createdAt), 'yyyy-MM-dd')}
					</Typography>
					<Typography className='text-sm pl-2 py-1'>
						Rejected By: {document.rejectedName}
					</Typography>
					<Typography className='text-sm pl-2 py-1'>
						<b>Date Rejected: </b> {format(new Date(document.rejectedDate), 'yyyy-MM-dd')}
					</Typography>
				</div>
			)}

		</div>
	)

}

export default DocumentReleasingDetail;