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
					className='text-md rounded-lg p-1 font-bold text-center'>
					{document.collegeName}
				</Typography>
			</div>

			{document.documentStatus === 'OP Approved' && (
				<div className="flex flex-col py-2 rounded-lg text-center">
					<Typography className='text-sm pl-2 py-1'>
						<b>Date: </b> {format(new Date(document.approvalDate), 'yyyy-MM-dd')}
					</Typography>
					{/* <Typography className='text-sm pl-2 py-1'>
						Approved By: {document.approverDesignation}
					</Typography> */}
				</div>
			)}

			{/* {document.documentStatus === 'Rejected' && (
				<div className="flex flex-col py-2 rounded-lg text-center">
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
			)} */}

		</div>
	)

}

export default DocumentReleasingDetail;