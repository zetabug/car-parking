import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";

function OccupiedSlotDialog({ open, onClose, slotData, onEndBilling }) {
  function calcEntrytime(time) {
    const isoString = time;

    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Get hours, minutes, and seconds from the Date object
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Determine whether it's AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Format the time as hh:mm:ss AM/PM
    const formattedTime = `${String(formattedHours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${period}`;

    return formattedTime; // Output: "02:46:20 PM"
  }
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogTitle>
            Entry time:{calcEntrytime(slotData.entryTime)}
          </DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onEndBilling(slotData.id)}
            color="primary"
            variant="contained"
          >
            End billing and print receipt
          </Button>
          <Button onClick={onClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OccupiedSlotDialog;
