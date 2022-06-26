import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import "normalize.css";
import "./style/style.scss";
import Home from "./container/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Helmet>
      <title>{window.localStorage.title || "Blog"}</title>
    </Helmet>
    <Home />
  </React.StrictMode>
);
