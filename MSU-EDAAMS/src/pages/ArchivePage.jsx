import {
	MagnifyingGlassIcon,
	ChevronUpDownIcon,
	DocumentPlusIcon,
<<<<<<< HEAD
} from "@heroicons/react/24/outline";
=======
	DocumentChartBarIcon,
	DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PDFDownloadLink, Document, Page, Text, Image, View, PDFViewer } from '@react-pdf/renderer';

import styles from "../components/styles";
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c

import {
	Card,
	CardHeader,
	Input,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	Tabs,
	TabsHeader,
	Tab,
	Avatar,
	IconButton,
	Tooltip,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from "@material-tailwind/react";

import { format } from 'date-fns'

import { useNavigate } from 'react-router-dom'
import documentsStore from "../config/documentsStore";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { LuMenu } from "react-icons/lu";
=======
import { LuArrowDown, LuCopySlash, LuDiamond, LuDownload, LuEdit, LuHistory, LuLoader, LuMenu, LuTrain, LuTrash } from "react-icons/lu";
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c

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
	const [rejectedSelected, setRejectedSelected] = useState()
	const [releasedSelected, setReleasedSelected] = useState()
<<<<<<< HEAD
=======
	const [selectedDocument, setSelectedDocument] = useState(null);
	const [generatePdf, setGeneratePdf] = useState(false);

	const handleGeneratePdfClick = () => {
		setGeneratePdf(true);
	};

>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c

	useEffect(() => {
		const fetchTableRows = async () => {
			try {
				const response = await axios.get('http://localhost:7000/document');
<<<<<<< HEAD
				const responseData = response.data;

=======

				const responseData = response.data;
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
				const documentArray = responseData.document;
				// Sort the documents by createdAt in descending order
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


<<<<<<< HEAD
	// const archiveDocuments = store.documents
	// 	.filter((document) => document.documentStatus === 'Rejected')
	// 	.sort((a, b) => b.createdAt.localCompare(a.createdAt))


	// const handleCreateNewDocument = () => {
	// 	navigate('/createDocument')
	// }
	// const handleArchive = () => {
	// 	navigate('/archive')
	// }
=======

>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
	const navigate = useNavigate()

	return (
		<Card className="h-full w-full bg-gray-100">
			<CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100">
				<div className="mb-2 flex items-center justify-between gap-8">
					<div>
						<Typography variant="h5" color="blue-gray">
							Document Archive List
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							See all information about archived documents
						</Typography>
					</div>
<<<<<<< HEAD
					{/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button className="flex items-center gap-2" size="sm" variant="outlined" color="blue-gray" onClick={handleArchive}>
							Archive
						</Button>
						<Button className="flex items-center gap-1.5" size="sm" color="blue" onClick={handleCreateNewDocument}>
							<DocumentPlusIcon strokeWidth={3} className="h-4 w-4" /> Add Document
						</Button>
					</div> */}
=======
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
				</div>
				<div className="flex mb-16 whitespace-pre flex-col items-center justify-between gap-4 md:flex-row">
					<Tabs value="all" className="w-full md:w-max">
						<TabsHeader>
							{TABS.map(({ label, value }) => (
								<Tab key={value} value={value}>
									&nbsp;&nbsp;{label}&nbsp;&nbsp;
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
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
									className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50  p-4 transition-colors hover:bg-blue-gray-50 "
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex items-center  justify-between gap-2 font-bold leading-none"
									>
										{head}{" "}
										{index !== TABLE_HEAD.length - 1 && (
											<ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
										)}
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
<<<<<<< HEAD
									createdAt
=======
									createdAt,
									header,
									subject,
									uploaderSignature,
									content,
									uploaderDesignation
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
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
													className="font-normal opacity-70"
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
<<<<<<< HEAD
												{/* <Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{email}
												</Typography> */}
=======
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
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
<<<<<<< HEAD
												{/* <Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{designation}
												</Typography> */}
=======
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
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
																	documentStatus === 'Pending' ? 'Pending' : 'Rejected'
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
<<<<<<< HEAD
											<Menu>
												<MenuHandler>
													<Button size="sm" variant="text">
														<LuMenu className="h-4 w-4" />
													</Button>
												</MenuHandler>
												<MenuList>
													<MenuItem>Edit</MenuItem>
													<MenuItem>Download</MenuItem>
													<MenuItem>Remove</MenuItem>
													<MenuItem>Track</MenuItem>
													<MenuItem>Details</MenuItem>
												</MenuList>
											</Menu>

=======
											<div className="flex gap-1.5">
												<PDFDownloadLink document={
													<Document>
														<Page size="A4" style={styles.page}>
															{/* Document Details */}
															<Text style={styles.documentDetailText}>Control No. {controlNumber + ' - ' + collegeName}</Text>
															<Text style={styles.documentDetailText}>Date: {createdAt}</Text>
															{/* Header */}
															<Text style={styles.headerText}>To: {header}</Text>

															{/* Subject */}
															<Text style={styles.subjectText}>Subject: {subject}</Text>

															{/* Content */}
															<Text style={styles.content}>
																{content}
															</Text>

															{/* Signature */}
															<Image
																src={`http://localhost:7000${uploaderSignature}`}
																style={styles.signature}
															/>

															{/* Name and Designation */}
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
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
										</td>
									</tr>
								);
							},
						)}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
<<<<<<< HEAD
				{/* <Typography variant="small" color="blue-gray" className="font-normal">
					Page 1 of 10
				</Typography>
				<div className="flex gap-2">
					<Button variant="outlined" size="sm">
						Previous
					</Button>
					<Button variant="outlined" size="sm">
						Next
					</Button>
				</div> */}
			</CardFooter>
		</Card>
=======
			</CardFooter>
		</Card>

>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
	);
}

export default ArchivePage