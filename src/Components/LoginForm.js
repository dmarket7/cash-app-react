import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import "./LoginForm.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function LoginForm() {
  
  const [auth, setAuth] = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState({username: false});

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(BASE_URL + "login", {
        username,
        password
      });
      const token = result.data.token;
      localStorage.setItem("_token", token);
      localStorage.setItem("username", username);
      setAuth(true);
    } catch(err){
      console.log(err);
      setInputError({username: true})
    }
  }

  useEffect(() => {
    console.log("Auth from LoginForm", auth);
  }, [auth]);
  
  return (
    auth ? 
      <Redirect to="/transactions" /> 
      : 
      <div className="form-container">
        <h2>Cash App!</h2>
        <p>Sign up for $10k! (not really)</p>
        <br></br>
        <form onSubmit={handleSubmit} className="form-group">
          <h1>Login</h1>
          <div>
            <label>Username</label>
            <input onChange={e => setUsername(e.target.value)} name="username" value={username} type="text" placeholder="Username" className="form-control"/>
          </div>
          <div>
            <label className="my-2">Password</label>
            <input onChange={e => setPassword(e.target.value)} name="password" value={password} type="password" placeholder="Password" className="form-control"/>
          </div>
          {inputError.username ? <p style={{color: "red"}}>Something went wrong. Try again</p> : null}

          <input type="submit" className="btn btn-primary"/>
        </form>
        <h5>Don't have an account?</h5>
        <Link to="/signup"><h5>Sign Up Here</h5></Link>
      </div>
    );
  }
  
  export default LoginForm;