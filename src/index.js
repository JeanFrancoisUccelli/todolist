import React from "react";
import ReactDOM from "react-dom";
import Main from "./containers/Main/";
import App from "./App";

import "./styles.css";

const obj = {
  name: "all is ok",
};

//simple destructuring
const { name } = obj;
console.log(name);

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
