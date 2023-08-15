import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState(initialTime / 60000);

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
    setRemainingTime(inputTime * 60000);
    setIsRunning(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetTimer();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const timerRadius = 70; // Set your desired radius for the circular timer

  const animationStyles = {
    animationDuration: `${initialTime / 60000}m`,
    animationPlayState: isRunning ? "running" : "paused",
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Timer</h2>
      <div className="relative w-24 h-24">
        <div
          className="absolute border-4 border-blue-500 border-solid rounded-full w-full h-full"
          style={animationStyles}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="number"
              value={inputTime}
              onChange={(e) => setInputTime(Number(e.target.value))}
              className="w-16 mb-2 py-1 px-2 text-center border border-gray-300 rounded"
            />
            <span className="text-gray-500">minutes</span>
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Set Timer
            </button>
          </form>
          <p className="text-2xl font-semibold mt-4">
            {formatTime(remainingTime)}
          </p>
          <button
            onClick={toggleTimer}
            className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="bg-red-500 text-white py-1 px-4 mt-2 rounded hover:bg-red-600 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
