//global imports
import React from "react";
import ReactDOM from "react-dom";

//3p imports
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

//local imports
import App from "./App";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>,
    rootElement
);
