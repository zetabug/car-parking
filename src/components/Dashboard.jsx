import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Slots from "./Slots";
import Billing from "./Billing";
import { Grid, Paper } from "@mui/material";

const localStorageKey = "parking-slot-data";
function generateInitialSlotData(count) {
  const initialSlotData = [];
  for (let i = 1; i <= count; i++) {
    const data = {
      id: i,
      occupied: false,
      registrationNumber: "",
      entryTime: "",
    };
    initialSlotData.push(data);
  }
  return initialSlotData;
}

export default function Dashboard() {
  const initialSlotData =
    JSON.parse(localStorage.getItem(localStorageKey)) ||
    generateInitialSlotData(24);
  const [slots, setSlots] = useState(initialSlotData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:5000/slots");
  //     setSlots(response);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(slots));
  }, [slots]);

  return (
    <>
      <Navbar />
      <Grid container spacing={2} p={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
            variant="outlined"
          >
            <Slots slotData={slots} setSlotData={setSlots} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
            variant="outlined"
          >
            <Billing slotData={slots} setSlotData={setSlots} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
