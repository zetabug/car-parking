import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";

function OccupiedSlotDialog({ open, onClose, slotData, onEndBilling }) {

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogTitle>
            Entry time: {new Date(slotData.entryTime).toLocaleString()}
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
