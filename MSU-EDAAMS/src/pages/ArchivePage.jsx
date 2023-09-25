import {
	MagnifyingGlassIcon,
	ChevronUpDownIcon,
	DocumentPlusIcon,
	DocumentChartBarIcon,
	DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PDFDownloadLink, Document, Page, Text, Image, View, PDFViewer, Line } from '@react-pdf/renderer';

import styles from "../components/styles";

import {
	Card,
	CardHeader,
	Input,
	Typography,
	CardBody,
	Chip,
	CardFooter,
} from "@material-tailwind/react";

import { format } from 'date-fns'

import { useNavigate } from 'react-router-dom'
import documentsStore from "../config/documentsStore";
import { useEffect, useState } from "react";
import { LuDownload, LuEdit, LuHistory, LuLoader, LuTrash } from "react-icons/lu";

import axios from "axios";

const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: 'Released',
		value: 'Released'
	},
	{
		label: 'Rejected',
		value: 'Rejected'
	}

];

const TABLE_HEAD = ["Document Type", 'User Detail', "College/Office", "Document Status", 'Date Uploaded', 'Action'];

const ArchivePage = () => {

	const store = documentsStore()

	const [tableRows, setTableRows] = useState([])

	useEffect(() => {
		const fetchTableRows = async () => {
			try {
				const response = await axios.get('http://localhost:7000/document');

				const responseData = response.data;
				const documentArray = responseData.document;

				const sortedDocuments = documentArray
					.filter((document) => document.documentStatus === 'Rejected' || document.documentStatus === 'Released')
					.sort((a, b) =>
						new Date(b.createdAt) - new Date(a.createdAt)
					);

				setTableRows(sortedDocuments);
			} catch (error) {

			}
		};

		fetchTableRows();
	}, [store]);



	const navigate = useNavigate()

	return (
		<Card className="h-full w-full bg-white">
			<CardHeader floated={false} shadow={false} className="rounded-none bg-white">
				<div className="mb-2 flex items-center justify-between gap-8">
					<div>
						<Typography variant="h5" color="blue-gray">
							Document Archive
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							See all information about archived documents
						</Typography>

					</div>
					<div className="w-full md:w-72">
						<Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head, index) => (
								<th
									key={head}
									className="border-y border-blue-gray-100 bg-indigo-50/50  p-4 transition-colors sticky -top-8"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex font-bold leading-none"
									>
										{head}{" "}
										{index !== TABLE_HEAD.length - 1}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{tableRows.map(
							(
								{
									documentType,
									uploaderName,
									controlNumber,
									documentStatus,
									collegeName,
									createdAt,
									header,
									subject,
									uploaderSignature,
									content,
									uploaderDesignation
								},
								index
							) => {
								const isLast = index === tableRows.length - 1;
								const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";

								return (
									<tr key={controlNumber}>
										<td className={classes}>
											<div className="flex flex-col items-start ml-2">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{documentType}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-80"
												>
													No. {controlNumber}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col gap-1.5">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{uploaderName}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{collegeName}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex w-max">
												<Chip
													variant="ghost"
													size="sm"
													value={documentStatus === 'DeanApproved' ? 'Dean Approved'
														: documentStatus === 'Endorsed' ? 'Endorsed'
															: documentStatus === 'OP Approved' ? 'OP Approved'
																: documentStatus === 'Created' ? 'Created' :
																	documentStatus === 'Pending' ? 'Pending' :
																		documentStatus === 'Released' ? 'Released' : 'Rejected'
													}
													color={
														documentStatus === 'Rejected' ? 'red' : documentStatus === 'Pending' ? 'orange' : 'green'
													}
												/>
											</div>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{format(new Date(createdAt), 'yyyy-MM-dd')}
											</Typography>
										</td>
										<td className={classes}>
											<div className="flex gap-1.5">
												<PDFDownloadLink document={
													<Document>
														<Page size="A4" style={styles.page}>
															<Text style={styles.documentDetailText}>Control No. {controlNumber + ' - ' + collegeName}</Text>
															<Text style={styles.documentDetailText}>Date: {format(new Date(createdAt), 'yyyy-MM-dd')}</Text>
															<Text style={styles.headerText}>To: {header}</Text>
															<Text style={styles.subjectText}>Subject: {subject}</Text>
															<Text style={styles.content}>
																{content}
															</Text>
															<Image
																src={`http://localhost:7000${uploaderSignature}`}
																style={styles.signature}
															/>
															<Text style={styles.name}>{uploaderName}</Text>
															<Text style={styles.designation}>{uploaderDesignation}</Text>
														</Page>
													</Document>
												} fileName="Generated PDF.pdf">
													{({ blob, url, loading, error }) =>
														loading ? <LuLoader /> : error ? 'Error generating PDF' : <LuDownload />
													}
												</PDFDownloadLink>
												<LuEdit />
												<LuHistory />
												<LuTrash />
											</div>
										</td>
									</tr>
								);
							},
						)}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
			</CardFooter>
		</Card>

	);
}

export default ArchivePage