import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";

const columns = [
  { field: "parkingSlotId", headerName: "Parking slot", flex: 1 },
  {
    field: "registrationNumber",
    headerName: "Registeration Number",
    flex: 1,
  },
  {
    field: "entryTime",
    headerName: "Entry Time",
    flex: 1,
    renderCell: (params) => <>{new Date(params.value).toLocaleString()}</>,
  },
  {
    field: "exitTime",
    headerName: "Exit Time",
    flex: 1,
    renderCell: (params) => <>{new Date(params.value).toLocaleString()}</>,
  },
  {
    field: "id",
    headerName: "",
    flex: 1,
    renderCell: (params) => (
      <a
        href={`/bills/${params.value}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Bill
      </a>
    ),
  },
];

function BillsList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // Define the regular expression to match keys like "bill-1", "bill-2", etc.
    const keyRegex = /^bill-/;

    // Retrieve all keys from local storage
    const allKeys = Object.keys(localStorage);

    // Filter keys that match the regular expression
    const billKeys = allKeys.filter((key) => key.match(keyRegex));

    // Retrieve bill data from local storage using matching keys
    const billData = billKeys
      .map((key) => {
        const rawData = localStorage.getItem(key);
        return { ...JSON.parse(rawData), id: key }; // Assuming bill data is stored as JSON
      })
      .sort((a, b) => {
        // Convert exitTime strings to Date objects for comparison
        const dateA = new Date(a.exitTime);
        const dateB = new Date(b.exitTime);

        // Compare exitTime dates
        return dateB - dateA;
      });

    setBills(billData);
    console.log(billData);
  }, []);

  return (
    <>
      <Navbar />
      <Grid container p={5}>
        <Typography variant="h4" component="h2" m={2} width={"100%"}>
          Bill History
        </Typography>
        <DataGrid rows={bills} columns={columns} disableRowSelectionOnClick />
      </Grid>
    </>
  );
}

export default BillsList;
