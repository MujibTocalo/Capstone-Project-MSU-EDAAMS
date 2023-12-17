import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "flex-start",

  },
  documentDetailText: {
    fontSize: 11.5,
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "medium",
    flexDirection: 'column'
  },
  documentDate: {
    fontSize: 11.5,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "medium",
    flexDirection: 'column'
  },
  headerText: {
    fontSize: 11.5,
    // textIndent: 10,
    lineHeight: 2,
    marginLeft: 20,
    marginTop: 15,
    marginRight: 10,
    marginBottom: 5,
    fontWeight: "bold",
    paddingRight: 20,
    textAlign: "justify",
  },
  subjectText: {
    fontSize: 11.5,
    // textIndent: 10,
    lineHeight: 2,
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 10,
    paddingRight: 20,
    textAlign: "justify",
  },
  content: {
    fontSize: 11,
    marginRight: 10,
    textIndent: 20,
    textAlign: 'justify',
    marginTop: 10,
    lineHeight: 2,
    paddingRight: 20,
    marginLeft: 30,
    pageBreak: 'auto'
  },
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
    textDecoration: "underline",
  },
  designation: {
    fontSize: 11.5,
    textAlign: "center",
    marginLeft: 270,
  },
  footer: {
    position: "absolute",
    bottom: 50,
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
