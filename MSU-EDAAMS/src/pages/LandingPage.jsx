import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuAlertCircle } from "react-icons/lu";
import { useToast } from "../components/ToastService";
import image from "../pages/images/image3.png"
// import "../pages/CSS Files/LandingPage.css";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  // Checkbox,
} from "@material-tailwind/react";

const LandingPage = () => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
            toast.open(
              <div className="flex gap-2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                <LuAlertCircle size={40} />
                <div>
                  <Typography variant="h3">Success!</Typography>
                  <Typography variant="paragraph">
                    Welcome to EDAAMS.
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

        // Redirect to dashboard or protected route
        // navigate('/dashboard');
      })
      .catch((error) => {
        toast.open(
          <div className="flex gap-2 bg-red-800 text-white p-4 rounded-lg shadow-lg">
            <LuAlertCircle size={40} />
            <div>
              <Typography variant="h4">Login Error!</Typography>
              <Typography variant="paragraph">Login Error</Typography>
            </div>
          </div>
        );
        setError(error.response.data.message);
      });
  };

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="relative h-screen flex">
      <div className="flex flex-col items-start w-1/2">
        <div className="flex flex-col mt-40 ml-20">
          <Typography className="text-5xl mb-2 rounded-lg text-gray-900 tracking-tight font-extrabold">
            Mindanao State University
          </Typography>
          <Typography className="flex flex-col text-8xl mb-2 text-indigo-600 font-extrabold">
            EDAAMS
          </Typography>

          <Typography className="mb-1 text-gray-700">
            Electronic Document Approval and Archive Management System
          </Typography>
          <Typography className="mb-0 text-gray-700">
            A software solution designed to streamline document approval <br /> & track
            processes and efficiently manage document archives <br /> electronically.
          </Typography>
        </div>
        <div className="absolute inset-0 flex items-center ml-20 mt-48">
          <Button className="bg-indigo-600 hover-indigo-900" onClick={handleOpen}>Get Started</Button>
        </div>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Account Login
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              value={email}
              onChange={handleEmailChange}
              label="Email"
              size="lg"
            />
            <Input
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              size="lg"
              type="password"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleLogin} fullWidth>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      <div className="w-1/2 mt-12 mr-5">
        <img
          src={image}
          alt="image"
          className="h-auto w-full"
        />
      </div>
    </div>

  );
};

export default LandingPage;
