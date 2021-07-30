import React from "react";
import './Alert.css';

function Alert(props) {
  return (
    <div className="alert-card">
      <p>{props.errorValue}</p>
    </div>
  )
}

export default Alert;