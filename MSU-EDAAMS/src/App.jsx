import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'

import Login from "./pages/LoginPage";
import Registration from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage'
import CreateDocument from './pages/CreateDocument'
import Sidebar from "./components/Sidebar";
import ArchivePage from "./pages/ArchivePage";
import ManageUsers from "./pages/ManageUserPage";
import { CustomNavbar } from "./components/Navbar";

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
  <div className="flex flex-grow">
    <Sidebar />
    <div className="flex flex-col flex-grow">
      <CustomNavbar />
      <Routes>
        <Route path='/profilePage' element={<ProfilePage />} />
        <Route path='/createDocument' element={<CreateDocument />} />
        <Route path='/archive' element={<ArchivePage />} />
        <Route path='/manageusers' element={<ManageUsers />} />
      </Routes>
    </div>
  </div>

)

// const MainRoutes = () => (
//   <div className="flex flex-col">
//     <CustomNavbar />
//     <div className="flex flex-row ease-in-out">
//       <Sidebar />
//       <Routes>
//         <Route path='/profilePage' element={<ProfilePage />} />
//         <Route path='/createDocument' element={<CreateDocument />} />
//         <Route path='/archive' element={<ArchivePage />} />
//         <Route path='/manageusers' element={<ManageUsers />} />
//       </Routes>
//     </div>
//   </div>

// )
export default App;
