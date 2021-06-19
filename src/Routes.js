import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./pages/Header";
import DashboardContainer from "./pages/DashboardContainer";

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Header setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/login"
          render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          exact
          path="/dashboard"
          render={() =>
            isLoggedIn ? <DashboardContainer /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
