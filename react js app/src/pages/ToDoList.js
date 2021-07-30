import React, { useState } from "react";

import { items } from "../staticData/itemsData";
import CloseIcon from "../svg/Close";

function ToDoList(props) {
  const [listItems, setListItems] = useState(props.filteredList.length > 0 ? props.filteredList : items);

  const markAsDone = (event, selectedItem) => {
    if (event.target.tagName === 'P') {
      event.target.classList.toggle('markedDone');
    }

    items.map((item) => {
      if (item.id === selectedItem.id) {
        item.done = event.target.classList.contains('markedDone');
      }
    })
  }

  const deleteTodoHandler = (event, selectedItem) => {
    event.preventDefault();

    let currentItems = listItems;
    let itemIndex = currentItems.findIndex((item) => item.id === selectedItem.id);

    if (itemIndex > -1) {
      currentItems.splice(itemIndex, 1);
      setListItems([...currentItems]);
    }
  }

  return (
    <div className="to-do-list-control">
      {listItems.map((item, index) => {
        return (
          <div key={item.id} className="todo-list-item" onClick={(e) => markAsDone(e, item)}>
            <p style={{ "textDecoration": (item.done) ? "markedDone" : '', "cursor": "pointer" }}>{item.title}</p>

            <div onClick={(e) => deleteTodoHandler(e, item)}>
              <CloseIcon />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ToDoList;