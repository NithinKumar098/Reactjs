import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , NavDropdown, Button , FormControl , Form } from 'react-bootstrap';

//const history = useHistory()
const Nav = (props) => {
    let history = useHistory();
    
    

    
    
    const logoutUser = (event) =>{
        closeNav()
        event.preventDefault();
        props.logoutUser()
        history.push('/login');

    }
    const updateUser = (event) =>{
        closeNav()
        event.preventDefault();
        history.push(`/update/${props.loggedInUser.name}`);

    }
    const productHandler = (event) => {
        closeNav()
        history.push(`/products/${props.loggedInUser.name}`);
    }
    const openNav=()=> {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
    const closeNav =()=> {
    document.getElementById("mySidenav").style.width = "0";
    }
    const loginHandler=()=>{
        closeNav()

    }

    const todoListHandler=()=>{
        closeNav()
        history.push(`/todolist/${props.loggedInUser.name}`);
    }
    
        return <>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">{props.loggedInUser.name}</Navbar.Brand>
            <span className="openNv"  onClick={openNav}>&#9776; open</span>
            <div id="mySidenav" className="sidenav">
            <button  className="closebtn" onClick={closeNav}>&times;</button>
            <div className="mt-3">
            {props.loggedInValid
            ?<button className="btn btn-primary ml-2 col-11" onClick={logoutUser}>Log Out</button>
            :<Link className="Login btn btn-primary ml-2 col-11" onClick={loginHandler} to="/login">Login</Link>
             }
            {props.loggedInValid &&
                <button className="btn btn-primary mt-3 ml-2 col-11 " onClick={updateUser}>Update User</button>
            } 
            {props.loggedInValid &&
                <button className="btn btn-primary mt-3 ml-2 col-11" onClick={productHandler}>My Products</button>
            } 
            {props.loggedInValid &&
                <button className="btn btn-primary mt-3 ml-2 col-11" onClick={todoListHandler}>To Do List</button>
            } 

            </div>
            </div>
            
            
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
           
                 
           
           
            <Navbar.Text>
               
             
            </Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
      </>
    
}

export default Nav