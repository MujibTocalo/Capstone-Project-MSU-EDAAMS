import { useEffect } from "react";
import documentsStore from "../../config/documentsStore";
import { Avatar, Typography } from "@material-tailwind/react";
import { format } from "date-fns";

const DocumentEndorsementDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store])

	return (
		<div key={document._id}
			className='flex flex-col bg-white p-1 px-4 rounded-md'>
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
			<div className="flex flex-col rounded-lg text-center">
				<Typography className='text-sm font-semibold py-1'>
					Control Number
				</Typography>
				<Typography className='text-sm '>
					{document.controlNumber}
				</Typography>
				<Typography className='text-sm py-1 font-semibold'>
					Date Endorsed
				</Typography>
				<Typography className='text-sm'>
					{format(new Date(document.deanEndorsementDate), 'yyyy-MM-dd')}
				</Typography>
				<Typography className='text-sm py-1 font-semibold'>
					Endorsed By
				</Typography>
				<Typography className='text-sm pb-1'>
					{document.deanName}
				</Typography>
			</div>
		</div>
	)

}

export default DocumentEndorsementDetail;