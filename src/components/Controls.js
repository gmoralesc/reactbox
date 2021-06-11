import React from "react";

export const Controls = ({ prev, shuffle, next }) => {
  return (
    <div className="control">
      <button onClick={prev}>
        <i className="fas fa-backward"></i>
      </button>
      <button onClick={shuffle}>Shuffle</button>
      <button>
        <i className="fas fa-play"></i>
      </button>
      <button onClick={next}>
        <i className="fa fa-forward"></i>
      </button>
    </div>
  );
};
