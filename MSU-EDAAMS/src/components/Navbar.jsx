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
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { RiNotification3Fill } from "react-icons/ri";
import logo from "../assets/msulogo.png";
import Notification from "../assets/notification.svg";
import avatar from "../assets/profile icon.png";

// Profile menu component
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
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    if (selectedImage) {
      setProfileImage(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <div>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom-end"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MenuHandler>
          <div className="relative">
            <label
              htmlFor="profileImage"
              className="cursor-pointer"
            >
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="tania andrew"
                  className={`border border-blue-200 p-0.5 ${
                    isHovered ? "opacity-0" : "opacity-100"
                  }`}
                  src={profileImage}
                />
                {isHovered && (
                  <PlusIcon
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-500"
                    onClick={() => openProfileDialog()}
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
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active/bg-red-500/10"
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
        <Card className="flex flex-col w-96 mx-auto items-center justify-start mb-4">
          <CardBody className="p-60">
            <label htmlFor="profileImage" className="text-gray-700 font-bold">
              <div className="flex items-center">
                <img
                  src={profileImage}
                  alt="avatar"
                  className="flex flex-col w-24 h-24 rounded-full border border-gray-500"
                />
                <input
                  type="file"
                  id="profileImage"
                  onChange={handleImageUpload}
                  className="flex"
                />
              </div>
            </label>
          </CardBody>
          <CardFooter>
            <Button
              color="red"
              className="px-4 py-2"
              onClick={closeProfileDialog}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export const CustomNavbar = () => {
  const [currentUser, setCurrentUser] = useState();
  const [userDesignation, setUserDesignation] = useState();

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem("userDetails"));
    setUserDesignation(userDetail.designation);
    setCurrentUser(userDetail.firstName + " " + userDetail.lastName);
  }, []);

  return (
    <Navbar className="flex max-w-screen items-center mx-auto justify-between  p-1 my-1">
      <Typography className="ml-6 text-xl py-1.5 font-bold">
        MSU EDAAMS
      </Typography>
      <div className="flex flex-row items-center gap-5">
        <div className="flex relative">
          <RiNotification3Fill
            className="cursor-pointer"
            color="gray"
            size={28}
          />
          <div className="flex bg-red-600 text-xs font-light border rounded-lg p-1.5 h-4 w-4 items-center justify-center translate-x-4 -translate-y-1 absolute">
            4
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Typography className="flex text-md text-gray-700">
            {currentUser}
          </Typography>
        </div>
        <ProfileMenu />
      </div>
    </Navbar>
  );
};
