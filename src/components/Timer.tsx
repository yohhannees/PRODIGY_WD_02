import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning) {
      interval = window.setInterval(() => {
        setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setRemainingTime(initialTime);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Timer</h2>
      <p>{formatTime(remainingTime)}</p>
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
