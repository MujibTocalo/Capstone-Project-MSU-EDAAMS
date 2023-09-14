import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		alignItems: 'start',
		margin: 20,
	},
	documentDetailText: {
		fontSize: 12,
		marginTop: 10,
		marginBottom: 10,
	},
	headerText: {
		fontSize: 12,
		marginTop: 10,
		fontWeight: 'normal',
		marginBottom: 20,
	},
	subjectText: {
		fontSize: 12,
		marginTop: 5,
		marginBottom: 10,
	},
	content: {
		fontSize: 11,
		margin: 20,
	},
	signature: {
		width: 100, // Set the width of the signature image
		height: 60, // Set the height of the signature image
		alignSelf: 'flex-end',
		marginRight: 120
	},
	name: {
		fontSize: 12,
		marginRight: 95,
		marginBottom: 5,
		textAlign: 'right',
	},
	designation: {
		fontSize: 12,
		marginRight: 120,
		textAlign: 'right',
	},

});

export default styles;
