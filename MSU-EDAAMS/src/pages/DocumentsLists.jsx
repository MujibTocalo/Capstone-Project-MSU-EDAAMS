import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

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

import { HomeIcon, BellIcon } from "@heroicons/react/24/solid";

import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import documentsStore from "../config/documentsStore";
import { useEffect, useState } from "react";

import axios from "axios";
import { BiDetail, BiEdit, BiTrash } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import TrackDocumentContent from "../components/TrackingContent";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Dean Approved",
    value: "DeanApproved",
  },
  {
    label: "Endorsed",
    value: "Endorsed",
  },
  {
    label: "OP Approved",
    value: "PresidentApproved",
  },
];

const TABLE_HEAD = [
  "Document Type",
  "Uploader Detail",
  "College / Office",
  "Document Status",
  "Date Uploaded",
  "Action",
];

export const DocumentsLists = () => {
  const store = documentsStore();

  const [tableRows, setTableRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTableRows, setFilteredTableRows] = useState([]);
  const [isTimelineDialogOpen, setIsTimelineDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(false);

  useEffect(() => {
    const fetchTableRows = async () => {
      try {
        const userDetail = JSON.parse(localStorage.getItem("userDetails"));

        const response = await axios.get("http://localhost:7000/document");
        const responseData = response.data;
        const documentArray = responseData.document;
        const currentUserCollege = userDetail.office;
        const filteredDocuments = documentArray.filter(
          (document) => document.collegeName === currentUserCollege
        );

        const sortedDocuments = documentArray
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter(
            (document) =>
              document.documentStatus === "DeanApproved" ||
              document.documentStatus === "Dean Endorsed" ||
              document.documentStatus === "Endorsed" ||
              document.documentStatus === "Dean Approved" ||
              document.documentStatus === "Pending" ||
              document.documentStatus === "OP Approved"
          );

        setTableRows(sortedDocuments);
        setFilteredTableRows(sortedDocuments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTableRows();
  }, []);

  const handleTimelineClick = (index) => {
    const selectedDocument = tableRows[index]; // Access the document data using the index
    setSelectedDocument(selectedDocument); // Set the selected document
    setIsTimelineDialogOpen(true); // Open the dialog
  };

  const handleCreateNewDocument = () => {
    navigate("/newCreateDocument");
  };
  // const handleArchive = () => {
  // 	navigate('/archive')
  // }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the tableRows based on the uploader's detail (uploaderName)
    const filteredRows = tableRows.filter((row) =>
      row.uploaderName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredTableRows(filteredRows);
  };

  const navigate = useNavigate();

  return (
    <Card className="h-full w-screen rounded-none bg-white">
      <div>
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
                          : "Waiting"}{" "}
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
                        {selectedDocument.opApprovalDate
                          ? format(
                              new Date(selectedDocument.opApprovalDate),
                              "yyyy-MM-dd"
                            )
                          : "Waiting"}{" "}
                        <br />
                        Approved By:{" "}
                        {selectedDocument.opApproverName
                          ? selectedDocument.opApproverName
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
                          : "Waiting"}{" "}
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
      </div>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-white"
      >
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h4" color="blue-gray">
              Document List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See all information about documents
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="flex gap-2 -translate-x-12">
              <Button
                className="flex gap-2 hover:scale-105"
                color="green"
                onClick={handleCreateNewDocument}
              >
                <HiOutlineDocumentAdd size={16} /> Create Document
              </Button>
            </div>

            {/* search bar */}
            <div className="w-screen -translate-x-12 md:w-72">
              <Input
                label="Search by Uploader Detail"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearch}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
        <div className="flex mb-2 mt-4 whitespace-pre flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max whitespace-pre">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-1 py-10">
        <table className="min-w-max table-auto" style={{ width: "100%" }}>
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-indigo-50/50 p-4 transition-colors sticky -top-8 "
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-bold leading-none"
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
                  uploaderDesignation,
                  controlNumber,
                  documentStatus,
                  collegeName,
                  createdAt,
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
                          className="font-medium"
                        >
                          {documentType}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-80"
                        >
                          Control No. {controlNumber}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col gap-1.5">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {uploaderName}
                        </Typography>

                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {uploaderDesignation}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col text-start">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {collegeName}
                        </Typography>
                        {/* <Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{designation}
												</Typography> */}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-row">
                        <Chip
                          variant="ghost"
                          size="md"
                          value={
                            documentStatus === "Dean Approved"
                              ? "Dean Approved"
                              : documentStatus === "Dean Endorsed"
                              ? "Dean Approved"
                              : documentStatus === "Endorsed"
                              ? "OVCAA Approved"
                              : documentStatus === "OP Approved"
                              ? "OP Approved"
                              : documentStatus === "Created"
                              ? "Created"
                              : documentStatus === "Pending"
                              ? "Pending"
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
                        className="font-medium"
                      >
                        {format(new Date(createdAt), "yyyy-MM-dd")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-1 cursor-pointer">
                        <BsCardChecklist
                          size={20}
                          onClick={() => handleTimelineClick(index)}
                        />

                        <BiDetail size={20} />
                        <BiEdit size={20} />
                        <BiTrash size={20} />
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {/* <Typography variant="small" color="blue-gray" className="font-normal">
					Page 1 of 10
				</Typography>
				<div className="flex gap-2">
					<Button variant="outlined" size="sm">
						Previous
					</Button>
					<Button variant="outlined" size="sm">
						Next
					</Button>
				</div> */}
      </CardFooter>
    </Card>
  );
};
