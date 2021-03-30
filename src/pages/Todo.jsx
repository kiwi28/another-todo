import React from "react";
import "../styles/Todo.css";

import { Input } from "../components/Input";

export const Todo = () => {
  return (
    <div className="todo">
      <h1 className="title">ToDo List</h1>
      <Input />
    </div>
  );
};
