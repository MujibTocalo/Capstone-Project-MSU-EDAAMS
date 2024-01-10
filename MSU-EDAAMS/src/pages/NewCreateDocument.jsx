import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "../components/TextEditor.css";
import { LuAlertCircle } from "react-icons/lu";

import {
  Alert,
  Select,
  Option,
  Input,
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useToast } from "../components/ToastService";

import { useLocation } from "react-router-dom";

const NewCreateDocument = () => {
  const uploaderDetail = JSON.parse(localStorage.getItem('userDetails'))
  const quillRef = useRef(null);

  const location = useLocation();
  const { document } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);

  const handleConfirmationOpen = () => setConfirmationOpen(true);
  const handleConfirmationClose = () => setConfirmationOpen(false);

  const confirmSubmission = () => {
    addDocument();
    handleConfirmationClose();
  };

  const [documentDetail, setDocumentDetail] = useState({
    controlNumber: "",
    collegeName: "",
    documentType: "",
    header: "",
    subject: "",
    content: "",
    uploaderName: uploaderDetail.firstName + " " + uploaderDetail.lastName,
    uploaderDesignation: uploaderDetail.designation,
    uploaderSignature: uploaderDetail.signature,
  });

  const generateControlNumber = (collegeName) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Combine the components to form the control number
    const controlNumber = `${year}-${month}${day} ${collegeName}`;

    return controlNumber;
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const toast = useToast();

  const onDocumentType = (value) => {
    setDocumentDetail({
      ...documentDetail,
      documentType: value,
    });
  };

  // const onControlNumber = (e) => {
  //   setDocumentDetail({
  //     ...documentDetail,
  //     controlNumber: e.target.value,
  //   });
  // };



  // When the collegeName is selected, call the generateControlNumber function
  const onCollegeName = (value) => {
    setDocumentDetail({
      ...documentDetail,
      collegeName: value,
      controlNumber: generateControlNumber(value),
    });
  };

  const onHeader = (e) => {
    setDocumentDetail({
      ...documentDetail,
      header: e.target.value,
    });
  };

  const onSubject = (e) => {
    setDocumentDetail({
      ...documentDetail,
      subject: e.target.value,
    });
  };

  const onContent = (value) => {
    setDocumentDetail({
      ...documentDetail,
      content: value
    });
  };

  useEffect(() => {
    if (document) {
      setDocumentDetail({
        controlNumber: document.controlNumber || "",
        collegeName: document.collegeName || "",
        documentType: document.documentType || "",
        header: document.header || "",
        subject: document.subject || "",
        content: document.content || "",
        uploaderName: document.uploaderName || uploaderDetail.firstName + " " + uploaderDetail.lastName,
        uploaderDesignation: document.uploaderDesignation || uploaderDetail.designation,
        uploaderSignature: document.uploaderSignature || uploaderDetail.signature,
      });
      setIsEditing(true);
    } else {
      // Reset state when creating a new document
      setDocumentDetail({
        controlNumber: "",
        collegeName: "",
        documentType: "",
        header: "",
        subject: "",
        content: "",
        uploaderName: uploaderDetail.firstName + " " + uploaderDetail.lastName,
        uploaderDesignation: uploaderDetail.designation,
        uploaderSignature: uploaderDetail.signature,
      });
      setIsEditing(false);
    }
  }, [document]);


  const confirmEdit = () => {
    // Check if all required fields are filled
    const requiredFields = ['header', 'subject', 'content'];
    const missingFields = requiredFields.filter(field => !documentDetail[field]);

    if (missingFields.length === 0) {
      // All required fields are filled, proceed with the edit confirmation
      setIsEditing(true);
      handleConfirmationOpen();
    } else {
      // Show an alert or prevent submission due to missing fields
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
      // You can customize this alert or implement your preferred way of handling missing fields
    }
  };


  const addDocument = async () => {
    try {
      const apiUrl = isEditing
        ? `http://localhost:7000/document/updateDocument/${document._id}`
        : "http://localhost:7000/document/createDocument";

      const requestData = isEditing
        ? {
          header: documentDetail.header,
          subject: documentDetail.subject,
          content: documentDetail.content,
        }
        : {
          controlNumber: documentDetail.controlNumber,
          collegeName: documentDetail.collegeName,
          documentType: documentDetail.documentType,
          header: documentDetail.header,
          subject: documentDetail.subject,
          content: documentDetail.content,
          uploaderName: documentDetail.uploaderName,
          uploaderDesignation: documentDetail.uploaderDesignation,
          uploaderSignature: documentDetail.uploaderSignature,
        };

      const response = isEditing
        ? await axios.put(apiUrl, requestData)
        : await axios.post(apiUrl, requestData);

      if (response.status === 201 || response.status === 200) {
        // Your success logic
        toast.open(
          <div className={`flex gap-2 bg-${isEditing ? "yellow" : "green"}-500 text-white p-4 rounded-lg shadow-lg`}>
            <LuAlertCircle size={40} />
            <div>
              <Typography variant="h5">{isEditing ? "Edit" : "Success"}!</Typography>
              <Typography variant="paragraph">
                Document {isEditing ? "Updated" : "Submission Successful"}
              </Typography>
            </div>
          </div>
        );

        // Reset the form or handle any other necessary actions after submission
        setDocumentDetail({
          collegeName: null,
          documentType: null,
          header: null,
          subject: null,
          content: "",
        });
      } else {
        // Your failure logic
        toast.open(
          <div className="flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
            <LuAlertCircle size={40} />
            <div>
              <Typography variant="h5">Failed!</Typography>
              <Typography variant="paragraph">
                Document {isEditing ? "Update" : "Submission"} Failed
              </Typography>
            </div>
          </div>
        );
      }
    } catch (error) {
      // Your error handling logic
      toast.open(
        <div className="flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg">
          <LuAlertCircle size={40} />
          <div>
            <Typography variant="h5">Error!</Typography>
            <Typography variant="paragraph">
              Document {isEditing ? "Update" : "Submission"} Error
            </Typography>
          </div>
        </div>
      );
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col mt-4 px-24 rounded-xl max-w-screen overflow-hidden">
      <h3 className='flex bg-[#182440] text-xl shadow-lg p-3 text-white font-bold rounded-xl justify-center'>Document Creation Page</h3>
      <div className="flex gap-14 my-4">
        <Select
          className="text-[#4477CE]"
          variant="outlined"
          label="Select Document Type"
          onChange={onDocumentType}
          value={documentDetail.documentType}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          disabled={isEditing}
        >
          <Option value="Memorandum">Memorandum</Option>
          <Option value="Special Order">Special Order</Option>
        </Select>

        {/* <Input
          color="cyan"
          variant="standard"
          label="Control Number"
          value={documentDetail.controlNumber}
          onChange={onControlNumber}
        /> */}
        <Select
          color="cyan"
          variant="outlined"
          label="Select College"
          onChange={onCollegeName}
          value={documentDetail.documentType}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          disabled={isEditing}
        >
          {/* MSU COLLEGES */}
          <Option value="COA">
            College of Agriculture</Option>
          <Option value="CBAA">
            College of Business Administration and Accountancy
          </Option>
          <Option value="CED">
            College of Education</Option>
          <Option value="COE">
            College of Engineering</Option>
          <Option value="DET">
            Division of Engineering Technology</Option>
          <Option value="CFAS">
            College of Fisheries and Aquatic Sciences
          </Option>
          <Option value="CFES">
            College of Forestry and Environmental Sciences
          </Option>
          <Option value="CHS">College of Health Sciences</Option>
          <Option value="CHARM">
            College of Hospitality and Tourism Management
          </Option>
          <Option value="CICS">
            College of Information and Computing Sciences
          </Option>
          <Option value="ISE">Institute of Scince Education (Graduate)</Option>
          <Option value="CKFIS">
            College of King Faisal Center for Islamic, Arabic and Asian Studies
          </Option>
          <Option value="COL">College of Law</Option>
          <Option value="COM">College of Medicine</Option>
          <Option value="CNSM">
            College of Natural Sciences and Mathematics
          </Option>
          <Option value="CPA">
            College of Public Affairs
          </Option>
          <Option value="SSH">
            College of Social Sciences and Humanities
          </Option>
          <Option value="CSPEAR">
            College of Sport Physical Education And Recreation
          </Option>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Textarea
          color="cyan"
          variant="standard"
          label="Header"
          value={documentDetail.header}
          onChange={onHeader}
        />
        <Textarea
          color="cyan"
          variant="standard"
          label="Subject"
          value={documentDetail.subject}
          onChange={onSubject}
        />
      </div>
      <div>
        <EditorToolbar toolbarId={'t1'} />
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={documentDetail.content}
          onChange={onContent}
          placeholder={"Write the Document Content Here..."}
          modules={modules('t1')}
          formats={formats}
        />
      </div>
      <div className="flex col-sm-12 text-right">
        <button
          onClick={isEditing ? confirmEdit : confirmSubmission}
          className={`flex mx-auto bg-${isEditing ? 'yellow' : 'green'}-400 border border-black p-2 px-8 m-4 rounded-xl font-semibold`}
        >
          {isEditing ? "Edit" : "Submit"}
        </button>
        <Dialog
          open={confirmationOpen}
          handler={handleConfirmationClose}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Confirm Submittion.</DialogHeader>
          <DialogBody>
            Make sure all the details entered are correct.
          </DialogBody>
          <DialogFooter className="flex gap-3">
            <button
              onClick={confirmSubmission}
              className="flex border border-green-700 rounded-lg p-1 px-4 text-md text-black hover:bg-green-400"
            >
              <span>Confirm</span>
            </button>
            <button
              onClick={handleConfirmationClose}
              className="flex border border-red-700 rounded-lg p-1 px-4 text-md text-black hover:bg-red-400"
            >
              <span>Cancel</span>
            </button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default NewCreateDocument;
