import React from "react";
import "./topic.css";

const Topic = ({ index, name,course }) => {
  return (
   
    <div className="stopic-row">
      <span className="stopic-name">Unit {index + 1}: {name}</span>
      <button className="take-test-button">Take Test</button>
    </div>
  );
};

export default Topic;
