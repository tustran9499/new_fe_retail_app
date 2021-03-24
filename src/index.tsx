import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountLayout from "./themes/account/layout";
import ProductLayout from "./themes/product/layout";
import "./themes/style.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading... </div>}>
        <Switch>
          <Route
            path="/account"
            render={(props: any) => <AccountLayout {...props} exact />}
          />
          <Route
            path="/product"
            render={(props: any) => <ProductLayout {...props} exact />}
          />
          <Route path="/" render={(props: any) => <App {...props} exact />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
