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

import {
  HomeIcon,
  BellIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
  UserGroupIcon,
  PlusIcon,
  ArchiveBoxIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/solid";

import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import documentsStore from "../config/documentsStore";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { BiDetail, BiEdit, BiTrash } from "react-icons/bi";
import {
  BsAppIndicator,
  BsCardChecklist,
  BsPlus,
  BsRecord2Fill,
} from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";

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

const PAGE_SIZE = 7;

export const DocumentsLists = () => {
  const store = documentsStore();

  const [tableRows, setTableRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTableRows, setFilteredTableRows] = useState([]);
  const [isTimelineDialogOpen, setIsTimelineDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [userAccess, setUserAccess] = useState();

  // SORTING BASED ON TABLE HEAD CATEGORY
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [sortedColumn, setSortedColumn] = useState(null);

  const handleSort = (column) => {
    // Toggle sort order if clicking on the same column
    if (column === sortedColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }

    // Sort the tableRows based on the selected column and order
    const sortedRows = filteredTableRows.slice().sort((a, b) => {
      let valueA, valueB;

      switch (column) {
        case "College / Office":
          valueA = a.collegeName ? a.collegeName.toLowerCase() : "";
          valueB = b.collegeName ? b.collegeName.toLowerCase() : "";
          break;
        case "Document Status":
          valueA = a.documentStatus ? a.documentStatus.toLowerCase() : "";
          valueB = b.documentStatus ? b.documentStatus.toLowerCase() : "";
          break;
        case "Document Type":
          valueA = a.documentType ? a.documentType.toLowerCase() : "";
          valueB = b.documentType ? b.documentType.toLowerCase() : "";
          break;
        case "Uploader Detail":
          valueA = a.uploaderName ? a.uploaderName.toLowerCase() : "";
          valueB = b.uploaderName ? b.uploaderName.toLowerCase() : "";
          break;
        case "Date Uploaded":
          valueA = a.createdAt ? new Date(a.createdAt) : 0;
          valueB = b.createdAt ? new Date(b.createdAt) : 0;
          break;
        default:
          // Default handling for other columns
          valueA = a[column] ? a[column].toLowerCase() : "";
          valueB = b[column] ? b[column].toLowerCase() : "";
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredTableRows(sortedRows);
  };

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const totalPageCount = Math.ceil(filteredTableRows.length / PAGE_SIZE);

  const paginatedTableRows = filteredTableRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  useEffect(() => {
    const fetchTableRows = async () => {
      try {
        const userDetail = JSON.parse(localStorage.getItem("userDetails"));
        setUserAccess(userDetail.userType);
        const response = await axios.get("http://localhost:7000/document");
        const responseData = response.data;
        const documentArray = responseData.document;
        const currentUserCollege = userDetail.office;
        const filteredDocuments = documentArray
          .filter((document) => {
            document.collegeName === currentUserCollege;
          });

        const sortedDocuments = documentArray
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter(
            (document) =>
              document.documentStatus === "Dean Endorsed" ||
              document.documentStatus === "OVCAA Endorsed" ||
              document.documentStatus === "Pending" ||
              document.documentStatus === "OP Approved" ||
              document.documentStatus === "Rejected"
          );

        setTableRows(sortedDocuments);
        // setTableRows(documentArray);
        // setFilteredTableRows(documentArray);
        setFilteredTableRows(sortedDocuments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTableRows();
  }, []);

  const handleTimelineClick = (index) => {
    const selectedDocument = tableRows[index];
    setSelectedDocument(selectedDocument);
    setIsTimelineDialogOpen(!isTimelineDialogOpen);
  };


  const deleteDocument = (documentId) => {
    axios
      .delete(`http://localhost:7000/document/delete/${documentId}`)
      .then((res) => {
        if (res.data.success === "Document Deleted") {
          store.fetchDocuments();
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  };

  const handleCreateNewDocument = () => {
    navigate("/newCreateDocument");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the tableRows based on the uploader's detail (uploaderName)
    const filteredRows = filteredTableRows.filter((row) =>
      row.uploaderName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredTableRows(filteredRows);
  };

  // Function to show the confirmation modal
  const showConfirmationModal = (documentId) => {
    setSelectedDocumentId(documentId);
    setShowDeleteConfirmation(true);
  };

  // Function to hide the confirmation modal
  const hideConfirmationModal = () => {
    setShowDeleteConfirmation(false);
    setSelectedDocumentId(null);
  };

  // Function to handle document deletion when confirmed
  const handleDeleteConfirmed = () => {
    if (selectedDocumentId) {
      deleteDocument(selectedDocumentId);
      hideConfirmationModal();
    }
  };

  // const formattedDate = selectedDocument.createdAt
  //   ? format(new Date(selectedDocument.createdAt), "yyyy-MM-dd hh:mm:ss a")
  //   : "N/A";

  const handleEditDocument = (documentId) => {
    // Find the selected document based on the documentId
    const selectedDocument = filteredTableRows.find(
      (doc) => doc._id === documentId
    );

    // Display a confirmation prompt
    const isConfirmed = window.confirm(
      "Are you sure you want to edit this document?"
    );

    if (isConfirmed) {
      // Redirect to the NewCreateDocument page with the selected document data
      navigate("/newCreateDocument", { state: { document: selectedDocument } });
    }
  };

  const navigate = useNavigate();

  return (
    <Card className="flex h-full max-w-screen px-12 mx-auto my-auto rounded-none overflow-hidden bg-white"
      floated="true"
      shadow="true"
    >
      <div>
        <Dialog
          size="sm"
          open={showDeleteConfirmation}
          handler={hideConfirmationModal}
          className="bg-white shadow-none"
        >
          <Card className="mx-auto w-full">
            <CardHeader className="mb-4 grid h-16 place-items-center bg-indigo-800">
              <Typography variant="h4" className="text-white">
                Confirm Deletion
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center h-32">
              <Typography
                variant="body"
                color="blue-gray"
                className="text-center"
              >
                Are you sure you want to delete this document?
              </Typography>
              <div className="flex mt-4 gap-4">
                <Button
                  onClick={hideConfirmationModal}
                  color="indigo"
                  variant="outlined"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button onClick={handleDeleteConfirmed} color="green" size="sm">
                  Confirm Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        </Dialog>

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
              {selectedDocument.documentStatus !== "Rejected" && (
                <Timeline>
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className="p-2">
                        <UsersIcon className="h-4 w-4" />
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
                      </Typography>
                    </TimelineBody>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className="p-2">
                        <UserIcon className="h-4 w-4" />
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
                      </Typography>
                    </TimelineBody>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className="p-2">
                        <UsersIcon className="h-4 w-4" />
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
                      </Typography>
                    </TimelineBody>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className="p-2">
                        <UserIcon className="h-4 w-4" />
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
                      </Typography>
                    </TimelineBody>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineHeader>
                      <TimelineIcon className="p-2">
                        <UserGroupIcon className="h-4 w-4" />
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
              {selectedDocument.documentStatus === "Rejected" && (
                <Timeline>
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className="p-2">
                        <UsersIcon className="h-4 w-4" />
                      </TimelineIcon>
                      <Typography variant="h6" color="blue-gray">
                        {selectedDocument.rejectedPoint}
                      </Typography>
                    </TimelineHeader>
                    <TimelineBody className="pb-8">
                      <Typography
                        color="gray"
                        className="font-normal text-md text-gray-800"
                      >
                        Date Rejected:{" "}
                        {selectedDocument.rejectedDate
                          ? format(
                            new Date(selectedDocument.rejectedDate),
                            "yyyy-MM-dd"
                          )
                          : "Waiting"}{" "}
                        <br />
                        Rejected By:{" "}
                        {selectedDocument.rejectedName
                          ? selectedDocument.rejectedDesignation +
                          " " +
                          selectedDocument.rejectedName
                          : "Pending"}{" "}
                        <br />
                        Remarks:{" "}
                        {selectedDocument.rejectedRemarks
                          ? selectedDocument.rejectedRemarks
                          : ""}
                      </Typography>
                    </TimelineBody>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className="p-2">
                        <DocumentPlusIcon className="h-4 w-4" />
                      </TimelineIcon>
                      <Typography variant="h6" color="blue-gray">
                        Re-Create Document
                      </Typography>
                    </TimelineHeader>
                    <TimelineBody className="pb-4">
                      <Button
                        color="green"
                        variant="outlined"
                        onClick={handleCreateNewDocument}
                      >
                        Create New Document
                      </Button>
                    </TimelineBody>
                  </TimelineItem>
                </Timeline>
              )}
            </CardBody>
            <CardFooter className="flex border bg-indigo-50/50 rounded-lg p-1 w-full mx-auto">
              {/* <Button
                className="flex mx-auto hover:scale-105"
                variant="text"
                size="md"
                onClick={handleTimelineClick}
              >
                Close
              </Button> */}
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
          {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            
          </div> */}
        </div>
        {/* ADD DOCUMENT BUTTON */}
        <div className=" flex flex-row justify-end pr-4">
          <Button
            className="flex gap-2 hover:scale-110"
            color="blue"
            onClick={handleCreateNewDocument}
          >
            <HiOutlineDocumentAdd size={16} /> Create Document
          </Button>
        </div>

        {/* SEARCH BAR */}
        <div className="w-screen md:w-72 -translate-y-4">
          <Input
            label="Search by Uploader Detail"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>

        <div className="flex mt-64 whitespace-pre flex-col items-center justify-between gap-4 md:flex-row">
          {/* <Tabs value="all" className="w-full md:w-max whitespace-pre">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
        </div>
      </CardHeader>
      <CardBody className="overflow-y-scroll h-screen -translate-y-16 px-1">
        <table className="min-w-max table-auto text-left" style={{ width: "100%" }}>
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-100  p-4 transition-colors sticky -top-8"
                  onClick={() => handleSort(head)}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex font-bold leading-none cursor-pointer"
                  >
                    {head} {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon
                        className={`h-4 w-4 ml-1 transition-transform transform ${sortedColumn === head
                            ? sortOrder === "asc"
                              ? "-rotate-180"
                              : "rotate-180"
                            : ""
                          }`}
                      />
                    )}
                  </Typography>
                </th>
              ))}

            </tr>
          </thead>
          <tbody>
            {paginatedTableRows.map(
              (
                {
                  _id,
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
                      <div className="flex flex-col items-start ml-4">
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
                                : documentStatus === "OVCAA Endorsed"
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
                      <div className="flex flex-row mx-auto gap-1 items-center cursor-pointer">
                        {/* <BsCardChecklist
                          size={20}
                          onClick={() => handleTimelineClick(index)}
                        /> */}
                        <div className="flex w-max gap-4">
                          <BsCardChecklist
                            size={25}
                            className="cursor-pointer hover:scale-110 hover:bg-lightgray hover:text-black"
                            onClick={() => handleTimelineClick(index)}
                            title="Track Document"
                          />
                        </div>
                        {userAccess === "Uploader" &&
                          documentStatus === "Pending" && (
                            <>
                              {/* Add the Edit button here */}
                              <BiEdit
                                size={25}
                                className="cursor-pointer hover:scale-110 hover:bg-lightgray hover:text-black"
                                onClick={() => handleEditDocument(_id)}
                                title="Edit Document"
                              />
                              <BiTrash
                                onClick={() => showConfirmationModal(_id)}
                                size={34}
                                className="flex text-gray-700 p-1 rounded-lg hover:scale-105"
                              />
                            </>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 -translate-y-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPageCount}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            className="border-gray-400"
            size="sm"
            onClick={handlePrevPage}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            className="border-gray-400"
            size="sm"
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
