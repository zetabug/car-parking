import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "./Datatable";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { calculateBill, saveBill } from "../utils/billing";

function Billing(props) {
  const data = props.slotData.filter((x) => x.occupied);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter data based on the search query
  const filteredData = data.filter((item) =>
    item.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onEndBilling = (id) => {
    const slot = props.slotData.find((x) => x.id === id);
    const bill = {
      parkingSlotId: slot.id,
      registrationNumber: slot.registrationNumber,
      entryTime: slot.entryTime,
      ...calculateBill(slot.entryTime),
    };
    slot.entryTime = null;
    slot.occupied = false;
    slot.registrationNumber = null;
    props.setSlotData([...props.slotData]);
    saveBill(bill);
  };

  return (
    <>
      <Typography variant="h4" component="h2" m={2}>
        Currently Billing
      </Typography>
      <TextField
        id="input-with-icon-textfield"
        label="Registeration number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size="medium"
        variant="outlined"
        onChange={handleSearchInputChange}
        value={searchQuery}
      />
      <Box flex={1} mt={3}>
        <DataTable onEndBilling={onEndBilling} data={filteredData} />
      </Box>
    </>
  );
}

export default Billing;
