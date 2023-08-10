import React, { useEffect } from 'react'
import documentsStore from '../config/documentsStore';

import DocumentDetail from './DocumentDetail';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
} from "@material-tailwind/react";

const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: 'Chairperson',
		value: 'chairperson'
	},
	{
		label: 'Dean',
		value: 'dean'
	}, {
		label: 'OVCAA',
		value: 'ovcaa'
	},
	{
		label: 'OP',
		value: 'op'
	},
	{
		label: 'Administrator',
		value: 'admin'
	}

];

const TABLE_HEAD = ['User Type', 'Name', 'College/Office', 'Designation', 'Year', 'Status',];

const TABLE_ROWS = [
	{
		userType: 'Administrator',
		name: "Mohammad Mujib B. Tocalo",
		email: "tocalo.mb71@s.msumain.edu.ph",
		college: "CICS",
		designation: 'Student',
		year: '2019 - 2024',
		status: true,
	},
	{
		userType: 'Administrator',
		name: "Husaifa D. Dimacaling",
		email: "something@something.com",
		college: "CICS",
		designation: 'Student',
		year: '2020 - 2024',
		status: false,
	},
	{
		userType: 'OVCAA',
		name: "Suhaina K. Tamano",
		email: "something@something.com",
		college: "CICS",
		designation: 'OVCAA Special Assistant',
		year: '2010 - 2024',
		status: true,
	}
];




const ManageUsers = () => {


	return (
		<Card className='p-2 mt-2 rounded-lg bg-gray-100'>
			<CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100">
				<div className="mb-8 flex items-center justify-between gap-8">
					<div>
						<Typography variant="h5" color="blue-gray">
							User Management
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							See information about all members
						</Typography>
					</div>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button variant="outlined" color="blue-gray" size="sm">
							view all
						</Button>
						<Button className="flex items-center gap-3" color="blue" size="sm">
							<UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
						</Button>
					</div>
				</div>
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
				<table className="mt-4 w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal leading-none opacity-70"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{TABLE_ROWS.map(({ userType, name, email, college, designation, status, year }, index) => {
							const isLast = index === TABLE_ROWS.length - 1;
							const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

							return (
								<tr key={name}>
									<td className={classes}>
										<div className="flex items-center gap-3">
											<Typography variant="small" color="blue-gray" className="font-normal">
												{userType}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<div className="flex flex-col">
											<Typography variant="small" color="blue-gray" className="font-normal">
												{name}
											</Typography>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal opacity-70"
											>
												{email}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<div className="flex flex-col">
											<Typography variant="small" color="blue-gray" className="font-normal">
												{college}
											</Typography>

										</div>
									</td>
									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal"
										>
											{designation}
										</Typography>
									</td>

									<td className={classes}>
										<Typography variant="small" color="blue-gray" className="font-normal">
											{year}
										</Typography>
									</td>
									<td className={status}>
										<div className="w-max">
											<Chip
												variant="ghost"
												size="sm"
												value={status ? "Active" : "InActive"}
												color={status ? "green" : "blue-gray"}
											/>
										</div>
									</td>
									<td className={classes}>
										<Tooltip content="Edit User">
											<IconButton variant="text" color="blue-gray">
												<PencilIcon className="h-4 w-4" />
											</IconButton>
										</Tooltip>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</CardBody>
		</Card>
	);
}

export default ManageUsers