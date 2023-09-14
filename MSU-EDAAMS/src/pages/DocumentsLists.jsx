import {
	MagnifyingGlassIcon,
	ChevronUpDownIcon,
	DocumentPlusIcon,
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
import { LuMenu } from "react-icons/lu";

import axios from "axios";

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

const TABLE_HEAD = ["Document Type", 'User Detail', "College/Office", "Document Status", 'Date Uploaded', 'Action'];

export const DocumentsLists = () => {

	const store = documentsStore()

	const [tableRows, setTableRows] = useState([])

	useEffect(() => {
		const fetchTableRows = async () => {
			try {
				const response = await axios.get('http://localhost:7000/document');
				const responseData = response.data;
				const documentArray = responseData.document;
				// console.log(documentArray);
				// Sort the documents by createdAt in descending order
				const sortedDocuments = documentArray.sort((a, b) =>
					new Date(b.createdAt) - new Date(a.createdAt)
				);

				setTableRows(sortedDocuments);
			} catch (error) {

			}
		};

		fetchTableRows();
	}, [store]);



	const handleCreateNewDocument = () => {
		navigate('/createDocument')
	}
	const handleArchive = () => {
		navigate('/archive')
	}
	const navigate = useNavigate()

	return (
		<Card className="h-full w-full bg-gray-100">
			<CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100">
				<div className="mb-2 flex items-center justify-between gap-8">
					<div>
						<Typography variant="h5" color="blue-gray">
							Document List
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							See all information about documents
						</Typography>
					</div>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button className="flex items-center gap-2" size="sm" variant="outlined" color="blue-gray" onClick={handleArchive}>
							Archive
						</Button>
						<Button className="flex items-center gap-1.5" size="sm" color="blue" onClick={handleCreateNewDocument}>
							<DocumentPlusIcon strokeWidth={3} className="h-4 w-4" /> Add Document
						</Button>
					</div>
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
												{/* <Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{email}
												</Typography> */}
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
											<Menu>
												<MenuHandler>
													{/* <Tooltip content="Manage Document">
														<IconButton variant="text">
															<LuMenu className="h-4 w-4" />
														</IconButton>
													</Tooltip> */}
													<Button size="sm" variant="text">
														<LuMenu className="h-4 w-4" />
													</Button>
												</MenuHandler>
												<MenuList>
													<MenuItem>Edit</MenuItem>
													<MenuItem>Remove</MenuItem>
													<MenuItem>Track</MenuItem>
												</MenuList>
											</Menu>

										</td>
									</tr>
								);
							},
						)}
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