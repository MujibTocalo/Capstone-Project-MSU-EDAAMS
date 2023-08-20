import React, { useEffect } from 'react';
import documentsStore from '../config/documentsStore';

import DocumentList from './DocumentList';
import { Typography } from '@material-tailwind/react';

const Documents = () => {
	const store = documentsStore();

	const { documents } = store;

	useEffect(() => {
		store.fetchDocuments();
	}, [store]);

	return (
		<div className='flex flex-row'>
			<div className="flex flex-row rounded-lg p-2 m-2 overflow-auto">
				{documents ? (
					documents.map((document) => (
						<DocumentList key={document._id} document={document} />
					))
				) : (
					<Typography>Loading..</Typography>
				)}
			</div>
		</div>
	);
};

export default Documents;
