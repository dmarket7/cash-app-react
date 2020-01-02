import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";
import LoginForm from "./LoginForm";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function Login() {
  const [auth] = useContext(AuthContext);

  // useEffect(() => {
  //   try {
  //     const result = axios.post(BASE_URL + "login", {
  //       username: "dmarket7",
  //       password: "abc123"
  //     });
  //     result.then(({data}) => {
  //       const token = data.token;
  //       localStorage.setItem("_token", token);
  //       setAuth(true);
  //       console.log("Auth in Login", auth)
  //     });
  //   } catch(err){
  //     console.log(err);
  //   }

  // });

  return (
    auth ? <Redirect to="/transactions" /> :
    <LoginForm />
  );
}

export default Login;