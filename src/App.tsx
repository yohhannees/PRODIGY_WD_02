import React from "react";
import "./App.css";
import Stopwatch from ".";
import Timer from "./Timer";

function App() {
  return (
    <div className="App">
      <Stopwatch />
      <Timer initialTime={5 * 60 * 1000} /> {/* 5 minutes */}
    </div>
  );
}

export default App;
