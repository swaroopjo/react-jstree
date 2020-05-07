import React from "react";
import ReactDOM from "react-dom";
import DemoTree from "./demo/DemoTree";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <DemoTree />
  </React.StrictMode>,
  rootElement
);
