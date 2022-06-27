import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../store";
import HomeManagement from "./container/HomeManagement";

import "normalize.css";
import "./style.scss";
import "antd/dist/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HomeManagement />
    </Provider>
  </React.StrictMode>
);
