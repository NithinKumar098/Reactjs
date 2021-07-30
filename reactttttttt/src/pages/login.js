import react, { Component, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {users} from "../util/userData"


const Login = (props) => {
  
  let history = useHistory();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailError , setemailError] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
 

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 3
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      enteredEmail.includes("@") && event.target.value.trim().length > 3
    );
  };

  const validateEmailHandler = () => {
    if(!enteredEmail.includes("@")){
      setEmailIsValid(enteredEmail.includes("@"))
      setemailError('Enter correct Email')
    }
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 3);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userLoggedIn = users.find(user => (user.email == enteredEmail , user.password == enteredPassword))
    if (userLoggedIn !== undefined) {
      props.loginUser(userLoggedIn);
     history.push(`/home/${userLoggedIn.name}`);
      //history.push('/')
    }
    else {
      setemailError('Enter correct Email')
     // setFormIsValid(false)
    }
  };

  return (
    <div className="loginForm col-md-4">
      <p>Default User :- test@test.com , Password:test</p>
      <Form onSubmit={submitHandler} noValidate>
        <Form.Group controlId="formBasicName">
          <Form.Label>Email</Form.Label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            className="form-control"
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <span className="error">{emailError}</span>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </Form.Group>
        

        <div>
          <Button type="submit"  className='mt-3' disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
