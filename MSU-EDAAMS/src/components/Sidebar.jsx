import React, { useEffect, useState } from 'react'

import MSULogo from '../assets/msulogo.png'
import CICSLogo from '../assets/CICS_Logo.png'


import { LuFilePlus2 } from 'react-icons/lu'
import { TiThMenu } from 'react-icons/ti'
import { RiDashboardLine, RiAttachment2 } from 'react-icons/ri'
import { HiOutlineCheck, HiOutlineDocumentText, HiOutlineUsers } from 'react-icons/hi'
import { BsArchive, BsFillClipboardCheckFill, BsLine } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { UserIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const Sidebar = () => {

  const [currentUser, setCurrentUser] = useState()
  const [userDesignation, setUserDesignation] = useState()

  const handleCurrentUser = (userDetail) => {
    setCurrentUser(userDetail.firstName + ' ' + userDetail.lastName)
    setUserDesignation(userDetail.designation)
  }

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem('userDetails'))
    handleCurrentUser(userDetail)
  })


  const menus = [
    { name: 'Dashboard', link: '/dashboard', icon: RiDashboardLine },
    { name: 'Documents', link: '/documents', icon: HiOutlineDocumentText },
    // { name: 'Create Document', link: '/createdocument', icon: LuFilePlus2 },
    { name: 'Approve Document', link: '/approvedocument', icon: BsFillClipboardCheckFill },
    { name: 'Endorse Document', link: '/endorsedocument', icon: RiAttachment2 },
    { name: 'OP Approval', link: '/opapproval', icon: HiOutlineDocumentText },
    // { name: 'Archive', link: '/archive', icon: BsArchive },
    { name: 'Manage Users', link: '/manageusers', icon: HiOutlineUsers },
    { name: 'Logout', link: '/', icon: BiLogOut },

  ]

  const [open, setOpen] = useState(true)

  return (
<<<<<<< HEAD
    <div  >
=======
    <div className='flex flex-col bg-[#0C356A] duration-500 justify-evenly'>
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
      <div className={` bg-[#0C356A] h-screen ${open ? 'w-56' : 'w-14'} duration-500 text-white px-2`}>
        <div className='py-4 flex justify-end'>
          <h1 className={`${!open && 'hidden'} mx-auto whitespace-pre font-semibold text-lg 0.5s ease-in-out`}>MSU EDAAMS</h1>
          <TiThMenu size={26} className='cursor-pointer mr-1.5' onClick={() => setOpen(!open)} />
        </div>
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
              <Typography className={`${open && 'hidden'} absolute  text-sm left-24 bg-[#512B81] whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                {menu?.name}
              </Typography>
            </Link>

          ))}

<<<<<<< HEAD
          <div className='flex flex-col items-center mt-4 rounded-lg p-2.5'>
=======
          {/* <div className='flex flex-col items-center mt-4 rounded-lg p-2.5'>
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
            <UserCircleIcon size='lg' className='h-8 w-8' />
            <div className={`flex flex-col items-center whitespace-pre p-2 ${open ? 'relative' : 'inherent'}`}>
              <Typography className={`flex text-base font-semibold justify-center ${!open && ' hidden'} ease-in-out`}>
                {currentUser}
              </Typography>
              <Typography className={`flex text-sm font-normal justify-center ${!open && 'hidden'} ease-in-out`}>
                {userDesignation}
              </Typography>
            </div>
<<<<<<< HEAD
          </div>

=======
          </div> */}

        </div>
      </div>
      <div className='flex flex-col bg-[#0C356A] text-white items-center duration-500 p-2'>
        <UserCircleIcon className='h-10 w-10' />
        <div className={`flex flex-col items-center whitespace-pre p-2 ${open ? 'relative' : 'inherent'}`}>
          <Typography className={`flex text-base font-semibold justify-center ${!open && ' hidden'} ease-in-out`}>
            {currentUser}
          </Typography>
          <Typography className={`flex text-sm font-normal justify-center ${!open && 'hidden'} ease-in-out`}>
            {userDesignation}
          </Typography>
>>>>>>> e0404d7e18913301b0a8160380006c729f8dd58c
        </div>
      </div>
    </div >
  )
}

export default Sidebar;
