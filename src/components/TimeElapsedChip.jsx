import React, { useState, useEffect } from 'react';

function TimeElapsedChip({ startTime }) {
  const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime(startTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(calculateElapsedTime(startTime));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  function calculateElapsedTime(startTime) {
    const startTimeDate = new Date(startTime);
    const currentTime = new Date();
    const timeDifference = currentTime - startTimeDate;
    
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <div>
      <p>{elapsedTime}</p>
    </div>
  );
}

export default TimeElapsedChip;
