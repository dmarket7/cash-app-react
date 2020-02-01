import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import UserDetails from "./UserDetails";
import SendPayment from "./SendPayment";
import PaymentDetail from "./PaymentDetail";

function Routes() {

  return (
    <Switch >
      <Route exact path="/" 
        render={() => <Login />}/>
      <Route exact path="/users/:username" 
        render={routeProps => <UserDetails {...routeProps}/>}/>
      <Route exact path="/signup"
        render={() => <Signup />}/>
      <Route exact path="/send"
        render={routeProps => <SendPayment {...routeProps}/>}/>
      <Route exact path="/transactions/:id" 
        render={routeProps => <PaymentDetail {...routeProps}/> }/>
      <Route exact path="/transactions" 
        render={() => <Home /> }/>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;