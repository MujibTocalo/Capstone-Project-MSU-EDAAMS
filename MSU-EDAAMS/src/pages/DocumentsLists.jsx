import {
	MagnifyingGlassIcon,
	ChevronUpDownIcon,
} from "@heroicons/react/24/outline";


import {
	Card,
	CardHeader,
	Input,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	Tooltip,
	Dialog,
	DialogHeader,
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineIcon,
	TimelineBody,
} from "@material-tailwind/react";

import { HomeIcon, BellIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

import { format } from 'date-fns'

import { useNavigate } from 'react-router-dom'
import documentsStore from "../config/documentsStore";
import { useEffect, useState } from "react";

import axios from "axios";
import { BiDetail, BiEdit, BiTrash } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import TrackDocumentContent from "../components/TrackingContent";

const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "Pending",
		value: "Pending",
	},
	{
		label: "Dean Approved",
		value: "DeanApproved",
	},
	{
		label: "Endorsed",
		value: "Endorsed",
	},
	{
		label: "OP Approved",
		value: "PresidentApproved",
	},

];

const TABLE_HEAD = ["Document Type", 'Uploader Detail', "College / Office", "Document Status", 'Date Uploaded', 'Action'];

export const DocumentsLists = () => {

	const store = documentsStore()

	const [tableRows, setTableRows] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredTableRows, setFilteredTableRows] = useState([]);
	const [isTimelineDialogOpen, setIsTimelineDialogOpen] = useState(false);

	useEffect(() => {
		const fetchTableRows = async () => {
			try {
				const response = await axios.get("http://localhost:7000/document");
				const responseData = response.data;
				const documentArray = responseData.document;
				const sortedDocuments = documentArray
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.filter(
						(document) =>
							document.documentStatus === "DeanApproved" ||
							document.documentStatus === "Endorsed" ||
							document.documentStatus === "Dean Approved" ||
							document.documentStatus === "Pending" ||
							document.documentStatus === "OP Approved"
					);

				setTableRows(sortedDocuments);
				setFilteredTableRows(sortedDocuments);
			} catch (error) {
				console.log(error);
			}
		};


		fetchTableRows();
	}, []);



	const handleTimelineClick = () => {
		setIsTimelineDialogOpen(!isTimelineDialogOpen);
	};

	const handleCreateNewDocument = () => {
		navigate('/createDocument')
	}
	const handleArchive = () => {
		navigate('/archive')
	}

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		// Filter the tableRows based on the uploader's detail (uploaderName)
		const filteredRows = tableRows.filter((row) =>
			row.uploaderName.toLowerCase().includes(query.toLowerCase())
		);

		setFilteredTableRows(filteredRows);
	};

	const navigate = useNavigate()

	return (
		<Card className="h-full w-full bg-white">
			<div>
				<Dialog
					size="md"
					open={isTimelineDialogOpen}
					handler={setIsTimelineDialogOpen}
					className="bg-white shadow-none">
					<Card
						className="mx-auto w-full">
						<CardHeader
							className="mb-4 grid h-16 place-items-center bg-indigo-800">
							<Typography variant='h4' className='text-white'>
								Document Tracking
							</Typography>
						</CardHeader>
						<CardBody
							className="flex flex-col h-96 overflow-y-scroll">
							<Timeline>
								<TimelineItem>
									<TimelineConnector />
									<TimelineHeader>
										<TimelineIcon className="p-2">
											<HomeIcon className="h-4 w-4" />
										</TimelineIcon>
										<Typography variant="h5" color="blue-gray">
											Department of Something
										</Typography>
									</TimelineHeader>
									<TimelineBody className="pb-8">
										<Typography color="gray" className="font-normal text-gray-600">
											Date Uploaded: <br />
											Uploaded By:
										</Typography>
									</TimelineBody>
								</TimelineItem>
								<TimelineItem>
									<TimelineConnector />
									<TimelineHeader>
										<TimelineIcon className="p-2">
											<HomeIcon className="h-4 w-4" />
										</TimelineIcon>
										<Typography variant="h5" color="blue-gray">
											College of Something
										</Typography>
									</TimelineHeader>
									<TimelineBody className="pb-8">
										<Typography color="gray" className="font-normal text-gray-600">
											Date Approved By Dean: <br />
											Approved By:
										</Typography>
									</TimelineBody>
								</TimelineItem>
								<TimelineItem>
									<TimelineConnector />
									<TimelineHeader>
										<TimelineIcon className="p-2">
											<BellIcon className="h-4 w-4" />
										</TimelineIcon>
										<Typography variant="h5" color="blue-gray">
											Office of Vice Chancellor for Academic Affairs
										</Typography>
									</TimelineHeader>
									<TimelineBody className="pb-8">
										<Typography color="gray" className="font-normal text-gray-600">
											Date Endorsed: <br />
											Endorsed By:
										</Typography>
									</TimelineBody>
								</TimelineItem>
								<TimelineItem>
									<TimelineConnector />
									<TimelineHeader>
										<TimelineIcon className="p-2">
											<BellIcon className="h-4 w-4" />
										</TimelineIcon>
										<Typography variant="h5" color="blue-gray">
											Office of the President
										</Typography>
									</TimelineHeader>
									<TimelineBody className="pb-8">
										<Typography color="gray" className="font-normal text-gray-600">
											Date Approved: <br />
											Approved By:
										</Typography>
									</TimelineBody>
								</TimelineItem>
								<TimelineItem>
									<TimelineHeader>
										<TimelineIcon className="p-2">
											<CurrencyDollarIcon className="h-4 w-4" />
										</TimelineIcon>
										<Typography variant="h5" color="blue-gray">
											Pending for Release
										</Typography>
									</TimelineHeader>
									<TimelineBody>
									</TimelineBody>
								</TimelineItem>
							</Timeline>
						</CardBody>
						<CardFooter className="flex border bg-indigo-50/50 rounded-lg p-1 w-full mx-auto">
							<Button className="flex mx-auto hover:scale-105"
								variant="text"
								size='lg'
								onClick={handleTimelineClick}
							>Close</Button>
						</CardFooter>
					</Card>
				</Dialog>
			</div>
			<CardHeader floated={false} shadow={false} className="rounded-none bg-white">
				<div className="flex items-center justify-between gap-8">
					<div>
						<Typography variant="h4" color="blue-gray">
							Document List
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							See all information about documents
						</Typography>
					</div>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<div className="flex gap-2">
							<Button className="flex gap-2 hover:scale-105" color="indigo" onClick={handleCreateNewDocument}>
								<HiOutlineDocumentAdd size={16} /> Add Document
							</Button>
						</div>
						<div className="w-full md:w-72">
							<Input
								label="Search"
								icon={<MagnifyingGlassIcon className="h-5 w-5" />}
								onChange={handleSearch}
								value={searchQuery}
							/>
						</div>
					</div>
				</div>
				<div className="flex mb-16 whitespace-pre flex-col items-center justify-between gap-4 md:flex-row">
					{/* <Tabs value="all" className="w-full md:w-max">
						<TabsHeader>
							{TABS.map(({ label, value }) => (
								<Tab key={value} value={value}>
									&nbsp;&nbsp;{label}&nbsp;&nbsp;
								</Tab>
							))}
						</TabsHeader>
					</Tabs> */}
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="w-full min-w-max table-auto">
					<thead>
						<tr>
							{TABLE_HEAD.map((head, index) => (
								<th
									key={head}
									className="border-y border-blue-gray-100 bg-indigo-50/50 p-4 transition-colors sticky -top-8 "
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex items-center justify-between gap-2 font-bold leading-none"
									>
										{head}{" "}
										{index !== TABLE_HEAD.length - 1}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredTableRows.map(
							(
								{
									documentType,
									uploaderName,
									uploaderDesignation,
									controlNumber,
									documentStatus,
									collegeName,
									createdAt
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
													className="font-medium"
												>
													{documentType}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-80"
												>
													Control No. {controlNumber}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col gap-1.5">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-medium"
												>
													{uploaderName}
												</Typography>

												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{uploaderDesignation}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col text-start">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-bold"
												>
													{collegeName}
												</Typography>
												{/* <Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{designation}
												</Typography> */}
											</div>
										</td>
										<td className={classes}>
											<div className="flex w-max">
												<Chip
													variant="ghost"
													size="md"
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
												className="font-medium"
											>
												{format(new Date(createdAt), 'yyyy-MM-dd')}
											</Typography>
										</td>
										<td className={classes}>
											<div className="flex gap-1 cursor-pointer">
												<BsCardChecklist size={20} onClick={handleTimelineClick} />

												<BiDetail size={20} />
												<BiEdit size={20} />
												<BiTrash size={20} />

											</div>


										</td>
									</tr>
								);
							},
						)
						}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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

	);
}