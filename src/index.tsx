import React from "react";
import ReactDOM from "react-dom";
import "./css/main.css";
import App from "./components/App";
import Root from "./Root";

ReactDOM.render(
    <React.StrictMode>
        <Root>
            <App />
        </Root>
    </React.StrictMode>,
    document.getElementById("root")
);
