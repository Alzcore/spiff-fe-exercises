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

const Solution = () => {
  const [progress, setProgress] = useState(0);
  const [requestActive, setRequestActive] = useState(false);
  const [breakpoints, setBreakpoints] = useState([30, 45, 78]);
  const [breakpointsEnabled, setBreakpointsEnabled] = useState(true);

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

  useEffect(() => {
    const thresholdAmount = 6
    if(breakpoints.find(b => ((progress >= b - thresholdAmount ) && (progress <= b + thresholdAmount))) && breakpointsEnabled) {
      // add class to progress bar
      document.getElementById('progress-bar').classList.add('breakpoint-reached');
    }
    else {
      // remove class from progress bar
      document.getElementById('progress-bar').classList.remove('breakpoint-reached');
    }
  }, [progress, breakpointsEnabled]);

  function startRequest() {
    setProgress(0);
    setRequestActive(true);
  }

  function endRequest() {
    setRequestActive(false);
    setProgress(100);
  }

  return (
    <div className="solution-container">
      <progress data-testid="progress-bar" max={100} value={progress} active={requestActive.toString()}/>
      <div className="button-group">
        <button className="btn btn-green" data-testid="request-button-start" onClick={() => startRequest()} disabled={requestActive}>{requestActive ? "Loading..." : "Start Request"}</button>
        <button className="btn btn-purple" data-testid="breakpoint-toggle" onClick={() => setBreakpointsEnabled(!breakpointsEnabled)}>{breakpointsEnabled ? "Disable Breakpoints" : "Enable Breakpoints"}</button>
        <button className="btn btn-red" data-testid="request-button-end" onClick={() => endRequest()} disabled={!requestActive}>End Request</button>
      </div>
    </div>
  )
};
