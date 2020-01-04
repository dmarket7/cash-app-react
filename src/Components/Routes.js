import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import UserDetails from "./UserDetails";
import SendPayment from "./SendPayment";

function Routes() {

  return (
    <div className='routes-container'>
      <Switch >
        <Route exact path="/" 
          render={() => <Login />}/>
        <Route exact path="/users/:username" 
          render={routeProps => <UserDetails {...routeProps}/>}/>
        <Route exact path="/signup"
          render={() => <Signup />}/>
        <Route exact path="/send"
          render={routeProps => <SendPayment {...routeProps}/>}/>
        <Route exact path="/transactions" 
          render={() => <Home /> }/>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;