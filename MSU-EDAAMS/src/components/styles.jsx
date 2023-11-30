import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 50,

  },
  documentDetailText: {
    fontSize: 11.5,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "medium",
  },
  headerText: {
    fontSize: 11.5,
    textIndent: 1,
    lineHeight: 2,
    marginLeft: 20,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 5,
    fontWeight: "semibold",
    paddingRight: 20,
    textAlign: "justify",
  },
  subjectText: {
    fontSize: 11.5,
    textIndent: 1,
    lineHeight: 2,
    fontWeight: "semibold",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
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
    marginLeft: 250,
  },

  name: {
    fontSize: 11.5,
    textAlign: "center",
    marginLeft: 250,
    textDecoration: "underline",
  },
  designation: {
    fontSize: 11.5,
    textAlign: "center",
    marginLeft: 250,
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
