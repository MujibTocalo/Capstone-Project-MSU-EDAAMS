import { Typography } from '@material-tailwind/react'
import React from 'react'

const RestrictedPage = () => {
	return (
		<div className='flex w-screen h-screen border border-indigo-600 justify-center items-center'>
			<Typography variant='h3' className='mr-52 bg-gray-500/50 p-4 rounded-lg'>Access Restricted</Typography>
		</div>
	)
}

export default RestrictedPage