import React, { Fragment, useState } from "react";

import Input from "../components/input/Input";
import Button from "../components/button/Button";
import ErrorAlert from "../components/error/Alert";
import { items } from "../staticData/itemsData";
import ToDoList from "./ToDoList";

function AddToDo() {
  const [enteredItem, setEnteredItem] = useState('');
  const [enteredItemTouched, setEnteredItemTouched] = useState(false);
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  const itemIsValid = enteredItem.trim().length > 6;
  const itemInputIsInValid = !itemIsValid && enteredItemTouched;

  const submitButtonStyles = {
    width: "50%",
    background: "rgb(34, 193, 195)",
    color: "rgb(255, 255, 255)",
    padding: "8px",
    margin: "24px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }

  const itemChangeHandler = (event) => {
    let searchText = event.target.value;

    let searchedItem = items.filter(item => {
      return item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) == true;
    })

    setFilteredTodoList(searchedItem);
    setEnteredItem(event.target.value);
  }

  const validateItemHandler = () => {
    setEnteredItemTouched(true);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (itemInputIsInValid) {
      return;
    }

    const newItem = {
      id: Math.random().toString(36).substring(7),
      title: enteredItem,
      imageUrl: "https://www.hpl-service.eu/content/images/thumbs/def/default-image_600.png",
      done: false
    }

    items.push(newItem);

    setEnteredItem('');
  }

  return (
    <Fragment>
      <h2 style={{ "textAlign": "center" }}>
        Check & add your list of items here...!
      </h2>

      {/* {itemInputIsInValid && <ErrorAlert errorValue="Enter atleast 7 characters!" />} */}

      <div className="to-do-form-control">
        <form className="todo-form" onSubmit={submitHandler}>
          <div style={{ "width": "100%", "marginRight": "0.1rem" }}>
            <Input
              type="text"
              id="toDo"
              name="toDo"
              placeholder="Search and add the item..."
              enteredInput={enteredItem}
              inputChangeHandler={itemChangeHandler}
              validateInputHandler={validateItemHandler}
            // inputIsInValid={itemInputIsInValid}
            // errorText="Item must have atleast 7 characters"
            />
          </div>

          <Button
            buttonText="Add Item"
            customStyles={submitButtonStyles}
          />
        </form>
      </div>

      <ToDoList filteredList={filteredTodoList} />
      
    </Fragment>
  )
}

export default AddToDo;