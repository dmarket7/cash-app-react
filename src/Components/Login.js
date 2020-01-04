import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";
import UserContext from "./UserContext";
import LoginForm from "./LoginForm";

function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const [username, setUsername] = useContext(UserContext);

  const token = localStorage.getItem("_token");
  if(token) setAuth(true);
  const user = localStorage.getItem("username");
  if(user) setUsername(user);

  return (
    auth ? <Redirect to="/transactions" /> :
    <LoginForm />
  );
}

export default Login;