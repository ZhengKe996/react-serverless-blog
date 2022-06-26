import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import "normalize.css";
import "./style.scss";
import "antd/dist/antd.css";
import HomeManagement from "./container/HomeManagement";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Helmet>
      <title>{window.localStorage.title || "这是一个小站的后台"}</title>
    </Helmet>
    <HomeManagement />
  </React.StrictMode>
);
