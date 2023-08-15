import React, { useState, useRef } from "react";

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startStopwatch = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      startTimeRef.current = startTime;
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        const lapTime = Date.now() - startTimeRef.current;
        setLaps((prevLaps) => [...prevLaps, lapTime]);
      }
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setElapsedTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>{formatTime(elapsedTime)}</p>
      {isRunning && <button onClick={startStopwatch}>Lap</button>}
      <button onClick={startStopwatch}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={resetStopwatch}>Reset</button>
      {laps.length > 0 && (
        <div>
          <h3>Laps</h3>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>{formatTime(lapTime)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
