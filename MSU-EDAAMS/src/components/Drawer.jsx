import React, { useEffect, useState } from 'react'
import {
	Drawer,
	Button,
	Typography,
	IconButton,
} from "@material-tailwind/react";

import { LuFilePlus2 } from 'react-icons/lu'
import { TiThMenu } from 'react-icons/ti'
import { RiDashboardLine, RiAttachment2 } from 'react-icons/ri'
import { HiOutlineCheck, HiOutlineDocumentText, HiOutlineUsers, HiUpload } from 'react-icons/hi'
import { BsArchive, BsFillClipboardCheckFill, BsLine } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export function DrawerDefault() {
	const [open, setOpen] = React.useState(false);
	const [currentUser, setCurrentUser] = useState()
	const [userDesignation, setUserDesignation] = useState()

	const menus = [
		{ name: 'Dashboard', link: '/dashboard', icon: RiDashboardLine },
		{ name: 'Documents', link: '/documents', icon: HiOutlineDocumentText },
		// { name: 'Create Document', link: '/createdocument', icon: LuFilePlus2 },
		{ name: 'Approve Document', link: '/approvedocument', icon: BsFillClipboardCheckFill },
		{ name: 'Endorse Document', link: '/endorsedocument', icon: RiAttachment2 },
		{ name: 'OP Approval', link: '/opapproval', icon: HiOutlineDocumentText },
		// { name: 'Archive', link: '/archive', icon: BsArchive },
		{ name: 'Releasing', link: '/release', icon: HiUpload },
		{ name: 'Manage Users', link: '/manageusers', icon: HiOutlineUsers },
		{ name: 'Logout', link: '/', icon: BiLogOut },

	]

	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

	return (
		<React.Fragment>
			<Button onClick={openDrawer}>Open Drawer</Button>
			<Drawer open={open} onClose={closeDrawer} className="p-4 flex-col bg-[#0C356A] duration-500">
				<div className='flex flex-row justify-between p-2'>
					<Typography variant="h5" color="white">
						MSU-EDAAMS
					</Typography>
					<IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-5 w-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</IconButton>
				</div>

				<div className="flex-col mb-6 items-start justify-evenly">
					<div className=''>
						<div className={`items-start h-screen duration-500 text-white`}>
							<div className='mt-4 flex flex-col gap-4 relative'>
								{menus?.map((menu, i) => (
									<Link to={menu?.link} key={i} className='group flex items-center text-sm gap-3.5 fbg-[#23074d]ont-medium p-2 hover:border rounded-lg'>
										<div>
											{React.createElement(menu?.icon, { size: '24' })}
										</div>
										<Typography
											style={{
												transitionDelay: `${i + 3}00ms`,
											}}
											className={`whitespace-pre text-sm duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>
											{menu?.name}</Typography>

									</Link>

								))}
							</div>
						</div>
					</div>
				</div>

			</Drawer>
		</React.Fragment>
	);
}