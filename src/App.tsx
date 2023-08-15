
import Stopwatch from "../src/components/Stopwatch";
import Timer from "../src/components/Timer";

function App() {
  return (
    <div className="App flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
      <Stopwatch />
      <Timer initialTime={0} />
    </div>
  );
}

export default App;
