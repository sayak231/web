import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Header from "./Header";
import Log from "./components/Login";

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/protect" component={Protected} />
          <Route exact path="/s" component={Log} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
