import React from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";

function DisplayPomodoro({ TimerData, isTimerRunning, setTimerData, isVisible }) {
  let {
    focusSecs,
    counter,
    focusTime,
    displayName,
    breakTime,
    breakSecs,
    onFocus,
  } = TimerData;
  let paused = !isTimerRunning ? "block" : "none";
  let currentSession = onFocus
    ? {
        mins: focusTime,
        secs: focusSecs,
      }
    : { mins: breakTime, secs: breakSecs };

  useInterval(
    () => {
      setTimerData((Data) => {
        if (
          Data.displayName === "Focusing" &&
          Data.counter >= Data.focusSecs
        ) {
          Data.counter = 0;
          Data.displayName = "On Break";
          Data.onFocus = !Data.onFocus;
          new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        } else if (
          Data.displayName === "On Break" &&
          Data.counter >= Data.breakSecs
        ) {
          Data.counter = 0;
          Data.displayName = "Focusing";
          Data.onFocus = !Data.onFocus;
          new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        }

        return { ...Data, counter: Data.counter + 1 };
      });
    },
    isTimerRunning ? 1000 : null
  );
  let time = `${(counter / currentSession.secs) * 100}`;
 
  
  return isVisible && (
    
    <div style={{ display: `${TimerData.display}` }}>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {displayName} for {minutesToDuration(currentSession.mins)} minutes
          </h2>
          
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(currentSession.secs - counter)} remaining
          </p>
        </div>
      </div>
      <div style={{ display: paused }}>
        <h3>Paused</h3>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={time} //Increase aria-valuenow as elapsed time increases
              style={{ width: `${time}%` }} //Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayPomodoro;