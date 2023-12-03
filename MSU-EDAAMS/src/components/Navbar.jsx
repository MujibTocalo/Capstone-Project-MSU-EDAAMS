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
import {
  RiMenuLine,
  RiMenuUnfoldFill,
  RiNotification3Fill,
} from "react-icons/ri";
import logo from "../assets/msulogo.png";
import Notification from "../assets/notification.svg";
import avatar from "../assets/profile icon.png";
import Sidebar from "./Sidebar";
import { TiThMenuOutline } from "react-icons/ti";
import msulogo from "../assets/msulogo.png";

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

  const [profileImage, setProfileImage] = useState(null);
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
    setSelectedImage(`http://localhost:7000${file}`);
  };

  const handleImageClick = () => {
    // Trigger the file input click when the profile image is clicked
    document.getElementById("profileImageInput").click();
  };

  useEffect(() => {
    if (selectedImage) {
      setProfileImage(URL.createObjectURL(selectedImage));
    }
  }, []);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log(storedUserDetails);
    setUserDetails(storedUserDetails);
    setProfileImage(storedUserDetails.profilePicture);
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
            <label className="cursor-pointer">
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                {profileImage && (
                  <Avatar
                    src={`http://localhost:7000${profileImage}`}
                    alt="tania andrew"
                    className={`flex border border-white-300 p-0.5`}
                  />
                )}
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
                  className="font-normal "
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
        <Card className="mx-auto w-full max-w-[20rem] h-full max-h-[40rem]">
          <CardBody className="flex flex-col gap-4">
            <label
              htmlFor="profileImage"
              className="text-gray-700 font-bold cursor-pointer"
            >
              <div className="flex flex-col items-center group">
                <Typography className=" text-black-300 mb-4" variant="h4">
                  User Profile
                </Typography>
                {profileImage && (
                  <Avatar
                    size="xxl"
                    src={`http://localhost:7000${profileImage}`}
                    alt="profile"
                    className={`flex border border-blue-200 p-0.5`}
                  />
                )}
                <input
                  type="file"
                  id="profileImageInput"
                  onChange={handleImageUpload}
                  onClick={handleImageClick}
                  className="hidden"
                />
                <Typography
                  as="p"
                  variant="sm"
                  className="border-black p-3 rounded-md text-black-400 pb-2 font-bold text-lg"
                >
                  {userDetails.designation}
                </Typography>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </label>
            <div className="mb-1text-start">
              <Typography
                variant="h7"
                color="blue-gray"
                className="mb-2 text-sm text-blue-gray-400"
              >
                First Name
              </Typography>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "1px",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  as="p"
                  variant="lg"
                  className="border-black p-2 text-black-200 pb-2 text-md"
                >
                  {userDetails.firstName}
                </Typography>
              </div>
              <Typography
                variant="h7"
                color="blue-gray"
                className="mb-2 text-sm mt-2 text-blue-gray-400"
              >
                Last Name
              </Typography>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "1px",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  as="p"
                  variant="lg"
                  className="border-black p-2 text-black-200 pb-2 text-md"
                >
                  {userDetails.lastName}
                </Typography>
              </div>
              <Typography as="p" variant="sm" className="text-black">
                {userDetails.collegeOrOffice}
              </Typography>
            </div>
            <Button color="red" className="" onClick={closeProfileDialog}>
              Close
            </Button>
            {/* <CardFooter className="flex flex-row justify-center mt-10">
              
            </CardFooter> */}
          </CardBody>
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
    <div className="flex max-w-screen items-center bg-indigo-500 justify-between p-1">
      <Typography className="flex flex-row gap-4 items-center ml-2 text-lg p-0.5 pr-3 text-center font-semibold text-white rounded-lg">
        <TiThMenuOutline
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          className="flex rounded-lg w-8 h-8 p-1 -translate-x-2 cursor-pointer hover:scale-110"
        />
        <img src={msulogo} alt="logo" className="flex flex-row h-10" />
        MSU EDAAMS
      </Typography>

      <div className="flex flex-row items-center gap-1">
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
        <div className="flex flex-col justify-center items-center rounded-xl p-1 cursor-default">
          <Typography className="flex font-md text-md text-white">
            {currentUser}
          </Typography>
          {/* <Typography className="flex text-xs text-white opacity-80">
              {userDesignation + ' | ' + userCollege}
            </Typography> */}
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};
