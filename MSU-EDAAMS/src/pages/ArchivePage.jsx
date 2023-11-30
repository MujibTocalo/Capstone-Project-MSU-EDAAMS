import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  DocumentPlusIcon,
  DocumentChartBarIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { HomeIcon, BellIcon } from "@heroicons/react/24/solid";

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
  View,
  PDFViewer,
  Line,
} from "@react-pdf/renderer";
import imageHeader from "../assets/ImageHeader.jpg";
import styles from "../components/styles";
import { convert } from 'html-to-text';


import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tooltip,
  Dialog,
  DialogHeader,
  Timeline,
  Tabs,
  Tab,
  TabsHeader,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@material-tailwind/react";

import { format } from 'date-fns'
import html2pdf from 'html2pdf.js';

import { useNavigate } from "react-router-dom";
import documentsStore from "../config/documentsStore";
import { useEffect, useState } from "react";
import {
  LuDownload,
  LuEdit,
  LuHistory,
  LuLoader,
  LuTrash,
} from "react-icons/lu";

import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BsCardChecklist } from "react-icons/bs";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Released",
    value: "Released",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
];

const TABLE_HEAD = [
  "Document Type",
  "User Detail",
  "College/Office",
  "Document Status",
  "Date Uploaded",
  "Action",
];
const ArchivePage = () => {
  const store = documentsStore();

  const [tableRows, setTableRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTableRows, setFilteredTableRows] = useState([]);
  const [isTimelineDialogOpen, setIsTimelineDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(false);

  useEffect(() => {
    const fetchTableRows = async () => {
      try {
        const response = await axios.get("http://localhost:7000/document");

        const responseData = response.data;
        const documentArray = responseData.document;

        const sortedDocuments = documentArray
          .filter(
            (document) =>
              document.documentStatus === "Rejected" ||
              document.documentStatus === "Released"
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Populate tableRows with the fetched data
        setTableRows(sortedDocuments);
        setFilteredTableRows(sortedDocuments); // Set filteredTableRows initially
      } catch (error) {
        console.log(error);
      }
    };

    fetchTableRows();
  }, [store]);

  const handleTimelineClick = (index) => {
    const selectedDocument = tableRows[index];
    setSelectedDocument(selectedDocument);
    setIsTimelineDialogOpen(!isTimelineDialogOpen);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the tableRows based on the uploader's detail (uploaderName)
    const filteredRows = tableRows.filter((row) =>
      row.uploaderName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredTableRows(filteredRows);
  };


  const convertHtmlToText = (htmlContent) => {
    // Specify options if needed, see the html-to-text documentation for details
    const options = {
      wordwrap: 130
    };
    return convert(htmlContent, options);
  };


  const navigate = useNavigate();

  return (
    <Card className="h-screen w-screen rounded-none bg-white">

      <Dialog
        size="md"
        open={isTimelineDialogOpen}
        handler={setIsTimelineDialogOpen}
        className="bg-white shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardHeader className="mb-4 grid h-16 place-items-center bg-indigo-800">
            <Typography variant="h4" className="text-white">
              Document Tracking
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col h-96 overflow-y-scroll">
            {selectedDocument && (
              <Timeline>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineIcon className="p-2">
                      <HomeIcon className="h-4 w-4" />
                    </TimelineIcon>
                    <Typography variant="h6" color="blue-gray">
                      {selectedDocument.uploaderDesignation}{" "}
                      {selectedDocument.documentType}
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      color="gray"
                      className="font-normal text-sm text-gray-600"
                    >
                      Date Uploaded:{" "}
                      {selectedDocument.createdAt
                        ? format(
                          new Date(selectedDocument.createdAt),
                          "yyyy-MM-dd"
                        )
                        : "Waiting"}{" "}
                      <br />
                      Uploaded By:{" "}
                      {selectedDocument.uploaderName
                        ? selectedDocument.uploaderName
                        : "Pending"}{" "}
                      <br />
                      Remarks:{" "}
                      {selectedDocument.remarks
                        ? selectedDocument.remarks
                        : ""}
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineIcon className="p-2">
                      <BellIcon className="h-4 w-4" />
                    </TimelineIcon>
                    <Typography variant="h6" color="blue-gray">
                      {selectedDocument.collegeName} Dean
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      color="gray"
                      className="font-normal text-sm text-gray-600"
                    >
                      Date Approved:{" "}
                      {selectedDocument.deanEndorsementDate
                        ? format(
                          new Date(selectedDocument.deanEndorsementDate),
                          "yyyy-MM-dd"
                        )
                        : "Waiting"}{" "}
                      <br />
                      Approved By:{" "}
                      {selectedDocument.deanName
                        ? selectedDocument.deanName
                        : "Pending"}{" "}
                      <br />
                      Remarks:{" "}
                      {selectedDocument.deanRemarks
                        ? selectedDocument.deanRemarks
                        : ""}
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineIcon className="p-2">
                      <BellIcon className="h-4 w-4" />
                    </TimelineIcon>
                    <Typography variant="h6" color="blue-gray">
                      Office of Vice Chancellor for Academic Affairs
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      color="gray"
                      className="font-normal text-sm text-gray-600"
                    >
                      Date Endorsed:{" "}
                      {selectedDocument.endorsementDate
                        ? format(
                          new Date(selectedDocument.endorsementDate),
                          "yyyy-MM-dd"
                        )
                        : `Waiting for ${selectedDocument.collegeName} Dean Endorsement`}{" "}
                      <br />
                      Endorsed By:{" "}
                      {selectedDocument.endorserName
                        ? selectedDocument.endorserName
                        : "Pending"}{" "}
                      <br />
                      Remarks:{" "}
                      {selectedDocument.EndorserRemarks
                        ? selectedDocument.EndorserRemarks
                        : ""}
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineIcon className="p-2">
                      <BellIcon className="h-4 w-4" />
                    </TimelineIcon>
                    <Typography variant="h6" color="blue-gray">
                      Office of the President
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      color="gray"
                      className="font-normal text-sm text-gray-600"
                    >
                      Final Approval Date:{" "}
                      {selectedDocument.approvalDate
                        ? format(
                          new Date(selectedDocument.approvalDate),
                          "yyyy-MM-dd"
                        )
                        : "Waiting for OVCAA Endorsement"}{" "}
                      <br />
                      Approved By:{" "}
                      {selectedDocument.approverName
                        ? selectedDocument.approverName
                        : "Pending"}{" "}
                      <br />
                      Remarks:{" "}
                      {selectedDocument.EndorserRemarks
                        ? selectedDocument.remarks
                        : ""}
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineIcon className="p-2">
                      <BellIcon className="h-4 w-4" />
                    </TimelineIcon>
                    <Typography variant="h6" color="blue-gray">
                      Record Management Office
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      color="gray"
                      className="font-normal text-sm text-gray-600"
                    >
                      Release Date:{" "}
                      {selectedDocument.releaseDate
                        ? format(
                          new Date(selectedDocument.releaseDate),
                          "yyyy-MM-dd"
                        )
                        : "Waiting for Office of the President Approval"}{" "}
                      <br />
                      {/* Released By: {selectedDocument.opApproverName ? selectedDocument.opApproverName : 'Pending'} <br />
												Remarks: {selectedDocument.EndorserRemarks ? selectedDocument.remarks : ''} */}
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
              </Timeline>
            )}
          </CardBody>
          <CardFooter className="flex border bg-indigo-50/50 rounded-lg p-1 w-full mx-auto">
            <Button
              className="flex mx-auto hover:scale-105"
              variant="text"
              size="md"
              onClick={handleTimelineClick}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </Dialog>


      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-white"
      >
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Document Archive
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See all information about archived documents
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search by User Detail"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-indigo-50/50  p-4 transition-colors sticky -top-8"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex font-bold leading-none"
                  >
                    {head} {index !== TABLE_HEAD.length - 1}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableRows.map(
              (
                {
                  documentType,
                  uploaderName,
                  controlNumber,
                  documentStatus,
                  collegeName,
                  createdAt,
                  header,
                  subject,
                  uploaderSignature,
                  ImageHeader,
                  content,
                  uploaderDesignation,
                },
                index
              ) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={controlNumber}>
                    <td className={classes}>
                      <div className="flex flex-col items-start ml-2">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {documentType}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-80"
                        >
                          No. {controlNumber}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col gap-1.5">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {uploaderName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {collegeName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={
                            documentStatus === "DeanApproved"
                              ? "Dean Approved"
                              : documentStatus === "Endorsed"
                                ? "Endorsed"
                                : documentStatus === "OP Approved"
                                  ? "OP Approved"
                                  : documentStatus === "Created"
                                    ? "Created"
                                    : documentStatus === "Pending"
                                      ? "Pending"
                                      : documentStatus === "Released"
                                        ? "Released"
                                        : "Rejected"
                          }
                          color={
                            documentStatus === "Rejected"
                              ? "red"
                              : documentStatus === "Pending"
                                ? "orange"
                                : "green"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {format(new Date(createdAt), "yyyy-MM-dd")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-1.5">
                        <PDFDownloadLink
                          document={
                            <Document>
                              <Page size="A4" style={styles.page}>
                                <Image
                                  src={imageHeader}
                                  style={styles.ImageHeader}
                                />
                                <Text style={styles.documentDetailText}>
                                  Control No.{" "}
                                  {controlNumber + " - " + collegeName}
                                </Text>
                                <Text style={styles.documentDetailText}>
                                  Date:{" "}
                                  {format(new Date(createdAt), "yyyy-MM-dd")}
                                </Text>
                                <Text style={styles.headerText}>
                                  To: {header}
                                </Text>
                                <Text style={styles.subjectText}>
                                  Subject: {subject}
                                </Text>
                                {/* <Text style={styles.content}> {convertHtmlToText(content)} </Text> */}
                                <Text style={styles.content}> {content} </Text>
                                <Image
                                  src={`http://localhost:7000${uploaderSignature}`}
                                  style={styles.signature}
                                />
                                <Text style={styles.name}>{uploaderName}</Text>
                                <Text style={styles.designation}>
                                  {uploaderDesignation}
                                </Text>
                                <View style={styles.footer}>
                                  <Text>
                                    MSU-Iligan Institute of Technology
                                    MSU-Tawi-Tawi College of Technology &
                                    Oceanology MSU-Maguindanao MSU-General
                                    Santos MSU-Sulu MSU-Naawan MSU-Lanao del
                                    Norte National Agriculture College MSU-Maigo
                                    School of Art & Trades MSU-Lanao National
                                    College of Arts & Trades MSU-Buug
                                  </Text>
                                </View>
                              </Page>
                            </Document>
                          }
                          fileName="Generated PDF.pdf"
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? (
                              <LuLoader />
                            ) : error ? (
                              "Error generating PDF"
                            ) : (
                              <Button
                                size="md"
                                color="indigo"
                              >Download</Button>
                            )
                          }
                        </PDFDownloadLink>
                        <BsCardChecklist
                          size={20}
                          onClick={() => handleTimelineClick(index)}
                        />

                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
    </Card >
  );
};

export default ArchivePage;
