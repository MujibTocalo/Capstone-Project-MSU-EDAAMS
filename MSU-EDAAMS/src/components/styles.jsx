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
    marginLeft: 50,
    marginBottom: 5,
    fontWeight: "medium",
    flexDirection: 'column'
  },
  documentDate: {
    fontSize: 11.5,
    marginTop: 5,
    marginLeft: 50,
    marginBottom: 5,
    fontWeight: "medium",
    flexDirection: 'column'
  },
  headerText: {
    fontSize: 11.5,
    textIndent: 10,
    lineHeight: 2,
    marginLeft: 50,
    marginTop: 15,
    marginRight: 25,
    marginBottom: 5,
    textDecorationStyle: 'bold',
    paddingRight: 20,
    textAlign: "justify",
    wordwrap: 130
  },
  subjectText: {
    fontSize: 11.5,
    textIndent: 10,
    lineHeight: 2,
    textDecorationStyle: 'bold',
    marginLeft: 50,
    marginRight: 25,
    marginBottom: 5,
    marginTop: 10,
    paddingRight: 20,
    textAlign: "justify",
  },
  content: {
    fontSize: 11,
    marginRight: 25,
    textIndent: 20,
    textAlign: 'justify',
    marginTop: 10,
    lineHeight: 2,
    paddingRight: 20,
    marginLeft: 50,
    pageBreak: 'auto'
  },

  signature: {
    width: 100,
    height: 60,
    alignSelf: "center",
    paddingTop: 10,
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
