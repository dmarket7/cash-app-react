import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './Signup.css';
import AuthContext from "./AuthContext";
import UserContext from "./UserContext";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function Signup() {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [inputError, setInputError] = useState({username: false});

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(BASE_URL + "users", {
        username,
        password,
        first_name,
        last_name
      });
      const token = result.data.token;
      localStorage.setItem("_token", token);
      localStorage.setItem("username", username);
      setAuth(true);
      setUser(username);
    } catch(err){
      console.log(err);
      setInputError({username: true})
    }
  }

  useEffect(() => {
    console.log("Auth from Signup", auth);
  }, [auth]);
  
  return (
    auth ? 
      <Redirect to="/transactions" /> 
      : 
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <div className="form-group label-group">
            <label htmlFor="username">Username</label>
            {inputError.username ? <p style={{color: "red"}}>Username already exists</p> : null}
            <input onChange={e => setUsername(e.target.value)} name="username" value={username} type="text" placeholder="Username" className="form-control"/>
          </div>
          <div className="form-group label-group">
            <label>Password</label>
            <input onChange={e => setPassword(e.target.value)} name="password" value={password} type="password" placeholder="Password" className="form-control"/>
          </div>
          <div className="form-group label-group">
            <label>First Name</label>
            <input onChange={e => setFirstName(e.target.value)} name="first_name" value={first_name} type="text" placeholder="First Name" className="form-control"/>
          </div>
          <div className="form-group label-group">
            <label>Last Name</label>
            <input onChange={e => setLastName(e.target.value)} name="last_name" value={last_name} type="text" placeholder="Last Name" className="form-control"/>
          </div>
          <input type="submit" className="btn btn-primary"/>
        </form>
      </div>
    );
}

export default Signup;