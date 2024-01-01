import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuAlertCircle } from "react-icons/lu";
import { useToast } from "../components/ToastService";
import image from "../pages/images/image3.png";
// import "../pages/CSS Files/LandingPage.css";

import image1 from "../pages/images/asset 2@3x.png";
import MSULogo from "../assets/msulogo.png";
import CICSLogo from "../assets/CICS_Logo.png";
import { useEffect } from "react";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import Typed from 'react-typed';

const LandingPage = ({ socket }) => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    socket?.emit('newUser', user);
  }, [user])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:7000/user/login", { email, password })
      .then((response) => {
        const { token, userId } = response.data;
        localStorage.setItem("token", token);

        // Use the userId to fetch user details
        axios
          .get(`http://localhost:7000/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((userResponse) => {
            const userDetails = userResponse.data;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            setUser(email)
            toast.open(
              <div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant="h5">Authenticated!</Typography>
                  <Typography variant="paragraph">
                    You are logged in successfully.
                  </Typography>
                </div>
              </div>
            );

            // Redirect to profile page or protected route
            navigate("/documents");
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          const { status, data } = error.response;
          if (status === 401) {
            toast.open(
              <div className="flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg">
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant="h4">Login Error!</Typography>
                  <Typography variant="paragraph">{data.message}</Typography>
                </div>
              </div>
            );
          } else if (status === 403) {
            toast.open(
              <div className="flex gap-2 bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant="h4">Inactive User!</Typography>
                  <Typography variant="paragraph">{data.message}</Typography>
                </div>
              </div>
            );
          } else {
            toast.open(
              <div className="flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg">
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant="h4">Server Error!</Typography>
                  <Typography variant="paragraph">
                    An unexpected error occurred. Please try again later.
                  </Typography>
                </div>
              </div>
            );
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      });
  };

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="relative h-screen bg-indigo-50/50 overflow-x-hidden overflow-y-scroll flex flex-col">
      <div className="flex flex-col items-start">
        <div className="flex mx-auto bg-indigo-800 h-14 items-center w-screen justify-end">
          <ul className="flex flex-row gap-6 text-white font-medium mr-16">
            {/* <li className="hover:cursor-pointer hover:scale-105">Documents</li>
            <li className="hover:cursor-pointer hover:scale-105">Memorandum</li>
            <li className="hover:cursor-pointer hover:scale-105">
              Special Order
            </li> */}
            {/* <li className="hover:cursor-pointer hover:scale-105">Archive</li> */}
            <li className="hover:cursor-pointer hover:scale-105">About Us</li>
            <li className="hover:cursor-pointer hover:scale-105">Contacts</li>
            <li className="hover:cursor-pointer hover:scale-105">Services</li>
          </ul>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col mt-20 ml-14 text-center my-auto mx-auto gap-1.5">
            <div className="flex flex-row my-auto h-24 w-28 items-center justify-center mb-6 mx-auto">
              <img
                src={MSULogo}
                alt="Logo"
                className="flex flex-row mt-6 h-28 w-28 items-center justify-center mb-2 mx-auto"
              />
              <img src={CICSLogo} alt="Logo" />
            </div>
            <Typography className="text-4xl whitespace-pre rounded-lg text-gray-900 tracking-tight font-semibold">
              Mindanao State University
            </Typography>{" "}
            <Typography className="text-lg whitespace-pre mb-2 rounded-lg text-gray-600 tracking-tight font-medium">
              College of Information and Computing Sciences
            </Typography>
            {/* <Typography className="flex flex-col text-8xl mb-5 text-indigo-600 font-extrabold">
              EDAAMS  
            </Typography> */}
            <Typed
              className="flex flex-row text-7xl items-center content-center justify-center mb-5 text-indigo-600 font-extrabold "
              strings={['EDAAMS']}
              typeSpeed={120}
              backSpeed={140}
              loop
            />


            <Typography className="font-semibold text-lg whitespace-pre text-gray-800">
              " Electronic Document Approval & Archive Management System "
            </Typography>
            <Typography className="mb-0 text-md text-gray-700">
              A software solution designed to streamline document approval{" "}
              <br /> & track processes and efficiently manage document archives{" "}
              <br /> electronically.
            </Typography>
            <Button
              className="flex mx-auto rounded-3xl mt-6 bg-indigo-500 hover:bg-indigo-900 hover:scale-110 text-sm"
              onClick={handleOpen}
            >
              Get Started
            </Button>
          </div>
          <div className="flex p-8 my-auto scale-90">
            <img src={image1} alt="image" />
          </div>
        </div>
        <Dialog
          size="sm"
          open={open}
          handler={handleOpen}
          className="flex bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[20rem]">
            {/* <CardHeader
              variant="standard"
              color="indigo"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Account Login
              </Typography>
            </CardHeader> */}
            <CardBody className="flex flex-col gap-4">
              <Typography
                className="flex flex-col align items-center"
                variant="h4"
                color="blue-gray"
              >
                Sign In
              </Typography>
              <Typography
                className="mb-3 font-normal text-sm align items-center"
                variant="paragraph"
                color="gray"
              >
                Enter your email and password to Sign In.
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Your Email
              </Typography>
              <Input
                value={email}
                onChange={handleEmailChange}
                label="Email"
                size="lg"
              />
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input
                value={password}
                onChange={handlePasswordChange}
                label="Password"
                size="lg"
                type="password"
              />
            </CardBody>
            <CardFooter className="pt-0 hover:scale-105">
              <Button
                color="indigo"
                variant="gradient"
                onClick={handleLogin}
                fullWidth
              >
                Sign In
              </Button>
            </CardFooter>
            <Typography variant="small" className="mb-6 flex justify-center">
              {/* Don&apos;t have an account? */}
              {/* <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography> */}
            </Typography>
          </Card>
        </Dialog>
      </div>
    </div>
  );
};

export default LandingPage;
