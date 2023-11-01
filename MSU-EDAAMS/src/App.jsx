import { useState, useEffect } from "react";
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
import OPApprovalPage from "./pages/OPApprovalPage";
import TestingPage from "./pages/TestingPage";
import ReleasingDocumentPage from "./pages/ReleasingDocumentPage";
import { CustomNavbar } from "./components/Navbar";
import { io } from "socket.io-client";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*" element={<MainRoutes socket={socket} />} />
      </Routes>
    </div>
  );
};

const MainRoutes = ({ socket }) => {
  const [userType, setUserType] = useState('')



  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem('userDetails'))
    setUserType(userDetail.userType);

  }, []);
  console.log(userType)

  // useEffect(() => {
  //   socket?.emit("newUser", user);
  // }, [socket, user]);





  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col p-2 mx-auto flex-grow bg-transparent">
        <CustomNavbar socket={socket} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/documents" element={<DocumentsLists />} />
          <Route path="/createDocument" element={<CreateDocument />} />
          <Route path="/approvedocument" element={<ApproveDocument />} />
          <Route path="/endorsedocument" element={<EndorseDocument />} />
          <Route path="/opapproval" element={<OPApprovalPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          {/* <Route path="/releasedocument" element={<ReleasingDocumentPage />} /> */}
          <Route
            path="/releasedocument"
            element={
              userType === 'Administrator' ? (
                <ReleasingDocumentPage />
              ) : (
                <Navigate to="/restricted" />
              )
            }
          />
          <Route
            path="/testing"
            element={
              userType === 'Administrator' ? (
                <TestingPage />
              ) : (
                <Navigate to="/restricted" />
              )
            }
          />
          <Route path="/restricted" element={<div>Access Restricted</div>} />
          {/* <Route path="/dashboard" element={user && user.userType === 'admin' ? <Dashboard /> : <Navigate to="/restricted" />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/documents" element={<DocumentsLists />} />
          <Route path="/createDocument" element={user && user.userType === 'editor' ? <CreateDocument /> : <Navigate to="/restricted" />} />
          <Route path="/approvedocument" element={user && user.userType === 'approver' ? <ApproveDocument socket={socket} /> : <Navigate to="/restricted" />} />
          <Route path="/endorsedocument" element={user && user.userType === 'endorser' ? <EndorseDocument /> : <Navigate to="/restricted" />} />
          <Route path="/opapproval" element={user && user.userType === 'op-approver' ? <OPApprovalPage /> : <Navigate to="/restricted" />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/manageusers" element={user && user.userType === 'admin' ? <ManageUsers /> : <Navigate to="/restricted" />} />
          <Route path="/releasedocument" element={user && user.userType === 'releaser' ? <ReleasingDocumentPage /> : <Navigate to="/restricted" />} />
          <Route path="/testing" element={user && user.userType === 'tester' ? <TestingPage /> : <Navigate to="/restricted" />} />
          <Route path="/restricted" element={<div>Access Restricted</div>} /> */}

        </Routes>
      </div>
    </div>
  )
};
export default App;
