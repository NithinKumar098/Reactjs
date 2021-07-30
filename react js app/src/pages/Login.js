import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../components/input/Input";
import Button from "../components/button/Button";
import ErrorAlert from "../components/error/Alert";
import InfoIcon from "../svg/Info";
import Tooltip from "../components/tooltip/Tooltip";
import { users } from "../staticData/usersData";
import AuthContext from "../store/auth-context";

function LoginPage(props) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const emailIsValid = enteredEmail.includes('@');
  const emailInputIsInValid = !emailIsValid && enteredEmailTouched;

  const passwordIsValid = enteredPassword.trim().length > 6;
  const passwordInputIsInValid = !passwordIsValid && enteredPasswordTouched;

  let formIsValid = emailIsValid && passwordIsValid ? true : false;

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const tooltipSection = {
    display: "flex",
    alignItems: "center",
    fontSize: "12px"
  }

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }

  const passwordChangeHanlder = (event) => {
    setEnteredPassword(event.target.value);
  }

  const validateEmailHandler = () => {
    setEnteredEmailTouched(true);
  }

  const validatePasswordHandler = () => {
    setEnteredPasswordTouched(true);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    const currentUser = users.filter((user) => {
      return user.email === enteredEmail && user.password === enteredPassword;
    })

    if (!formIsValid || (currentUser.length === 0)) {
      setShowErrorAlert(true);
      return;
    }


    authCtx.onLogin(enteredEmail, enteredPassword);
    history.push('/home');

    setEnteredEmail('');
    setEnteredPassword('');

    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  }

  return (
    <div>
      {showErrorAlert &&
        <ErrorAlert errorValue="User doesn't exist! Please login with valid Email & Password" />
      }

      <div className="form-control">
        <h2 style={{ "textAlign": "center" }}> Login Here </h2>
        <form onSubmit={submitHandler} noValidate>
          <Input
            inputLabel="Email"
            type="email"
            id="email"
            name="email"
            enteredInput={enteredEmail}
            inputChangeHandler={emailChangeHandler}
            validateInputHandler={validateEmailHandler}
            inputIsInValid={emailInputIsInValid}
            errorText="Enter valid Email"
          />

          <Input
            inputLabel="Password"
            type="password"
            id="password"
            name="password"
            enteredInput={enteredPassword}
            inputChangeHandler={passwordChangeHanlder}
            validateInputHandler={validatePasswordHandler}
            inputIsInValid={passwordInputIsInValid}
            errorText="Enter valid Password"
          />

          <Button
            buttonText="Login"
            disabled={!formIsValid}
          />

          <div style={{ "marginTop": "-10px", }}>
            <Tooltip text="Email: sowmya@gmail.com, Password: sowmya123">
              <div style={tooltipSection}>
                <InfoIcon />
                <p style={{ "marginLeft": "2px" }}>Check the default user credentials here...!</p>
              </div>
            </Tooltip>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;