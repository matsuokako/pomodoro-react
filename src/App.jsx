import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev) => prev -1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <h2>作業中</h2>
      <button onClick={() => setRunning(true)}>スタート</button>
      <button onClick={() => setRunning(false)}>ストップ</button>
    </div>
  );
}

export default App;