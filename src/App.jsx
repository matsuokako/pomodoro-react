import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  const workMinutes = 25;
  const breakMinutes = 5;

  //const [workMinutes, setIsWorkTime] = useState(25);


  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          if (isWorkTime) {
            setIsWorkTime(false);
            return breakMinutes * 60;
          } else {
            setIsWorkTime(true);
            return workMinutes * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, isWorkTime]);

  const total = isWorkTime ? workMinutes * 60 : breakMinutes * 60;
  const percent = (time / total) * 100;

  return (
    <div className="container">
      <h1 className="timer">{formatTime(time)}</h1>
      <h2 className="mode">{isWorkTime ? "作業中" : "休憩中"}</h2>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${percent}%`,
            background: isWorkTime ? "#4CAF50" : "#2196F3"
          }}
        ></div>
      </div>

      <div className="buttons">
        <button onClick={() => setRunning(true)}>スタート</button>
        <button onClick={() => setRunning(false)}>ストップ</button>
        <button
          onClick={() => {
            setRunning(false);
            setIsWorkTime(true);
            setTime(workMinutes * 60);
          }}
        >
          リセット
        </button>
      </div>
    </div>
  );
}

export default App;