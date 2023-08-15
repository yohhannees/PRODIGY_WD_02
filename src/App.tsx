
import "./index.css";
import Stopwatch from "../src/components/Stopwatch";
import Timer from "../src/components/Timer";

function App() {
  return (
    <div className="App">
      <Stopwatch />
      <Timer initialTime={5 * 60 * 1000} /> {/* 5 minutes */}
    </div>
  );
}

export default App;
