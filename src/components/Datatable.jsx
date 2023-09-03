import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TimeElapsedChip from "./TimeElapsedChip";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PreviewIcon from "@mui/icons-material/Preview";
import IconButton from "@mui/material/IconButton";
import ParkingReceiptPreview from "./ParkingReceipt";

// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const DataTable = ({ data, onButtonClick, onEndBilling }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  const handleOpenDialog = (props) => {
    setDialogProps(props);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Registration Number</TableCell>
              <TableCell>Entry Time</TableCell>
              <TableCell sx={{ display: "flex" }}>
                <HourglassBottomIcon />
                Time Elapsed
              </TableCell>
              <TableCell>Preview Receipt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.registrationNumber}</TableCell>
                <TableCell>{new Date(item.entryTime).toLocaleString()}</TableCell>
                <TableCell>
                  <TimeElapsedChip startTime={item.entryTime} />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    onClick={() => handleOpenDialog(item)}
                  >
                    <PreviewIcon fontSize="large" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ParkingReceiptPreview
        open={openDialog}
        onClose={handleCloseDialog}
        slotData={dialogProps}
        onEndBilling={onEndBilling}
      />
    </>
  );
};

export default DataTable;
