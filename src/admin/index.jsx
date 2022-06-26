import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./style.scss";
import "antd/dist/antd.css";
import HomeManagement from "./container/HomeManagement";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomeManagement />
  </React.StrictMode>
);
