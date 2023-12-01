import React, { useEffect, useState } from 'react'

import MSULogo from '../assets/msulogo.png'
import CICSLogo from '../assets/CICS_Logo.png'

import { TiThMenuOutline } from 'react-icons/ti'
import { RiDashboardLine, RiAttachment2, RiNotification3Line } from 'react-icons/ri'
import { HiOutlineArchive, HiOutlineDocumentText, HiOutlineUsers, HiUpload } from 'react-icons/hi'
import { BiLogOut, } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Avatar, Typography } from '@material-tailwind/react'
import { LuClipboardCheck } from 'react-icons/lu'


const Sidebar = ({ isOpen, toggleSidebar }) => {

  const menus = [
    // { name: 'Dashboard', link: '/dashboard', icon: RiDashboardLine },
    { name: 'Documents', link: '/documents', icon: HiOutlineDocumentText },
    { name: 'Dean Endorsement', link: '/deanEndorsement', icon: LuClipboardCheck },
    { name: 'OVCAA Endorsement', link: '/ovcaaEndorsement', icon: RiAttachment2 },
    { name: 'OP Approval', link: '/opapproval', icon: HiOutlineDocumentText },
    { name: 'Releasing Document', link: '/releasedocument', icon: HiUpload },
    { name: 'Archive', link: '/archive', icon: HiOutlineArchive },
    { name: 'Manage Users', link: '/manageusers', icon: HiOutlineUsers },
    { name: 'Logout', link: '/', icon: BiLogOut },

  ]


  return (
    <div className={`flex flex-col ${isOpen ? 'w-52 opacity-100' : 'w-0 opacity-0'} bg-white duration-500`} style={{ zIndex: 1, position: 'relative' }}>
      <div className={`h-screen ${isOpen ? 'w-52' : 'w-12'} bg-gray-100 duration-500 p-1`}>
        {/* <div className='py-4 flex duration-500 justify-between'> */}
        {/* <Avatar className='flex h-6 w-6 border rounded-none ml-2' /> */}
        {/* <h1 className={`${!open && '0.5s ease-in-out hidden'} flex 3s ease-in-out mx-auto whitespace-pre font-semibold text-lg `}>MSU EDAAMS</h1>
        < TiThMenuOutline size={23} className={`${!open && 'flex ml-2'} flex mr-2.5 cursor-pointer transition`} onClick={() => setOpen(!open)} />
      </div> */}
        <div className='mt-4 flex flex-col gap-3 relative'>
          {menus?.map((menu, i) => (
            <Link to={menu?.link} key={i} className='group flex items-center text-sm gap-3.5 font-medium p-2 hover:border hover:border-gray-400/50 hover:bg-gray-100 rounded-lg hover:scale-110'>
              <div>
                {React.createElement(menu?.icon, { size: '24' })}
              </div>
              <Typography
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre text-sm duration-500 ${!isOpen && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                {menu?.name}
              </Typography>
              <Typography className={`${isOpen && 'hidden'} absolute text-sm left-24 bg-indigo-900 whitespace-pre text-white rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                {menu?.name}
              </Typography>
            </Link>

          ))}
        </div>
      </div>
      {/* <div className='flex flex-col mt-5 bg-indigo-1000 text-white items-center duration-500 p-2'>
        <UserCircleIcon className='h-10 w-10' />
        <div className={`flex flex-col items-center whitespace-pre p-2 ${open ? 'relative' : 'inherent'}`}>
          <Typography className={`flex text-base font-semibold justify-center ${!open && ' hidden'} ease-in-out`}>
            {currentUser}
          </Typography>
          <Typography className={`flex text-sm font-normal justify-center ${!open && 'hidden'} ease-in-out`}>
            {userDesignation}
          </Typography>
        </div>
      </div> */}
    </div >
  )
}

export default Sidebar;
