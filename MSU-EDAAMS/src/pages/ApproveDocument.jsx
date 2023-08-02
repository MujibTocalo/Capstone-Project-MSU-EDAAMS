import React from 'react'

import DocumentDetail from './DocumentDetail'

const ApproveDocument = () => {

	const store = documentsStore()

	useEffect(() => {
		store.fetchDocuments()
	})

	return (
		<div>ApproveDocument</div>
	)
}

export default ApproveDocument