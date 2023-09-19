import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		margin: 20,
	},
	documentDetailText: {
		fontSize: 11.5,
		marginTop: 5,
		marginBottom: 5,
	},
	headerText: {
		fontSize: 11.5,
		margin: 20,
		fontWeight: 'normal',
		paddingRight: 10,

	},
	subjectText: {
		fontSize: 11.5,
		margin: 20,
		paddingRight: 10,
		marginBottom: 5
	},
	content: {
		fontSize: 11,
		padding: 10,
		margin: 20,
	},
	signature: {
		width: 100,
		height: 60,
		alignSelf: 'center',
		marginLeft: 250,

	},
	name: {
		fontSize: 11.5,
		marginBottom: 4,
		textAlign: 'center',
		marginLeft: 250,


	},
	designation: {
		fontSize: 11.5,
		textAlign: 'center',
		marginLeft: 250,

	},

});

export default styles;
