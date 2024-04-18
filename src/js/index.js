//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";
import Alerta from "./component/Alerta.js";
import App from "./component/Alerta.js";
//render your react application


ReactDOM.render(<App />, document.querySelector("#app"));
