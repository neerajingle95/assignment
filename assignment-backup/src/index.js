import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./components/App";
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" exact component={Home} />
      <Route path="/search-bar" component={SearchBar} />
    </App>
  </BrowserRouter>,
  document.querySelector("#root")
);
