
import "./index.css";
import Stopwatch from "../src/components/Stopwatch";
import Timer from "../src/components/Timer";

function App() {
  return (
    <div className="App">
      <Stopwatch />
      <Timer initialTime={0}/>
    </div>
  );
}

export default App;
