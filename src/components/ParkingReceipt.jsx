import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TimeElapsedChip from "./TimeElapsedChip";
import { calculateBill } from "../utils/billing";

function ParkingReceiptPreview({ open, onClose, slotData, onEndBilling }) {
  const timeString = "0h 24m 40s";
  const bill = calculateBill(timeString).billAmount;
  console.log(`Total Bill: $${bill}`);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6">Parking Receipt Preview</Typography>
        <p>
          <strong>Parking No:</strong> P{slotData.id}
        </p>
        <p>
          <strong>Registration No:</strong> {slotData.registrationNumber}
        </p>
        <p>
          <strong>Entry Time:</strong>{" "}
          {new Date(slotData.entryTime).toLocaleString()}
        </p>
        <p>
          <strong>Time Elapsed:</strong>{" "}
          {<TimeElapsedChip startTime={slotData.entryTime} />}
        </p>
        <p>
          <strong>Bill Amount:</strong>{" "}
          {calculateBill(slotData.entryTime).billAmount}
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onEndBilling(slotData.id);
            onClose();
          }}
          color="primary"
          variant="contained"
        >
          End Billing and Print Receipt
        </Button>
        <Button onClick={onClose} color="primary" variant="outlined">
          Close Preview
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParkingReceiptPreview;
