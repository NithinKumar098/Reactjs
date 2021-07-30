import React from "react";
import Card from "../components/card/Card";
import { items } from "../staticData/itemsData";

function HomePage(props) {
  return (
    <>
      <div className="home-content">
        <h2>Check all the items over here...!</h2>
      </div>

      <div className="list-items">
        {items.map((item, index) => {
          return (
            <Card key={index} item={item} />
          )
        })}
      </div>
    </>
  )
}

export default HomePage;