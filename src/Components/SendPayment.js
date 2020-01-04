import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import AuthContext from './AuthContext';
import UserContext from "./UserContext";
import './SendPayment.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function SendPayment(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [username, setUsername] = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);

  async function getUsers() {
    try {
      let _token = localStorage.getItem("_token");
      setUsername(localStorage.getItem("username"));
      console.log("_token", _token);
      const usersFromDB = await axios.get(`${BASE_URL}users/`, {params: {_token}});
      console.log("users", usersFromDB.data.users);
      setUsers(usersFromDB.data.users.filter(user => user.username !== username));

      const user = await axios.get(`${BASE_URL}users/${username}`, {params: {_token}});
      setCurrentUser(user.data.user);
      setAuth(true);
    } catch(err) {
      console.error(err);
    }
  }

  async function sendPayment() {
    try {
      let _token = localStorage.getItem("_token");
      let floatAmt = parseFloat(amount);
      const payment = await axios.post(`${BASE_URL}transactions/`, {_token, receiver, amt: floatAmt, sender: username});
      console.log("Payment Sent", payment.data);
      props.history.push(`/users/${username}`)
    } catch(err) {
      console.log(err.error);
      setError(true);
    }
  }

  useEffect(() => {
    getUsers();
  }, [auth]);

  return (
    <div className="payment-container">
      <h3>Wallet</h3>
      {currentUser ? <h2 className="text-success">${currentUser.wallet}</h2> : null}
      <br></br>
      <h2>Send Payment</h2>
      <form
        className="form-group"
        onSubmit={e => {
          e.preventDefault();
          sendPayment();
        }}
      >
        <select
          value={receiver}
          className="form-control"
          onChange={e => setReceiver(e.target.value)}
          onBlur={e => setReceiver(e.target.value)}
          placeholder="--Select--"
        >
          <option value="">--Select--</option>
          {users ? users.map(u => <option value={u.username} key={u.username}>{u.username}</option>) : null}
        </select>
        <h4>Amount $$</h4>
        <input
          type="text"
          className="form-control"
          value={`${amount}`}
          placeholder="Amount: $0"
          onChange={e => setAmount(e.target.value)}
        />
        <input className="btn btn-success my-1" type="submit" />
      </form>
      {error ? <p className="text-danger">Something went wrong. Try again.</p> : null}
    </div>
  );
}

export default SendPayment;