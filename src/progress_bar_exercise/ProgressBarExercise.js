import React from "react";
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
  return (
    <div className="solution_container">
      <div className="button_group">

      </div>
    </div>
  )
};
