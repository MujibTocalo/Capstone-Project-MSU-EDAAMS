import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-start",

  },
  documentDetailText: {
    fontSize: 11.5,
    marginTop: 40,
    marginLeft: 80,
    marginBottom: 5,
    fontWeight: "medium",
    flexDirection: 'column'
  },
  documentDate: {
    fontSize: 11.5,
    marginTop: 5,
    marginLeft: 80,
    marginBottom: 5,
    fontWeight: "medium",
    flexDirection: 'column'
  },
  headerText: {
    fontSize: 11.5,
    textIndent: 10,
    lineHeight: 2,
    marginLeft: 70,
    marginTop: 15,
    marginRight: 10,
    marginBottom: 5,
    fontWeight: "bold",
    paddingRight: 20,
    textAlign: "justify",
  },
  subjectText: {
    fontSize: 11.5,
    textIndent: 10,
    lineHeight: 2,
    fontWeight: "bold",
    marginLeft: 70,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 10,
    paddingRight: 20,
    textAlign: "justify",
  },
  content: {
    fontSize: 11,
    marginRight: 50,
    textIndent: 20,
    textAlign: 'justify',
    marginTop: 10,
    lineHeight: 2,
    paddingRight: 20,
    marginLeft: 80,
    pageBreak: 'auto'
  },
  // content: {
  //   fontSize: 11,
  //   marginRight: 50,
  //   textAlign: 'justify',
  //   marginTop: 10,
  //   lineHeight: 2,
  //   paddingRight: 20,
  //   marginLeft: 80,
  //   pageBreak: 'auto',
  //   '& > p': {
  //     // Styles for the first line of each paragraph
  //     textIndent: 20,
  //     // Additional styles for subsequent lines of each paragraph
  //     '&:not(:first-child)': {
  //       marginLeft: 0, // Adjust as needed
  //     },
  //   },
  // },

  signature: {
    width: 100,
    height: 60,
    alignSelf: "center",
    paddingTop: 15,
    marginLeft: 270,
  },

  name: {
    fontSize: 11.5,
    textAlign: "center",
    marginLeft: 270,
    textDecorationStyle: "bold",
    textDecoration: "underline",
  },
  designation: {
    fontSize: 11.5,
    textAlign: "center",
    marginLeft: 270,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "maroon",
    fontSize: 10,
  },
  ImageHeader: {
    width: "100%",
    height: 100,
  },
});

export default styles;
