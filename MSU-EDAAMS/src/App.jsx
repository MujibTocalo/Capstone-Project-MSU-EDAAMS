import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Registration from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import CreateDocument from "./pages/CreateDocument";
import Sidebar from "./components/Sidebar";
import ArchivePage from "./pages/ArchivePage";
import ManageUsers from "./pages/ManageUserPage";
import ApproveDocument from "./pages/ApproveDocument";
import EndorseDocument from "./pages/EndorseDocument";
import { Dashboard } from "./pages/Dashboard";
import { DocumentsLists } from "./pages/DocumentsLists";
import OPApprovalPage from "./pages/OPApprovalPage";
import TestingPage from "./pages/TestingPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </div>
  );
};

const MainRoutes = () => (
  <div className="flex flex-row h-screen overflow-hidden">
    <Sidebar />
    <div className="p-2 mx-auto flex-grow bg-transparent overflow-auto">
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
        <Route path="/testing" element={<TestingPage />} />
      </Routes>
    </div>
  </div>
);
export default App;
