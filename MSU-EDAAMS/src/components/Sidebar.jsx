import React, { useState } from 'react'

import MSULogo from '../assets/msulogo.png'
import CICSLogo from '../assets/CICS_Logo.png'


import { LuFilePlus2 } from 'react-icons/lu'
import { TiThMenuOutline } from 'react-icons/ti'
import { RiDashboardLine, RiAttachment2 } from 'react-icons/ri'
import { HiOutlineDocumentText, HiOutlineUsers } from 'react-icons/hi'
import { BsArchive, BsFillClipboardCheckFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'

const Sidebar = () => {

  const menus = [
    { name: 'Dashboard', link: '/dashboard', icon: RiDashboardLine },
    { name: 'Documents', link: '/documents', icon: HiOutlineDocumentText },
    { name: 'Create Document', link: '/createdocument', icon: LuFilePlus2 },
    { name: 'Approve Document', link: '/approvedocument', icon: BsFillClipboardCheckFill },
    { name: 'Endorse Document', link: '/endorsedocument', icon: RiAttachment2 },
    { name: 'Release Document', link: '/releasedocument', icon: HiOutlineDocumentText },
    { name: 'Archive', link: '/archive', icon: BsArchive },
    { name: 'Manage Users', link: '/manageusers', icon: HiOutlineUsers },
    { name: 'Logout', link: '/', icon: BiLogOut },
  ]

  const [open, setOpen] = useState(true)

  return (
    <div  >
      <div className={`bg-deep-purple-900 h-screen ${open ? 'w-56' : 'w-14'} duration-500 text-white px-2`}>
        <div className='py-4 flex justify-end'>
          <h1 className={`${!open && 'hidden'} mx-auto whitespace-pre font-semibold text-lg 0.5s ease-in-out`}>MSU EDAAMS</h1>
          <TiThMenuOutline size={26} className='cursor-pointer mr-1.5' onClick={() => setOpen(!open)} />
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
              <Typography className={`${open && 'hidden'} absolute  text-sm left-24 bg-deep-purple-800 whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                {menu?.name}
              </Typography>
            </Link>

          ))}
        </div>
      </div>
    </div >
  )
}

export default Sidebar;
