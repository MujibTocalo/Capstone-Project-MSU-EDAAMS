import express from 'express'

import {
	fetchDocuments,
	fetchDocument,
	deleteDocument,
	updateDocument,
	createOrUpdateDocument,
	totalDocuments,
	deanEndorsement,
	ovcaaEndorsement,
	approveDocument,
	releaseDocument
} from '../controllers/document.js'


const documentRouter = express.Router()


documentRouter.get('/', fetchDocuments)
documentRouter.get('/:id', fetchDocument)
documentRouter.put('/updateDocument/:id', updateDocument)
documentRouter.post('/createDocument', createOrUpdateDocument)
documentRouter.delete('/delete/:id', deleteDocument)
// documentRouter.put('/:id', updateDocument)

documentRouter.get('/total', totalDocuments)

documentRouter.put('/deanEndorsement/:id', deanEndorsement)
documentRouter.put('/ovcaaEndorsement/:id', ovcaaEndorsement)
documentRouter.put('/approveDocument/:id', approveDocument)


// documentRouter.put('/deanApproval/:id', deanApproval)
// documentRouter.put('/opApproval/:id', approveDocument)
// documentRouter.put('/endorseDocument/:id', endorseDocument)
documentRouter.put('/releaseDocument/:id', releaseDocument)


export default documentRouter