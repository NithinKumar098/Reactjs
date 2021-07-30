import { props } from "bluebird";
import React from "react";
import "./Tooltip.css";

function Tooltip() {
  return (
    <div className="tooltip">
      {props.children}
      <span className="tooltiptext">{props.text}</span>
    </div>
  )
}

export default Tooltip;