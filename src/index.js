import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { MyTodoApp } from "./app.js";

const App = () => {
  return (
    <div>
      <MyTodoApp />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

