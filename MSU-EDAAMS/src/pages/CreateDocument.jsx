import React, { useEffect, useState } from "react";

import { useToast } from "../components/ToastService";
import { LuAlertCircle } from "react-icons/lu";

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

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

import { io } from "socket.io-client";
import axios from "axios";

const CreateDocument = () => {
  const [controlNumber, setControlNumber] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [header, setHeader] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [uploaderDesignation, setUploaderDesignation] = useState()
  const [uploaderSignature, setUploaderSignature] = useState()
  const [open, setOpen] = React.useState(false);

  const toast = useToast();

  const handleOpen = () => setOpen(!open);

  const handleControlName = (e) => {
    setControlNumber(e.target.value);
  };
  const handleCollegeName = (e) => {
    setCollegeName(e);
  };
  const handleDocumentType = (e) => {
    setDocumentType(e);
  };
  const handleHeader = (e) => {
    setHeader(e.target.value);
  };
  const handleSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };


  const handleSubmitAndOpen = () => {
    handleOpen();
    handleSubmit();
  };


  const handleSubmit = async () => {
    try {
      if (
        !controlNumber ||
        !collegeName ||
        !documentType ||
        !header ||
        !subject ||
        !content
      ) {
        handleOpen();
        toast.open(
          <div className="flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
            <LuAlertCircle size={40} />
            <div>
              <Typography variant="h4">Incomplete Detail!</Typography>
              <Typography variant="paragraph">
                Please fill in all necessary details.
              </Typography>
            </div>
          </div>
        );
        return;
      } else {
        axios.post('http://localhost:7000/document/createDocument', {
          controlNumber,
          collegeName,
          documentType,
          header,
          subject,
          content,
          uploaderName,
          uploaderDesignation,
          uploaderSignature
        })
          .then(res => {
            if (res.status === 201) {
              toast.open(
                <div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                  <LuAlertCircle size={40} />
                  <div>
                    <Typography variant="h5">Success!</Typography>
                    <Typography variant="paragraph">
                      Document Submittion Successful
                    </Typography>
                  </div>
                </div>
              );
            } else {
              toast.open(
                <div className='flex gap-2 bg-red-500 text-white p-4 rounded-lg shadow-lg'>
                  <LuAlertCircle size={40} />
                  <div>
                    <Typography variant='h5'>Failed!</Typography>
                    <Typography variant='paragraph'>Document Submittion Failed</Typography>
                  </div>

                </div>
              )
            }
          })
      }

    } catch (error) {
      toast.open(
        <div className='flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg'>
          <LuAlertCircle size={40} />
          <div>
            <Typography variant='h5'>Error!</Typography>
            <Typography variant='paragraph'>Document Submittion Error</Typography>
          </div>

        </div>
      )
      throw error;
    }
  }

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem('userDetails'));
    handleUploaderDetail(userDetail)
  }, []);

  const handleUploaderDetail = (userDetails) => {

    const uploaderFirstName = userDetails.firstName;
    const uploaderLastName = userDetails.lastName;
    setUploaderName(uploaderFirstName + '  ' + uploaderLastName);
    setUploaderDesignation(userDetails.designation)
    setUploaderSignature(userDetails.signature)
  };


  return (
    <div className="flex flex-col p-10 gap-1.5 border shadow-xl rounded-lg bg-white w-screen overflow-y-scroll">
      <Typography variant='h3' className=' flex font-medium mb-4 justify-center'>Create Document</Typography>
      <div className='flex gap-14'>
        <Select
          className='text-[#4477CE]'
          variant='outlined'
          label="Select Document Type"
          onChange={(e) => handleDocumentType(e)}
          value={documentType}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <Option value="Memorandum">Memorandum</Option>
          <Option value="Special Order">Special Order</Option>
        </Select>

        <Input
          color='cyan'
          variant="standard"
          label="Control Number"
          value={controlNumber}
          onChange={handleControlName}
        />
        <Select
          color='cyan'
          variant='outlined'
          label="Select College"
          onChange={(e) => handleCollegeName(e)}
          value={documentType}

          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}>
          <Option value="COA">College of Agriculture</Option>
          <Option value="CBAA">College of Business Administration and Accountancy</Option>
          <Option value="CED">College of Education</Option>
          <Option value="COE">College of Engineering</Option>
          <Option value="CHARM">College of Hotel and Restaurant Management</Option>
          <Option value="CICS">College of Information and Computing Sciences</Option>
          <Option value="CSPEAR">CSPEAR</Option>
          <Option value="CNSM">College of Natural Science and Mathematics</Option>
          <Option value="CPA">College of Public Affairs</Option>

        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Textarea
          color='cyan'
          variant="standard"
          label="Header"
          value={header}
          onChange={handleHeader}
        />
        <Textarea
          color='cyan'
          variant="standard"
          label="Subject"
          value={subject}
          onChange={handleSubject}
        />
      </div>
      <div>
        <Textarea
          color='cyan'
          label="Content" value={content}
          onChange={handleContent}
          className="h-screen" />
        {/* <ReactQuill
          value={content}
          theme="snow"
          onChange={setContent}
          modules={quillModules}
          formats={quillFormats}
        /> */}
      </div>
      <div className='flex mx-auto mt-2 hover:scale-105'>
        <Button variant='outlined' onClick={handleOpen} size='sm'
          color='green'>Submit</Button>
        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Submit Document?</DialogHeader>
          <DialogBody divider>
            Make sure all the details entered are correct.
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="green" onClick={handleSubmitAndOpen}>
              <span>Confirm</span>
            </Button>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  )

}

export default CreateDocument;
