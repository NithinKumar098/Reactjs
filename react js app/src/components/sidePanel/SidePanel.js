import React, { useEffect } from "react";
import "./SidePanel.css";

function SidePanel(props) {
  return (
    <div id="menuPanel" className="sidepanel">
      <a className="closebtn" onClick={props.closeSidepanel}>×</a>
      {props.children}
    </div>
  )
}

export default SidePanel;