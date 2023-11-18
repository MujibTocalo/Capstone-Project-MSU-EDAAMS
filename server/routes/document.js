import express from 'express'

import {
	fetchDocuments,
	fetchDocument,
	deleteDocument,
	updateDocument,
	createDocument,
	totalDocuments,
	deanEndorsement,
	ovcaaEndorsement,
} from '../controllers/document.js'


const documentRouter = express.Router()


documentRouter.get('/', fetchDocuments)
documentRouter.get('/:id', fetchDocument)
documentRouter.post('/createDocument', createDocument)
documentRouter.delete('/delete/:id', deleteDocument)
documentRouter.put('/:id', updateDocument)

documentRouter.get('/total', totalDocuments)

documentRouter.put('/deanEndorsement/:id', deanEndorsement)
documentRouter.put('/ovcaaEndorsement/:id', ovcaaEndorsement)

// documentRouter.put('/deanApproval/:id', deanApproval)
// documentRouter.put('/opApproval/:id', approveDocument)
// documentRouter.put('/endorseDocument/:id', endorseDocument)
// documentRouter.put('/releaseDocument/:id', releaseDocument)


export default documentRouter