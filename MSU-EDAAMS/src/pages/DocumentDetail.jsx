import { useEffect } from "react";
import documentsStore from "../config/documentsStore";

const DocumentDetail = ({ document }) => {

	const store = documentsStore();

	useEffect(() => {
		store.fetchDocuments();
	}, [store]);

	return (
		<div>
			<div key={document._id}>
				<h3>{document.collegeName}</h3>
				<h4>To: {document.header}</h4>
				<h5>Subject: {document.subject}</h5>
			</div>
		</div>
	)

}

export default DocumentDetail;