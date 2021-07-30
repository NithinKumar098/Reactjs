import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { users } from "../staticData/usersData";
import AuthContext from "../store/auth-context";

function ProfileSettings(props) {
  const [enteredName, setEnteredName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const [enteredDob, setEnteredDob] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  let nameInputIsInValid;

  const passwordIsValid = enteredPassword.trim().length > 6;
  const passwordInputIsInValid = !passwordIsValid && enteredPasswordTouched;

  let formIsValid = passwordIsValid ? true : false;

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  let userData = history.location.state
    ? history.location.state.userInfo
    : users[0];

  const dateInputStyles = {
    width: '50%',
    marginRight: '1rem'
  }

  const ageInputStyles = {
    width: '50%',
  }

  const deleteButtonStyles = {
    backgroundColor: "#ff0808",
    border: "none",
    color: "white",
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    width: "100%",
    borderRadius: "4px"
  }

  useEffect(() => {
    if (userData) {
      setEnteredName(userData.name);
      setEnteredDob(userData.dob);
    }
  }, [userData])

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  }

  const dobChangeHandler = (event) => {
    setEnteredDob(event.target.value);
  }

  const validateNameHandler = () => {

  }

  const validatePasswordHandler = () => {
    setEnteredPasswordTouched(true);
  }

  const calculateAge = (dob) => {
    let today = new Date();
    let birthDate = new Date(dob);

    let currentAge = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      currentAge--;
    }

    setEnteredAge(currentAge);
  }

  useEffect(() => {
    if (enteredDob) {
      calculateAge(enteredDob);
    }
  }, [enteredDob])

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const userIndex = users.findIndex((user) => user.id === userData.id);

    let updatedUserData = userData;

    updatedUserData.name = enteredName;
    updatedUserData.password = enteredPassword;
    updatedUserData.dob = enteredDob;

    if (userIndex > -1) {
      users[userIndex] = updatedUserData;
      authCtx.onLogout();
      history.replace('/');
    }
  }

  const deleteCurrentUser = (event) => {
    event.preventDefault();

    const userIndex = users.findIndex((user) => user.id === userData.id);

    if (userIndex > -1) {
      users.splice(userIndex, 1);
      authCtx.onLogout();
      history.replace('/');
    }
  }

  return (
    <Fragment>
      <div className="user-form-control">
        <h2 style={{ "textAlign": "center" }}>Please update your information below...!</h2>
        <hr />
        <form className="profile-form" onSubmit={submitHandler}>
          <Input
            inputLabel="Name"
            type="text"
            id="name"
            name="name"
            enteredInput={enteredName}
            inputChangeHandler={nameChangeHandler}
            validateInputHandler={validateNameHandler}
            inputIsInValid={nameInputIsInValid}
          />

          <Input
            inputLabel="New Password"
            type="password"
            id="password"
            name="password"
            enteredInput={enteredPassword}
            inputChangeHandler={passwordChangeHandler}
            validateInputHandler={validatePasswordHandler}
            inputIsInValid={passwordInputIsInValid}
            errorText="Password must have atleast 7 characters"
          />

          <div style={{ "display": "flex", "alignItems": "center", "marginTop": "-1rem" }}>
            <Input
              inputLabel="DOB"
              type="date"
              id="dob"
              name="dob"
              enteredInput={enteredDob}
              inputChangeHandler={dobChangeHandler}
              customStyles={dateInputStyles}
            />

            <Input
              inputLabel="Age"
              type="text"
              id="age"
              name="age"
              enteredInput={enteredAge}
              customStyles={ageInputStyles}
              disabled={true}
            />
          </div>

          <div style={{ "display": "flex" }}>
            <Button
              buttonText="Update"
              disabled={!formIsValid}
            />

            <Button
              buttonText="Delete"
              onClick={deleteCurrentUser}
              customStyles={deleteButtonStyles}
            />
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default ProfileSettings;