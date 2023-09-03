import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";

function UnoccupiedSlotDialog({ id, open, onClose, onStartBilling }) {
  const [registrationNumber, setRegistrationNumber] = useState("");

  const handleInputChange = (event) => {
    setRegistrationNumber(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} key={id}>
      <DialogTitle>Enter Registration Number</DialogTitle>
      <DialogContent>
        <TextField
          label="Registration Number"
          variant="outlined"
          fullWidth
          value={registrationNumber}
          onChange={handleInputChange}
          style={{ marginBottom: 5 }}
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {onStartBilling(id, registrationNumber);setRegistrationNumber("");}}
          color="primary"
          variant="contained"
        >
          Start billing
        </Button>
        <Button onClick={()=>{setRegistrationNumber("");onClose()}} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UnoccupiedSlotDialog;
