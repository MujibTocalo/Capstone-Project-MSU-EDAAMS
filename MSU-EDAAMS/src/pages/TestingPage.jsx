import React from 'react'

import { PDFDownloadLink } from '@react-pdf/renderer'
// import PDFFile from '../components/PDFFile.js'
import { Button, Typography } from '@material-tailwind/react'

const TestingPage = () => {
	return (
		<div>
			{/* <PDFDownloadLink document={<PDFFile />} fileName='FORM'>
				{({ loading }) => (loading ? <Button>'Loading document..'</Button> : <Button>'Download'</Button>)}
			</PDFDownloadLink>
			<PDFFile /> */}
			<Typography>Testing Page</Typography>
		</div>
	)
}

export default TestingPage