import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Dialog,
  cardFooter,
  checkbox,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Option,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Switch,
} from "@material-tailwind/react";

import { format } from "date-fns";
import {
  LuCheckSquare,
  LuDelete,
  LuEdit,
  LuPenTool,
  LuTrash,
} from "react-icons/lu";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Chairperson",
    value: "chairperson",
  },
  {
    label: "College Dean",
    value: "College Dean",
  },
  {
    label: "OVCAA",
    value: "Office of Vice Chancellor for Academic Affairs",
  },
  {
    label: "OP",
    value: "Office of the President",
  },
  {
    label: "Administrator",
    value: "admin",
  },
];

const TABLE_HEAD = [
  "Name",
  "User Type",
  "College/Office",
  "Designation",
  "Status",
  "Action",
];

const ManageUsers = () => {
  const [tableRows, setTableRows] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [userType, setUsertype] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [office, setOffice] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signature, setSignature] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTableRows, setFilteredTableRows] = useState([]);

  const [confirmRegistrationDialog, setConfirmRegistrationDialog] =
    useState(false);

  const handleOpenRegistrationConfirmation = () => {
    setConfirmRegistrationDialog(true);
  };

  const handleCloseRegistrationConfirmation = () => {
    setConfirmRegistrationDialog(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    userId: null,
    currentStatus: null,
  });

  const handleCancelStatusToggle = () => {
    // Close the confirmation dialog
    setConfirmDialog({
      open: false,
      userId: null,
      currentStatus: null,
    });
  };

  useEffect(() => {
    const fetchTableRows = async () => {
      try {
        const response = await axios.get("http://localhost:7000/user");
        const responseData = response.data;
        const userArray = responseData.user;

        const sortedUsers = userArray.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTableRows(sortedUsers); // Populate tableRows with the fetched data
        setFilteredTableRows(sortedUsers); // Set filteredTableRows initially
      } catch (error) {
        console.log(error);
      }
    };

    fetchTableRows();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the tableRows based on the user's name
    const filteredRows = tableRows.filter((row) =>
      `${row.firstName} ${row.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    setFilteredTableRows(filteredRows);
  };

  const handleUserType = (e) => {
    setUsertype(e);
  };

  const handleFirstNameChange = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastname(e.target.value);
  };
  const handleOfficeChange = (e) => {
    setOffice(e);
  };
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignature = (e) => {
    setSignature(e.target.files[0]);
    console.log(signature);
  };
  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
    console.log(profilePicture);
  };
  const handleToggleStatus = (userId, currentStatus) => {
    setConfirmDialog({
      open: true,
      userId,
      currentStatus,
    });
  };

  const handleConfirmStatusToggle = async () => {
    try {
      const { userId, currentStatus } = confirmDialog;

      // Determine the new status based on the current status
      const newStatusValue = currentStatus ? "InActive" : "Active";

      // Send a request to the backend to toggle the status using fetch
      const response = await fetch(
        `http://localhost:7000/user/${userId}/toggle-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: newStatusValue,
          }),
        }
      );

      console.log("API Response:", response);

      if (response.ok) {
        // Update the status locally in the state
        setTableRows((prevRows) =>
          prevRows.map((user) =>
            user._id === userId ? { ...user, status: newStatusValue } : user
          )
        );
      } else {
        // Handle the case where the response indicates an error
        console.error("Error toggling user status:", response.status);
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    } finally {
      // Close the confirmation dialog
      setConfirmDialog({
        open: false,
        userId: null,
        currentStatus: null,
      });
    }
  };

  const AddUser = async () => {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("office", office);
    formData.append("designation", designation);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userType", userType);
    formData.append("signature", signature);

    try {
      const response = await axios.post(
        "http://localhost:7000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("User registered successfully");
        setOpen(false); // Close the registration dialog
        handleOpenRegistrationConfirmation(); // Open the confirmation dialog
      }
    } catch (error) {
      console.log("Error:", error.response?.data || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <Card className="h-full w-full rounded-lg bg-white">
      <Dialog
        size="sm"
        open={confirmRegistrationDialog}
        handler={handleCloseRegistrationConfirmation}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader className="mb-4 grid h-16 place-items-center bg-indigo-800">
            <Typography variant="h4" color="white">
              Registration Successful!
            </Typography>
          </CardHeader>
          <CardBody
            color="white"
            className="flex flex-col h-36 gap-5 overflow-auto "
          >
            <Typography variant="body" color="blue-gray">
              User has been registered successfully!
            </Typography>
          </CardBody>
          <CardFooter className="flex mx-auto">
            <Button
              className="flex text-white bg-indigo-800 hover:scale-105"
              variant="standard"
              onClick={handleCloseRegistrationConfirmation}
            >
              OK
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog
        size="sm"
        open={confirmDialog.open}
        handler={handleCancelStatusToggle}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader className="mb-4 grid h-16 place-items-center bg-indigo-800">
            <Typography variant="h4" color="white">
              Confirm Status Change
            </Typography>
          </CardHeader>
          <CardBody
            color="white"
            className="flex flex-col h-36 gap-5 overflow-auto"
          >
            <Typography variant="body" color="blue-gray">
              Are you sure you want to change the status?
            </Typography>
          </CardBody>
          <CardFooter className="flex mx-auto gap-3">
            <Button
              className="flex text-white bg-red-500 hover:scale-105"
              variant="standard"
              onClick={handleCancelStatusToggle}
            >
              Cancel
            </Button>
            <Button
              className="flex text-white bg-indigo-800 hover:scale-105"
              variant="standard"
              onClick={handleConfirmStatusToggle}
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-white"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              User Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" color="blue-gray" size="sm">
              view all
            </Button> */}
            <div>
              <Button
                onClick={handleOpen}
                className="flex items-center gap-3 hover:scale-105"
                color="indigo"
                size="md"
              >
                {" "}
                Register User
              </Button>

              <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
              >
                <Card className="mx-auto w-full max-w-[24rem]">
                  <CardHeader className="mb-4 grid h-16 place-items-center bg-indigo-800">
                    <Typography variant="h4" color="white">
                      Register New User
                    </Typography>
                  </CardHeader>
                  <CardBody
                    color="white"
                    className="flex flex-col h-96 gap-5 overflow-auto"
                  >
                    <Input
                      label="Profile Picture"
                      type="file"
                      size="lg"
                      onChange={handleProfilePicture}
                    />

                    <Select
                      className="h-10"
                      variant="outlined"
                      label="Select User Type"
                      onChange={(e) => handleUserType(e)}
                      value={userType}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: -25 },
                      }}
                    >
                      <Option value="Uploader">Department Chairperson</Option>
                      <Option value="Approver - Dean">College Dean</Option>
                      <Option value="Endorser - OVCAA">
                        Office of the Vice Chancellor for Academic Affairs
                      </Option>
                      <Option value="Approver - OP">
                        Office of the President
                      </Option>
                      {/* <Option value='Administrator'>Administrator</Option> */}
                    </Select>

                    <Select
                      className="h-10"
                      variant="outlined"
                      label="Select College/Office"
                      onChange={(e) => handleOfficeChange(e)}
                      value={office}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: -25 },
                      }}
                    >
                      <Option value="OP">Office of the President</Option>
                      <Option value="OVCAA">
                        Office of Vice Chancellor for Academic Affairs
                      </Option>
                      <Option value="COA">College of Agriculture</Option>
                      <Option value="CBAA">
                        College of Business Administration and Accountancy
                      </Option>
                      <Option value="CED">College of Education</Option>
                      <Option value="COE">College of Engineering</Option>
                      <Option value="CFAS">
                        College of Fisheries and Aquatic Sciences
                      </Option>
                      <Option value="CFES">
                        College of Forestry and Environmental Sciences
                      </Option>
                      <Option value="CHARM">
                        College of Hotel and Restaurant Management
                      </Option>
                      <Option value="CICS">
                        College of Information and Computing Sciences
                      </Option>
                      <Option value="CSPEAR">CSPEAR</Option>
                      <Option value="CNSM">
                        College of Natural Science and Mathematics
                      </Option>
                      <Option value="CPA">College of Public Affairs</Option>
                    </Select>

                    <Input
                      label="First Name"
                      size="lg"
                      value={firstname}
                      onChange={handleFirstNameChange}
                    />
                    <Input
                      label="Last Name"
                      size="lg"
                      value={lastname}
                      onChange={handleLastNameChange}
                    />

                    <Input
                      label="Designation"
                      size="lg"
                      value={designation}
                      onChange={handleDesignationChange}
                    />
                    <Input
                      label="Email"
                      size="lg"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <Input
                      label="Password"
                      size="lg"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <Input
                      label="Signature"
                      type="file"
                      size="lg"
                      onChange={handleSignature}
                    />
                  </CardBody>
                  <CardFooter className="flex mx-auto">
                    <Button
                      className="flex text-white bg-indigo-500 hover:scale-105"
                      variant="standard"
                      onClick={AddUser}
                    >
                      Save Details
                    </Button>
                  </CardFooter>
                </Card>
              </Dialog>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Search by Name"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearch}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max whitespace-pre">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div> */}
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-indigo-50/50 p-4 sticky -top-8"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-90"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableRows.map(
              (
                {
                  _id,
                  userType,
                  firstName,
                  lastName,
                  email,
                  office,
                  designation,
                  status,
                },
                index
              ) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {firstName + " " + lastName}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col items-start gap-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-light"
                        >
                          {userType}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          ID: {_id}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {office}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium text-start"
                      >
                        {designation}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2 justify-start cursor pointer">
                        <Button
                          variant="outlined"
                          size="md"
                          onClick={() => handleToggleStatus(_id, status)}
                          value={status === "Active" ? "Active" : "Inactive"}
                          color={status === "Active" ? "green" : "red"}
                        >
                          {status === "Active" ? "Active" : "Inactive"}
                        </Button>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-1.5">
                        <LuEdit />
                        {/* <LuCheckSquare /> */}
                        {/* <LuTrash /> */}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default ManageUsers;
