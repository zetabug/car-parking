import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Grid from "@mui/material/Grid";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    border: "1px solid #000",
    borderRadius: "4px",
    maxWidth: "600px", // Adjust the width as needed
    margin: "0 auto",
    padding: "10px",
  },
  header: {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  itemName: {
    flex: 1,
  },
  itemPrice: {
    flex: 3,
    textAlign: "right",
  },
  total: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: "10px",
  },
  footer: {
    marginTop: "20px",
    borderTop: "1px solid #000",
    paddingTop: "5px",
    textAlign: "center",
  },
};

function BillDetails() {
  const { id } = useParams(); // Get the id from the route's parameters

  // Function to fetch bill data from local storage using the id as the key
  const fetchBillFromLocalStorage = () => {
    const billData = localStorage.getItem(`${id}`);
    if (!billData) {
      return null;
    }
    return JSON.parse(billData);
  };

  const bill = fetchBillFromLocalStorage();

  // Function to trigger the print functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <Grid container p={10}>
      <Grid item xs={12}>
        <div style={styles.container}>
          <div style={styles.header}>Bill Receipt</div>
          <div style={styles.item}>
            <span style={styles.itemName}>Bill ID:</span>
            <span style={styles.itemPrice}>{id}</span>
          </div>
          <div style={styles.item}>
            <span style={styles.itemName}>Registeration No.:</span>
            <span style={styles.itemPrice}>{bill.registrationNumber}</span>
          </div>
          <div style={styles.item}>
            <span style={styles.itemName}>Entry Time:</span>
            <span style={styles.itemPrice}>{new Date(bill.entryTime).toLocaleString()}</span>
          </div>
          <div style={styles.item}>
            <span style={styles.itemName}>Exit Time:</span>
            <span style={styles.itemPrice}>{new Date(bill.exitTime).toLocaleString()}</span>
          </div>
          <div style={styles.item}>
            <span style={styles.itemName}>Total Parking Time:</span>
            <span style={styles.itemPrice}>{bill.totalTime} minutes</span>
          </div>
          <div style={styles.item}>
            <span style={styles.itemName}>Amount:</span>
            <span style={styles.itemPrice}>${bill.billAmount}</span>
          </div>
          {/* Add more bill details as needed */}
          <div style={styles.total}>Total: ${bill.billAmount}</div>
          <div style={styles.footer}>
            Thank you for parking with us!
            <br />
            Your satisfaction is our priority.
          </div>
          <button
            onClick={handlePrint}
            style={{ display: "block", margin: "20px auto" }}
          >
            Print Receipt
          </button>
        </div>
      </Grid>
    </Grid>
  );
}

export default BillDetails;
