import ReactModal from 'react-modal';

import styles from "../components/styles";

import { PDFDownloadLink, Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import { LuDownload } from 'react-icons/lu';

const DocumentDetailsModal = ({ isOpen, onRequestClose, document }) => {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
		>
			{document && (
				<>
					<h2>Document Details</h2>
					<p>Document Type: {document.documentType}</p>
					<p>Uploader Name: {document.uploaderName}</p>
					{/* Add more details as needed */}
				</>
			)}

			{document && (
				<PDFDownloadLink
					document={
						<Document>
							<Page>
								<Text>Document Type: {document.documentType}</Text>
								<Text>Uploader Name: {document.uploaderName}</Text>
								{/* Add more PDF content here */}
							</Page>
						</Document>
					}
					fileName="Generated PDF.pdf"
				>
					{({ blob, url, loading, error }) =>
						loading ? 'Generating PDF...' : error ? 'Error generating PDF' : <LuDownload />
					}
				</PDFDownloadLink>
			)}


			{/* <PDFDownloadLink document={
				<Document>
					<Page style={styles.page}>
						<Text>
							documentType
							No.
							collegeName
							Date: createAt
							To : header
							Subject : Subject
						</Text>
						<Text>
							content
						</Text>
						<Text>
							Sincerely,
						</Text>
						<Text>Signature</Text>
						<Text>
							uploaderName
						</Text>
						<Text style={styles.signatureDesignation}>
							uploaderDesignation
						</Text>
					</Page>
				</Document>
			}
				fileName="Generated PDF.pdf"
				onClick={() => setSelectedDocument(tableRows[index])}>
				{({ blob, url, loading, error }) =>
					loading ? 'Generating PDF...' : error ? 'Error generating PDF' : <LuDownload />
				}
			</PDFDownloadLink> */}


			<button onClick={onRequestClose}>Close</button>

		</ReactModal>




	);
};

export default DocumentDetailsModal;
