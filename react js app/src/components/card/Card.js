import React from "react";
import './Card.css'

function Card(props) {
  const { title, imageUrl, itemDesc } = props.item;

  return (
    <div className="card">
      <img
        src={imageUrl}
        alt="Avatar"
        style={{ "width": "50%" }}
      />
      <h4>{title}</h4>
      <small>{itemDesc}</small>
    </div>
  )
}

export default Card;