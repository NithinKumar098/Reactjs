import React from "react";
import "./Modal.css";
import CloseIcon from "../../svg/Close";

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close" onClick={props.closeModal}>
          <CloseIcon />
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  )
}

export default Modal;