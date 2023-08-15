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

  const stopwatchRadius = 70; // Set your desired radius for the circular stopwatch

  const animationStyles = {
    animationPlayState: isRunning ? "running" : "paused",
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Stopwatch</h2>
      <div className="relative w-24 h-24">
        <div
          className="absolute border-4 border-blue-500 border-solid rounded-full w-full h-full"
          style={animationStyles}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <p className="text-2xl font-semibold mt-4">
            {formatTime(elapsedTime)}
          </p>
          {isRunning && (
            <button
              onClick={startStopwatch}
              className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Lap
            </button>
          )}
          <button
            onClick={startStopwatch}
            className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            onClick={resetStopwatch}
            className="bg-red-500 text-white py-1 px-4 mt-2 rounded hover:bg-red-600 transition duration-300"
          >
            Reset
          </button>
          {laps.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Laps</h3>
              <ul>
                {laps.map((lapTime, index) => (
                  <li key={index} className="text-md font-medium text-gray-600">
                    {formatTime(lapTime)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
