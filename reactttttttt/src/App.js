import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './pages/Nav';
import './App.css';
import Login from './pages/login';
import Home from "./pages/home"
import UpdateUser from './pages/updateUser'
import Products  from './pages/product';
import TodooList from './pages/todoList';

class App extends Component {

  constructor(){
    super()
    this.state ={
      loginPerson : 'Guest',
      loginDetails : {"name":"Guest"},
      loggedIn : false
    }
  }
   
  loginUser(userLoggedIn){
    this.setState({'loginPerson': userLoggedIn.name , "loggedIn":true , 'loginDetails':userLoggedIn})
  }
  logoutUser(){
    //console.log('logged out')
    this.setState({"loggedIn":false , 'loginPerson':'Guest', 'loginDetails' : {"name":"Guest"}})
    //history.push('/login')
  }
    
  render() {

    return  (
    <div>
     
      <div>
      <Nav loggedInUser={this.state.loginDetails} loggedInValid={this.state.loggedIn}  logoutUser={()=>{
        this.logoutUser()
      }}/>
       
    </div>
    <div>
      <Route path="/login" render={()=>(
        <Login loginUser={(userLoggedIn)=>{
          this.loginUser(userLoggedIn)
        }}/>
       )
      }/>
       <Route
          path="/home/:user"
            render={(props) => (
            <Home
            
            />
          )}
          />
          <Route
          path="/update/:user"
            render={(props) => (
            <UpdateUser  loginDetails={this.state.loginDetails} logoutUser={()=>{
              this.logoutUser()
            }}
            
            />
          )}
          />
          <Route
          path="/products/:user"
            render={(props) => (
            <Products  loginDetails={this.state.loginDetails}/>
          )}
          />
          <Route
          path="/todolist/:user"
            render={(props) => (
            <TodooList  loggedInUser={this.state.loginDetails} loggedInValid={this.state.loggedIn}/>
          )}
          />
        
      
    </div>
    
      
    </div>
      
    )
    
  }
}

export default withRouter(App);
