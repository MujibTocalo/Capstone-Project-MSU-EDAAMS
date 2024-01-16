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
import elogo from '../assets/edaams.png'


const Sidebar = ({ isOpen, toggleSidebar }) => {

  const [userType, setUserType] = useState();

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    setUserType(userDetail.userType);
  }, []);

  const menus = [
    { name: 'Pending Documents', link: '/documents', icon: HiOutlineDocumentText, roles: ['Uploader', 'Approver - Dean', 'Endorser - OVCAA', 'Approver - OP', 'Administrator', 'Releaser'] },
    { name: 'College Dean', link: '/deanEndorsement', icon: LuClipboardCheck, roles: ['Approver - Dean', 'Administrator'] },
    { name: 'OVCAA', link: '/ovcaaEndorsement', icon: RiAttachment2, roles: ['Endorser - OVCAA', 'Administrator'] },
    { name: 'Office of the President', link: '/opapproval', icon: HiOutlineDocumentText, roles: ['Approver - OP', 'Administrator'] },
    { name: 'RMO', link: '/releasedocument', icon: HiUpload, roles: ['Administrator', 'Releaser'] },
    { name: 'Document Archive', link: '/archive', icon: HiOutlineArchive, roles: ['Administrator', 'Releaser'] },
    { name: 'Users', link: '/manageusers', icon: HiOutlineUsers, roles: ['Administrator'] },
    { name: 'Logout', link: '/', icon: BiLogOut, roles: ['Uploader', 'Approver - Dean', 'Endorser - OVCAA', 'Approver - OP', 'Administrator', 'Releaser'] },
  ];

  const filteredMenus = menus.filter(menu => menu.roles.includes(userType));


  return (
    <div className={`flex flex-col ${isOpen ? 'opacity-100' : '3s ease-in-out -translate-x-64'} bg-white  transition-all duration-500`} >
      <div className={`h-screen ${isOpen ? 'w-64' : 'w-0'} bg-[#182440] duration-500 p-1 transition-all`}>
        <img src={elogo} alt='edaams logo' className='flex  w-28 p-4 -translate-x-6 -translate-y-4' />
        <div className='py-2 flex flex-col duration-500 m-4 justify-between gap-2'>
          <div className='flex flex-col rounded-lg p-2 bg-[#7b7b995f] -translate-y-14'>
            <Typography className={`${!open && 'hidden'} flex 3s ease-in-out text-white text-start cursor-default rounded-lg whitespace-pre font-bold text-md ml-2`}>
              EDAAMS</Typography>
            <Typography className='flex ml-2 text-xs text-gray-300'>
              MSU - Marawi
            </Typography>
          </div>

          {/* < TiThMenuOutline size={23} className={`${!open && 'flex ml-2'} flex mr-2.5 cursor-pointer transition`} onClick={() => setOpen(!open)} /> */}
        </div>
        <div className='mt-4 border-t pt-6 border-gray-800 p-2 flex flex-col gap-3 -translate-y-12 relative'>
          {filteredMenus?.map((menu, i) => (
            <Link to={menu?.link} key={i} className='group flex items-center text-white text-sm gap-5 font-medium p-1 ml-3  rounded-lg hover:scale-105'>
              <div>
                {React.createElement(menu?.icon, { size: '24' })}
              </div>
              <Typography
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre text-sm font-semibold duration-500 ${!isOpen && 'opacity-0 translate-x-28 overflow-hidden'}`}>
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
