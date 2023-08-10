import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/LoginPage";
import Registration from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage'
import CreateDocument from './pages/CreateDocument'
import Sidebar from "./components/Sidebar";
import ArchivePage from "./pages/ArchivePage";
import ManageUsers from "./pages/ManageUserPage";
import { CustomNavbar } from "./components/Navbar";
import ApproveDocument from "./pages/ApproveDocument";
import EndorseDocument from "./pages/EndorseDocument";
import { Dashboard } from "./pages/Dashboard";
import Documents from "./pages/Documents";
import ReleasedDocument from "./pages/ReleasedDocument";


const App = () => {



  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }



  return (
    <div>
      {isLoggedIn && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </div>
  )
}

const MainRoutes = () => (
  <div className="flex">
    <Sidebar />
    <div className="p-2 mx-auto flex-grow bg-transparent overflow-auto">
      <Routes >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profilePage' element={<ProfilePage />} />
        <Route path='/documents' element={<Documents />} />
        <Route path='/createDocument' element={<CreateDocument />} />
        <Route path='/approvedocument' element={<ApproveDocument />} />
        <Route path='/endorsedocument' element={<EndorseDocument />} />
        <Route path='/releasedocument' element={<ReleasedDocument />} />
        <Route path='/archive' element={<ArchivePage />} />
        <Route path='/manageusers' element={<ManageUsers />} />
      </Routes>
    </div>
  </div>
)
export default App;
