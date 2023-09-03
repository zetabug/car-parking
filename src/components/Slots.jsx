import React, { useEffect, useState } from "react";
import { Box, Grid, Chip, Stack } from "@mui/material";
import { Button } from "@mui/material";
import UnoccupiedSlotDialog from "./UnoccupiedSlotDialog";
import OccupiedSlotDialog from "./OccupiedSlotDialog";
import { calculateBill, saveBill } from "../utils/billing";

function Slots(props) {
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [dialogProps, setDialogProps] = useState({});
  const [dialog2Id, setDialog2Id] = useState(null);

  const slots = props.slotData;
  const occupiedCount = slots.filter((x) => x.occupied).length;
  const emptyCount = slots.filter((x) => !x.occupied).length;

  const handleOpenDialog1 = (props) => {
    setDialogProps(props);
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
  };

  const handleOpenDialog2 = (slotId) => {
    setDialog2Id(slotId);
    setOpenDialog2(true);
  };

  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
    setDialog2Id(null);
  };

  const onStartBilling = (id, registrationNumber) => {
    const slot = slots.find((x) => x.id === id);
    slot.occupied = true;
    slot.registrationNumber = registrationNumber;
    slot.entryTime = new Date().toISOString();
    props.setSlotData([...slots]);
    handleCloseDialog2();
  };

  const onEndBilling = (id) => {
    // TODO: Implement this
    const slot = slots.find((x) => x.id === id);
    const bill = {
      parkingSlotId: slot.id,
      registrationNumber: slot.registrationNumber,
      entryTime: slot.entryTime,
      ...calculateBill(slot.entryTime),
    };
    slot.entryTime = null;
    slot.occupied = false;
    slot.registrationNumber = null;
    props.setSlotData([...slots]);
    handleCloseDialog1();
    saveBill(bill);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={3} justifyContent={"center"}>
            <Chip label={"Occupied:" + occupiedCount} />
            <Chip label={"Empty:" + emptyCount} color="success" />
          </Stack>
        </Grid>
        <Grid item xs={12} marginTop={5}>
          <Grid container spacing={3}>
            {slots.map((slot) => (
              <Grid item xs={2} key={slot.id}>
                <Chip
                  label={"P" + slot.id}
                  onClick={
                    slot.occupied
                      ? () => handleOpenDialog1(slot)
                      : () => handleOpenDialog2(slot.id)
                  }
                  color={slot.occupied ? "default" : "success"}
                  style={{
                    borderRadius: "0%",
                    width: "100%",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <OccupiedSlotDialog
        open={openDialog1}
        onClose={handleCloseDialog1}
        slotData={dialogProps}
        onEndBilling={onEndBilling}
      />
      <UnoccupiedSlotDialog
        open={openDialog2}
        onClose={handleCloseDialog2}
        id={dialog2Id}
        onStartBilling={onStartBilling}
      />
    </>
  );
}

export default Slots;
