import "../CSS/todo.css";
import { react, Component } from "react";
import {todoList} from "../util/todoList"

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state={
            currentUser : props.loggedInUser,
            userTODOList : todoList.find(todoList => (todoList.userID == props.loggedInUser.id)),
            todoList :[]
            
        }
        this.filterTODO = this.filterTODO.bind(this);
        this.addTODO = this.addTODO.bind(this)
      //  this.todoCompletedHandler = this.todoCompletedHandler.bind(this)
    }
    componentWillUnmount(){
        console.log('test')
    }
    
    componentDidMount() {
        let tmpArray = [];
        let i;
        for (i = 0; i < this.state.userTODOList.todo.length; i++) {
            tmpArray.push(this.state.userTODOList.todo[i])
        }
        this.setState({
            todoList: tmpArray 
        })
   
   
     }

  toListHandler(){
       var myNodelist = document.getElementById("todoUL");
      let i;
      for (i = 0; i < this.state.userTODOList.todo.length; i++) {
        let li = document.createElement("LI");
        let liText = document.createTextNode(this.state.userTODOList.todo[i].text);
        li.appendChild(liText);
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span)
        myNodelist.appendChild(li);
      }
  }

  filterTODO(event){ 
      let text = event.target.value;
      
      let filterTodo = this.state.userTODOList.todo.filter(todo => {
          return todo.text.toLocaleLowerCase().includes(text.toLocaleLowerCase()) == true;
      })
      this.setState({
        todoList: filterTodo 
     })

}

  // Create a new list item when clicking on the "Add" button
  addTODO (event) {
      let text = document.getElementById('myInput').value
     let userToDo =  todoList.find(todoList => (todoList.userID == this.state.currentUser.id)) 
        userToDo.todo.push({id: userToDo.todo.length,text:text , completed: false})

        this.setState({
            todoList: userToDo.todo 
        })
  };

  todoCompletedHandler( todo , ev ){
    let userToDo =  todoList.find(todoList => (todoList.userID == this.state.currentUser.id))
     if (ev.target.tagName === 'LI') {
         ev.target.classList.toggle('checked');
       }
    let classContant = ev.target.classList.contains('checked');
    userToDo.todo.map(data =>{
        if(data.id == todo.id){
            data.completed = classContant

        }
    })

  }

  render() {
    return (
      <>
        <div id="todoBox" className="header">
          <h2>My To Do List</h2>
          <input type="text" id="myInput" onChange={this.filterTODO} placeholder="Title..." />
          <span onClick={this.addTODO} className="addBtn">
            Add
          </span>
        </div>

        <ul id="todoUL">
        {this.state.todoList.map((todo, index)=>(
            <li className={todo.completed  ? "checked" : ""} key={index} onClick={this.todoCompletedHandler.bind(this, todo )} >{todo.text}</li>
        ))

        }
        
          
        </ul>
      </>
    );
  }
}

export default TodoList;
