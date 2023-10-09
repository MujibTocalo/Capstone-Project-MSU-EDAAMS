import React, { useEffect, useState } from 'react'

import MSULogo from '../assets/msulogo.png'
import CICSLogo from '../assets/CICS_Logo.png'

import { TiThMenuOutline } from 'react-icons/ti'
import { RiDashboardLine, RiAttachment2, RiNotification3Line } from 'react-icons/ri'
import { HiOutlineArchive, HiOutlineDocumentText, HiOutlineUsers, HiUpload } from 'react-icons/hi'
import { BiLogOut, } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { LuClipboardCheck } from 'react-icons/lu'


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
    { name: 'Document', link: '/documents', icon: HiOutlineDocumentText },
    { name: 'Approve Document', link: '/approvedocument', icon: LuClipboardCheck },
    { name: 'Endorse Document', link: '/endorsedocument', icon: RiAttachment2 },
    { name: 'OP Approval', link: '/opapproval', icon: HiOutlineDocumentText },
    { name: 'Releasing Document', link: '/releasedocument', icon: HiUpload },
    { name: 'Archive', link: '/archive', icon: HiOutlineArchive },
    { name: 'Manage Users', link: '/manageusers', icon: HiOutlineUsers },
    { name: 'Logout', link: '/', icon: BiLogOut },

  ]

  const [open, setOpen] = useState(true)

  return (
    <div className='flex flex-col overflow-auto bg-indigo-900 duration-500'>
      <div className={`h-screen ${open ? 'w-56' : 'w-14'} duration-500 text-white p-2`}>
        <div className='py-4 flex duration-500 justify-between'>
          <h1 className={`${!open && 'hidden'} whitespace-pre font-semibold text-md 0.5s ease-in-out ml-2.5`}>MSU EDAAMS</h1>
          <div className='flex'>
            <RiNotification3Line size={23} className={`${!open && 'hidden'} cursor-pointer mr-2`} />
            < TiThMenuOutline size={23} className={`${!open && 'ml-2'} mr-3 cursor-pointer `} onClick={() => setOpen(!open)} />
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-4 relative'>
          {menus?.map((menu, i) => (
            <Link to={menu?.link} key={i} className='group flex items-center text-sm gap-3.5 font-medium p-2 hover:border rounded-lg'>
              <div>
                {React.createElement(menu?.icon, { size: '24' })}
              </div>
              <Typography
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre text-sm duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                {menu?.name}</Typography>
              {/* <Typography className={`${open && 'hidden'} absolute  text-sm left-24 bg-[#512B81] whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                {menu?.name}
              </Typography> */}
            </Link>

          ))}
        </div>
      </div>
      <div className='flex flex-col bg-indigo-1000 text-white items-center duration-500 p-2'>
        <UserCircleIcon className='h-10 w-10' />
        <div className={`flex flex-col items-center whitespace-pre p-2 ${open ? 'relative' : 'inherent'}`}>
          <Typography className={`flex text-base font-semibold justify-center ${!open && ' hidden'} ease-in-out`}>
            {currentUser}
          </Typography>
          <Typography className={`flex text-sm font-normal justify-center ${!open && 'hidden'} ease-in-out`}>
            {userDesignation}
          </Typography>
        </div>
      </div>
    </div >
  )
}

export default Sidebar;
