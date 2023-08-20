import { create } from 'zustand'
import axios from 'axios'

const documentsStore = create((set, get) => ({
	documents: null,

	fetchExecuted: false, // flag to track whether fetchDocuments has been executed before

	fetchDocuments: async () => {
		if (!get().fetchExecuted) { // execute only once before waiting for new document creation
			const res = await axios.get('http://localhost:7000/document')
			set({ documents: res.data.document })
			set({ fetchExecuted: true }) // set flag after first execution
		}
	},

	fetchTableRows: async () => {
		if (!get().fetchExecuted) { // execute only once before waiting for new document creation
			const res = await axios.get('http://localhost:7000/document')
			set({ documents: res.data.document })
			set({ fetchExecuted: true }) // set flag after first execution
		}
	},


	deleteDocument: async (_id) => {
		await axios.delete(`http://localhost:7000/document/delete/${_id}`)

		const { documents } = documentsStore.getState()

		const newDocuments = documents.filter((document) => {
			return document._id !== _id
		})
		console.log("Document Deleted Successfully")

		set({ documents: newDocuments })
	},


}))

export default documentsStore