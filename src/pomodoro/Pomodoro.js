import React, { useState } from "react";
import DisplayPomodoro from "./DisplayPomodoro";
import Timers from "./Timers";
import Buttons from "./Buttons";


function Pomodoro() {
  const initialState = {
    focusTime: 25,
    breakTime: 5,
    counter: 0,
    onFocus: true,
    focusSecs: 1500,
    breakSecs: 300,    
    displayName: "Focusing",
    display: `none`,    
  };
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [TimerData, setTimerData] = useState({ ...initialState });
  const [isStopped, setIsStopped] = useState(true);
  // set play pause functionality, press play set isStopped to false.

  function playPause() {
    if (!isTimerRunning) {         
      setIsStopped(false);
    }
    setIsTimerRunning(!isTimerRunning);  
    setTimerData({ ...TimerData, display: "block" });
    
  }
  
  
  function stop() {
    setTimerData({ ...initialState });
    setIsTimerRunning(false);
    setIsStopped(true);
  }

  return (
    <div className="pomodoro">
      <Timers
        TimerData={TimerData}
        isTimerRunning={isTimerRunning}
        setTimerData={setTimerData}
      />
      <Buttons
        playPause={playPause}
        isTimerRunning={isTimerRunning}
        stop={stop}
      />
      <DisplayPomodoro
        isVisible={!isStopped}
        TimerData={TimerData}
        isTimerRunning={isTimerRunning}
        setTimerData={setTimerData}
      />
    </div>
  );
}

export default Pomodoro;