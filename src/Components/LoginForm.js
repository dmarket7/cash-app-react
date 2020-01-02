import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function LoginForm() {
  
  const [auth, setAuth] = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(BASE_URL + "login", {
        username,
        password
      });
      const token = result.data.token;
      localStorage.setItem("_token", token);
      setAuth(true);
    } catch(err){
      console.log(err);
    }
  }
  
  return (
    auth ? 
      <Redirect to="/transactions" /> 
      : 
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input onChange={e => setUsername(e.target.value)} name="username" value={username} type="text" placeholder="Username"/>
          </div>
          <div>
            <label>Password</label>
            <input onChange={e => setPassword(e.target.value)} name="password" value={password} type="password" placeholder="Password"/>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
  
  export default LoginForm;
    // useEffect(() => {
    //   try {
    //     const result = axios.post(BASE_URL + "login", {
    //       username: "dmarket7",
    //       password: "abc123"
    //     });
    //     result.then(({data}) => {
    //       const token = data.token;
    //       localStorage.setItem("_token", token);
    //       console.log("token", token)
    //       setAuth(true);
    //       console.log("Local storage", localStorage.getItem("_token"))
    //     })
    //   } catch(err){
    //     console.log(err);
    //   }
  
    // }, [auth, setAuth])