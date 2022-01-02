import React, { useState, useEffect } from "react";
import Exercise from "../exercise/Exercise";
import './ProgressBar.scss'

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

export const Solution = () => {
  const [progress, setProgress] = useState(0);
  const [requestActive, setRequestActive] = useState(false);

  useEffect(() => {
    if(!requestActive) return
    const interval = setInterval(() => {
      if(progress <= 90) {
        const intervalProgress = 90 / 15;
        setProgress((prevProgress) => Math.min(prevProgress + intervalProgress, 90));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [requestActive]);

  function startRequest() {
    setProgress(0);
    setRequestActive(true);
  }

  function endRequest() {
    setRequestActive(false);
    setProgress(100);
  }

  return (
    <div className="solution_container">
      <div className="button_group">
        <button className="btn btn_green" data-testid="request-button-start" onClick={() => startRequest()} disabled={requestActive}>{requestActive ? "Loading..." : "Start Request"}</button>
        <button className="btn btn_red" data-testid="request-button-end" onClick={() => endRequest()} disabled={!requestActive}>End Request</button>
      </div>
    </div>
  )
};
