import React, { useState, useRef } from "react";

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const startStopwatch = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>{(elapsedTime / 1000).toFixed(2)} seconds</p>
      <button onClick={startStopwatch}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
};

export default Stopwatch;
