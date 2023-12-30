import React, { useEffect, useState } from "react";
import documentsStore from "../config/documentsStore";
import DocumentReleasingDetail from "./DocumentReleasingDetail";
import DocumentCompleteDetail from "./DocumentCompleteDetail";
import axios from "axios";

import {
  Button,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";

import { useToast } from "../components/ToastService";
import { LuAlertCircle } from "react-icons/lu";
import { io } from "socket.io-client";

const ReleasingDocumentPage = () => {
  const store = documentsStore();
  const toast = useToast();

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [open, setOpen] = useState(false);

  const [ReleaserName, setName] = useState();
  const [Remark, setRemark] = useState();

  const [documents, setDocuments] = useState([]);

  const handleReleaserName = (userDetail) => {
    setName(userDetail.firstName + " " + userDetail.lastName);
  };

  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 5000);
  };

  const handleOpen = (document) => {
    setSelectedDocument(document);
    setOpen(true);
  };

  useEffect(() => {
    const socket = io("http://localhost:7000");

    socket.on("endorsementDocument", (endorsedDocument) => {
      // Update documents state when a document is endorsed
      setDocuments((prevDocuments) => [endorsedDocument, ...prevDocuments]);
    });

    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    handleReleaserName(userDetail);

    // Fetch initial documents
    const fetchDocuments = async () => {
      try {
        await store.fetchDocuments();
        setDocuments(store.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();

    // Clean up the Socket.io connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [store]);

  if (!store.documents) {
    return null;
  }

  const endorseDocument = documents
    ? documents
        .filter((document) => document.documentStatus === "OP Approved")
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : [];

  const handleReleaseDocument = async (e, documentId) => {
    e.preventDefault();
    try {
      axios
        .put(`http://localhost:7000/document/releaseDocument/${documentId}`, {
          ReleaserName,
          decision: true,
        })
        .then((res) => {
          setOpen(!open);
          console.log(res);
          if (res.status === 200) {
            toast.open(
              <div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant="h5">Success!</Typography>
                  <Typography variant="paragraph">
                    Document Archived Successfully
                  </Typography>
                </div>
              </div>
            );
          } else {
            setOpen(false);
            toast.open(
              <div className="flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant="h5">Failed!</Typography>
                  <Typography variant="paragraph">
                    Document Archiving Failed
                  </Typography>
                </div>
              </div>
            );
          }
        });
    } catch (error) {}
  };

  const handleRejectDocument = async (e, documentId) => {
    e.preventDefault();

    try {
      const data = {
        ReleaserName,
        Remark,
        decision: "false",
      };

      const res = await fetch(
        `http://localhost:7000/document/releaseDocument/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        setAlertMessage("Document Rejected.");
        setAlertType("error");
        hideAlertAfterDelay();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Document Rejection Error.");
      setAlertType("error");
      hideAlertAfterDelay();
    }
  };

  return (
    <div className="grid grid-cols-4 px-14 w-screen overflow-y-scroll">
      {/* <Typography className='flex justify-center p-2 rounded-md font-semibold text-xl bg-indigo-800 text-white'>
				Releasing Page
			</Typography> */}
      {endorseDocument.map((document) => (
        <div
          key={document._id}
          className="flex flex-col bg-gray-300/80 p-3 m-4 rounded-xl shadow-lg hover:scale-105"
        >
          <DocumentReleasingDetail document={document} />
          <Dialog
            className="flex flex-col overflow-y-scroll bg-white rounded-t-xl max-h-screen"
            size="lg"
            open={
              open && selectedDocument && selectedDocument._id === document._id
            }
            handler={() => setOpen(false)}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader className="bg-[#23074d] text-white">
              {document.documentType}
            </DialogHeader>
            <DialogBody divider>
              <DocumentCompleteDetail document={document} />
            </DialogBody>
            <DialogFooter>
              <div className="flex gap-4">
                <Button
                  variant="standard"
                  color="green"
                  onClick={(e) =>
                    handleReleaseDocument(e, document._id) && setOpen(false)
                  }
                >
                  Mark As Released
                </Button>

                {/* <Button size='sm' variant='standard' color='red' onClick={() => handleRejectOpen(document)}>
										Reject Release
									</Button>

									<Dialog
										open={reject && rejectSelected && rejectSelected._id === document._id}
										handler={() => setReject(false)}>
										<div className="flex items-center justify-between"
										>
											<DialogHeader>Cause of Rejection</DialogHeader>
										</div>
										<DialogBody divider>
											<div className="flex h-72">
												<Textarea
													label="Message"
													onChange={handleRemark} />
											</div>
										</DialogBody>
										<DialogFooter className="space-x-2">
											<Button variant="gradient" color="red" onClick={(e) => handleRejectDocument(e, document._id) && setReject(false) && setOpen(false)}>
												Reject Document
											</Button>
											<Button variant="outlined" color="red" onClick={() => setReject(false)}>
												close
											</Button>
										</DialogFooter>
									</Dialog> */}

                <Button size="sm" variant="text" onClick={() => setOpen(false)}>
                  <span>Close</span>
                </Button>
              </div>
            </DialogFooter>
          </Dialog>
          <div className="flex content-start whitespace-pre justify-center items-center ">
            <Button
              className="flex flex-row text-black font-medium items-center m-2 hover:font-semibold hover:scale-105 hover:text-blue-900"
              size="sm"
              color="white"
              variant="text"
              onClick={() => handleOpen(document)}
            >
              Review{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
            {/* <HiDownload size={20} className='flex mr-4' /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReleasingDocumentPage;
