import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Registration from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import CreateDocument from "./pages/CreateDocument";
import Sidebar from "./components/Sidebar";
import ArchivePage from "./pages/ArchivePage";
import ManageUsers from "./pages/ManageUserPage";
import ApproveDocument from "./pages/ApproveDocument";
import EndorseDocument from "./pages/EndorsementPage";
import Dashboard from "./pages/Dashboard";
import { DocumentsLists } from "./pages/DocumentsLists";
import TestingPage from "./pages/TestingPage";
import ReleasingDocumentPage from "./pages/ReleasingDocumentPage";
import { CustomNavbar } from "./components/Navbar";
import { io } from "socket.io-client/dist/socket.io.js";
import RestrictedPage from "./pages/RestrictedPage";
import NewCreateDocument from "./pages/NewCreateDocument";
import DeanEndorsementPage from "./pages/Dean Endorsement Page/DeanEndorsementPage";
import OVCAAEndorsementPage from "./pages/OVCAA Endorsement Page/OVCAAEndorsementPage";
import OpApprovalPage from './pages/Approval Page/OpApprovalPage'

const socket = io('http://localhost:7000')

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on("newDocument", (newDocument) => {
      // Handle the new document, e.g., update state
      console.log("New Document Received:", newDocument);
      // You might want to update the state or trigger a fetchDocuments function
    });

    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("newDocument");
    };
  }, []);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="overflow-hidden">
      {isLoggedIn && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </div>
  );
};

const MainRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userType, setUserType] = useState('')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem('userDetails'))
    setUserType(userDetail.userType);
  }, []);


  return (
    <div className="flex flex-col max-h-screen overflow-hidden">
      <CustomNavbar setOpen={setIsSidebarOpen} />
      <div className="flex max-w-fit overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={!toggleSidebar} style={{ zIndex: 1, position: 'relative' }} />
        <div className="flex flex-col max-w-fit overflow-hidden flex-grow">
          <Routes>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/documents" element={<DocumentsLists />} />
            <Route path="/createDocument" element={<CreateDocument />} />
            <Route path="/newCreateDocument" element={<NewCreateDocument />} />
            <Route path="/approvedocument" element={<ApproveDocument />} />
            <Route path="/deanEndorsement" element={<DeanEndorsementPage />} />
            {/* <Route path="/endorsedocument" element={<EndorseDocument />} /> */}

            <Route
              path="/ovcaaEndorsement"
              element={
                (userType === 'Endorser - OVCAA' || userType === 'Administrator') ?
                  (<OVCAAEndorsementPage />) : (<Navigate to='/restricted' />)} />

            <Route
              path="/opapproval"
              element={
                (userType === 'Approver - OP' || userType === 'Administrator') ?
                  (<OpApprovalPage />) : (<Navigate to="/restricted" />)} />

            <Route
              path="/archive"
              element={
                userType === 'Administrator' ?
                  (<ArchivePage />) : (<Navigate to='/restricted' />)} />

            <Route
              path="/manageusers"
              element={
                userType === 'Administrator' ?
                  (<ManageUsers />) : (<Navigate to="/restricted" />)} />
            <Route
              path="/releasedocument"
              element=
              {userType === 'Administrator' ?
                (<ReleasingDocumentPage />) : (<Navigate to="/restricted" />)} />

            <Route path="/restricted" element={<RestrictedPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
};
export default App;
