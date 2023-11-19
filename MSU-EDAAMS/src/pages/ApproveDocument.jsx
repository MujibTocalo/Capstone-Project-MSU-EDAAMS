import React, { useEffect, useState } from "react";
import {
  Button,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea
} from "@material-tailwind/react";
import documentsStore from "../config/documentsStore";


import DocumentApproverDetail from "./Dean Endorsement Page/DocumentApproverDetail";
import DocumentCompleteDetail from "./DocumentCompleteDetail";
import { useToast } from "../components/ToastService";
import { LuAlertCircle } from "react-icons/lu";

const ApproveDocument = () => {

  const store = documentsStore();
  const toast = useToast();

  const [deanName, setDeanName] = useState('');
  const [deanRemark, setDeanRemark] = useState('');
  const [deanSignature, setDeanSignature] = useState();
  const [deanDesignation, setDeanDesignation] = useState();


  const [open, setOpen] = useState(false);
  const [reject, setReject] = useState(false);
  const [rejectSelected, setRejectSelected] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDeanRemark = (e) => {
    setDeanRemark(e.target.value);
  };

  const handleApproverName = (userDetail) => {
    const approverFirstName = userDetail.firstName;
    const approverLastName = userDetail.lastName;

    setDeanName(approverFirstName + " " + approverLastName);
    setDeanSignature(userDetail.signature)
    setDeanDesignation(userDetail.designation)
  };

  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 5000);
  };

  const handleRejectOpen = (document) => {
    setRejectSelected(document)
    setReject(true)
  }

  const handleOpen = (document) => {
    setSelectedDocument(document);
    setOpen(true);

  };

  useEffect(() => {
    store.fetchDocuments();
    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    handleApproverName(userDetail);
  }, [store]);


  const pendingDocuments = store.documents
    ? store.documents
      .filter((document) => document.documentStatus === 'Pending')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : [];

  const handleApproveDocument = async (e, documentId) => {
    e.preventDefault()

    try {
      const data = {
        deanName,
        deanRemark,
        deanDesignation,
        deanSignature,
        decision: "true",
      };

      const res = await fetch(
        `http://localhost:7000/document/deanApproval/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      if (res.ok) {
        toast.open(
          <div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <LuAlertCircle size={55} />
            <div>
              <Typography variant="h5">Approved!</Typography>
              <Typography variant="paragraph">Document Approved Successfully</Typography>
            </div>
          </div>
        )
      } else {
        toast.open(
          <div className="flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
            <LuAlertCircle size={55} />
            <div>
              <Typography variant="h5">Failed!</Typography>
              <Typography variant="paragraph">Document Rejection Failed</Typography>
            </div>
          </div>
        );
      }

    } catch (error) {
      toast.open(
        <div className="flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg">
          <LuAlertCircle size={55} />
          <div>
            <Typography variant="h5">Error!</Typography>
            <Typography variant="paragraph">Document Error</Typography>
          </div>
        </div>
      );
      console.log(error);
    }
  };

  const handleRejectDocument = async (e, documentId) => {
    e.preventDefault();

    try {
      const data = {
        deanName,
        deanRemark,
        deanDesignation,
        deanSignature: null,
        decision: 'false',
      };

      const res = await fetch(`http://localhost:7000/document/deanApproval/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.open(
          <div className='flex gap-2 bg-blue-500 text-white p-4 rounded-lg shadow-lg'>
            <LuAlertCircle size={55} />
            <div>
              <Typography variant='h5'>Rejected!</Typography>
              <Typography variant='paragraph'>Document Rejection Successful.</Typography>
            </div>
          </div>
        )
      }
    } catch (error) {
      toast.open(
        <div className='flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg'>
          <LuAlertCircle size={55} />
          <div>
            <Typography variant='h5'>Error!</Typography>
            <Typography variant='paragraph'>Document Rejection Error</Typography>
          </div>
        </div>
      )
      console.log(error);

    }
  };

  return (
    <div className='flex flex-col'>
      <div>
        {/* <Typography className='flex justify-center p-2 rounded-md font-semibold text-xl bg-indigo-800 text-white'>
          Approval Page
        </Typography> */}
      </div>
      <div className='grid grid-cols-4'>
        {pendingDocuments.map((document) => (
          <div key={document._id} className='flex flex-col bg-indigo-50/50 p-1.5 m-2 rounded-lg shadow-md hover:scale-105'>
            <DocumentApproverDetail document={document} />
            <Dialog
              className='flex flex-col overflow-y-scroll bg-white rounded-t-xl max-h-[100vh]'
              size='lg'
              open={open && selectedDocument && selectedDocument._id === document._id}
              handler={() => setOpen(false)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader>{document.documentType}</DialogHeader>
              <DialogBody divider>
                <DocumentCompleteDetail document={document} />
              </DialogBody>
              <DialogFooter>
                <div className='flex gap-3'>
                  <Button className="hover:scale-105" variant='standard' color='green' onClick={(e) => handleApproveDocument(e, document._id) && setOpen(false)}>
                    Approve Document
                  </Button>
                  <Button className="hover:scale-105" size='sm' variant='standard' color='red' onClick={() => handleRejectOpen(document)}>
                    Reject Document
                  </Button>

                  <Dialog
                    open={reject && rejectSelected && rejectSelected._id === document._id}
                    handler={() => setReject(false)}>
                    <div className="flex items-center justify-between"
                    >
                      <DialogHeader>Remarks</DialogHeader>
                    </div>
                    <DialogBody divider>
                      <div className="flex h-72">
                        <Textarea
                          label="Message"
                          onChange={handleDeanRemark} />
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
                  </Dialog>

                  <Button size='sm' variant='text' onClick={() => setOpen(false)}>
                    <span>Close</span>
                  </Button>
                </div>
              </DialogFooter>
            </Dialog>
            <div className='flex content-start whitespace-pre '>
              <Button className='flex flex-row text-black font-medium items-center m-2 hover:font-semibold hover:scale-105' size='sm' color='white' variant='text'
                onClick={() => handleOpen(document)}>
                Read More{" "}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveDocument;
