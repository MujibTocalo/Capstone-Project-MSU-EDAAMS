// Import necessary components and icons
import React from "react";
import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

// Document component
const Document = (props) => {
  const {
    difference,
    positive = false,
    sx,
    value,
    category,
    initialCount,
  } = props;

  return (
    <Card sx={{ width: "300px", ...sx, mx: "auto" }}>
      <CardContent>
        <Stack
          alignItems="flex-center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
              sx={{ fontWeight: "600", fontSize: "12px" }}
            >
              MSU EDAAMS
            </Typography>
            <Typography variant="h5">
              {category} Documents ({initialCount})
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            {/* <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon> */}
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={3} sx={{ mt: 1 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {/* {positive ? <ArrowUpIcon /> : <ArrowDownIcon />} */}
              </SvgIcon>
              {/* <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography> */}
            </Stack>
            {/* <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography> */}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

// Dashboard component
const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 mt-10 ml-5">
        Welcome to Your Dashboard
      </h1>
      {/* Four Document components with different categories and initial counts */}
      <div className="flex gap-10">
        <Document
          value="Budget 1"
          difference={10}
          positive={true}
          category="All"
          initialCount={50} // Example initial count
        />
        <Document
          className=""
          value="Budget 2"
          difference={15}
          positive={false}
          category="Approved"
          initialCount={20} // Example initial count
        />
        <Document
          value="Budget 3"
          difference={5}
          positive={true}
          category="Pending"
          initialCount={30} // Example initial count
        />
        <Document
          value="Budget 4"
          difference={-8}
          positive={false}
          category="Reject"
          initialCount={10} // Example initial count
        />
      </div>
    </div>
  );
};

export default Dashboard;
