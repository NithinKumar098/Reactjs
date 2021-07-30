import React from "react";

function Menu(props) {
  return (
    <div onClick={props.onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ "width": "20px", "height": "20px", "cursor": "pointer" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
  )
}

export default Menu;