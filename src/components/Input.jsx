import React from "react";
import { ReactComponent as AddIcon } from "../images/add.svg";
import "../styles/Input.css";

export const Input = () => {
  return (
    <div className="containerInput">
      <input className="input"></input>
      <AddIcon className="img" />
    </div>
  );
};
