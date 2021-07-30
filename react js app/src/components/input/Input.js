import React from "react";
import clsx from "clsx";
import "./Input.css";

function Input(props) {
  const {
    inputLabel,
    type,
    id,
    name,
    placeholder,
    enteredInput,
    inputChangeHandler,
    validateInputHandler,
    inputIsInValid,
    customStyles,
    disabled,
    errorText
  } = props;

  return (
    <div className=
      {clsx(
        'control',
        inputIsInValid ? 'invalid' : ''
      )}
      style={customStyles}
    >
      <label htmlFor={id}> {inputLabel} </label>

      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={enteredInput}
        onChange={inputChangeHandler}
        onBlur={validateInputHandler}
        disabled={disabled}
        style={{ "backgroundColor": disabled && "#ccc", "cursor": disabled && "not-allowed" }}
      />

      {inputIsInValid && <p className="errorText"> {errorText} </p>}

    </div>
  )
}

export default Input;