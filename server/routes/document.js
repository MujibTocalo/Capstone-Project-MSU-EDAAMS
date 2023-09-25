import express from 'express'

import {
	fetchDocuments,
	fetchDocument,
	deleteDocument,
	updateDocument,
	createDocument,
	totalDocuments,
	approveDocument,
	deanApproval,
	endorseDocument,
	releaseDocument

} from '../controllers/document.js'


const documentRouter = express.Router()


documentRouter.get('/', fetchDocuments)
documentRouter.get('/:id', fetchDocument)
documentRouter.post('/createDocument', createDocument)
documentRouter.delete('/delete/:id', deleteDocument)
documentRouter.put('/:id', updateDocument)

documentRouter.get('/total', totalDocuments)

documentRouter.put('/deanApproval/:id', deanApproval)
documentRouter.put('/opApproval/:id', approveDocument)
documentRouter.put('/endorseDocument/:id', endorseDocument)
documentRouter.put('/releaseDocument/:id', releaseDocument)


export default documentRouter