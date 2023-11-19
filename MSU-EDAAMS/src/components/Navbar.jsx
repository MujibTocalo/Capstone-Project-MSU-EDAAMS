import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  menu,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { RiMenuLine, RiMenuUnfoldFill, RiNotification3Fill } from "react-icons/ri";
import logo from "../assets/msulogo.png";
import Notification from "../assets/notification.svg";
import avatar from "../assets/profile icon.png";
import Sidebar from "./Sidebar";
import { TiThMenuOutline } from "react-icons/ti";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(avatar);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    collegeOrOffice: "",
  });

  const closeMenu = () => setIsMenuOpen(false);
  const openProfileDialog = () => setIsProfileDialogOpen(true);
  const closeProfileDialog = () => {
    setIsProfileDialogOpen(false);
    setSelectedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageClick = () => {
    // Trigger the file input click when the profile image is clicked
    document.getElementById("profileImageInput").click();
  };

  useEffect(() => {
    if (selectedImage) {
      setProfileImage(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(storedUserDetails);
  }, []);

  return (
    <div>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom-end"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <MenuHandler>
          <div className="relative">
            <label htmlFor="profileImage" className="cursor-pointer">
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="tania andrew"
                  className={`border border-blue-200 p-0.5`}
                  src={profileImage}
                  onClick={handleImageClick}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </label>
          </div>
        </MenuHandler>

        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;

            return (
              <MenuItem
                key={label}
                onClick={() => {
                  closeMenu();
                  if (label === "My Profile") {
                    openProfileDialog();
                  }
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Dialog
        open={isProfileDialogOpen}
        onClose={closeProfileDialog}
        className="bg-transparent shadow-none"
      >
        <Card className="flex flex-col w-96 h-96 mx-auto items-center justify-center mb-4">
          <CardBody className="p-60 items-center relative">
            <label htmlFor="profileImage" className="text-gray-700 font-bold cursor-pointer">
              <div className="flex flex-col items-center group">
                <img
                  src={profileImage}
                  alt="avatar"
                  id="profileImage"
                  className="w-32 h-32 rounded-full border border-gray-500 cursor-pointer group-hover:opacity-75 transition-opacity"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  id="profileImageInput"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* ... (camera icon) */}
                </div>
              </div>
            </label>
            <div className="mt-4 text-center">
              <Typography
                as="p"
                variant="lg"
                className="font-bold text-2xl text-black"
              >
                {userDetails.firstName} {userDetails.lastName}
              </Typography>
              <Typography as="p" variant="sm" className="text-black-900">
                {userDetails.collegeOrOffice}
              </Typography>
              <Typography as="p" variant="sm" className="text-gray-600">
                {userDetails.designation}
              </Typography>
            </div>
            <Button color="red" className="" onClick={closeProfileDialog}>
              Close
            </Button>
          </CardBody>
          <CardFooter className="flex">
            {/* ... (other card footer content) */}
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export const CustomNavbar = ({ setOpen }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userDesignation, setUserDesignation] = useState();
  const [userCollege, setUserCollege] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    setUserDesignation(userDetail.designation);
    setCurrentUser(userDetail.firstName + " " + userDetail.lastName);
    setUserCollege(userDetail.office);
  });

  return (
    <div className="flex max-w-screen items-center rounded-lg shadow-lg justify-between p-1 mb-2">
      <Typography className="flex flex-row gap-4 items-center ml-2 text-lg p-0.5 pr-3 text-center font-semibold text-black rounded-lg">
        <TiThMenuOutline onClick={() => setOpen((prevOpen) => !prevOpen)} className="flex rounded-lg w-8 h-8 p-1 translate-x-2 cursor-pointer hover:scale-110" />
        MSU EDAAMS
      </Typography>

      <div className="flex flex-row items-center gap-8">
        {/* <div className="flex relative">
            <RiNotification3Fill
              className="cursor-pointer"
              color="gray"
              size={28}
            />
            <div className="flex bg-red-600 text-xs font-light border rounded-lg p-1.5 h-4 w-4 items-center justify-center translate-x-4 -translate-y-1 absolute">
              4
            </div>
          </div> */}
        <div className="flex flex-row justify-center items-center rounded-xl p-1 px-2 cursor-default text-xs">
          <Typography className="flex font-md text-gray-700">
            {currentUser + " | " + userDesignation + ' | ' + userCollege}
          </Typography>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

