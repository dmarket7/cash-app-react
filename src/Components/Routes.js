import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function Routes() {

  return (
    <div className='routes-container'>
      <BrowserRouter>
        <Switch >
          <Route exact path="/" 
            render={() => <Login />}/>
          <Route exact path="/transactions" 
            render={() => <Home /> }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;