import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.customStyles}
    >
      {props.buttonText}
    </button>
  )
}

export default Button;