import React, { useEffect, useState } from 'react'
import documentsStore from '../config/documentsStore'

const EndorseDocument = () => {

	const store = documentsStore()

	const [endorserName, setEndorserName] = useState()


	const handleEndorserName = (userDetail) => {
		const EndorserFirstName = userDetail.firstName;
		const EndorserLastName = userDetail.lastName;

		setEndorserName(EndorserFirstName + ' ' + EndorserLastName)
	};


	useEffect(() => {
		store.fetchDocuments()
		const userDetail = JSON.parse(localStorage.getItem('userDetails'));
	}, [store])

	return (
		<div>EndorseDocument</div>
	)
}

export default EndorseDocument