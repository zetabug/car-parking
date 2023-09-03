const { v4: uuidv4 } = require("uuid");
export function calculateBill(startTime) {
  const startTimeDate = new Date(startTime);
  const currentTime = new Date();
  const timeDifference = currentTime - startTimeDate;

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  // Split the startTime into hours, minutes, and seconds

  // Calculate the total time in minutes
  const totalTimeInMinutes = hours * 60 + minutes + seconds / 60;

  // Define billing rates and thresholds
  const initialRate = 40; // $40 for the first 30 minutes
  const additionalRate = 10; // $10 for each additional 10 minutes
  const initialThreshold = 30; // 30 minutes
  const additionalThreshold = 10; // 10 minutes

  // Calculate the bill amount based on the time duration and rules
  let billAmount = 0;

  if (totalTimeInMinutes <= initialThreshold) {
    // Apply the initial rate for the first 30 minutes
    billAmount = initialRate;
  } else {
    // Apply the initial rate
    billAmount = initialRate;

    // Calculate additional billing for each 10 minutes beyond the initial 30 minutes
    const additionalTime = totalTimeInMinutes - initialThreshold;
    const additionalBlocks = Math.ceil(additionalTime / additionalThreshold);

    // Add the additional charges
    billAmount += additionalBlocks * additionalRate;
  }

  return {
    billAmount: billAmount.toFixed(2),
    exitTime: currentTime.toISOString(),
    totalTime: totalTimeInMinutes.toFixed(2),
  };
}

export function saveBill(bill) {
  try {
    const billId = `bill-${uuidv4()}`;
    localStorage.setItem(billId, JSON.stringify(bill));
    console.log("Bill saved!");
    window.open(`bills/${billId}`, "_blank");
  } catch (error) {
    console.log("Bill not saved!");
  }
}
