import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import Payment from "./Payment";
import './UserDetails.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function UserDetails(props) {
  const username = props.match.params.username;
  const [auth, setAuth] = useContext(AuthContext);
  const [userState, setUserState] = useState({});

  async function getUser() {
    try {
      let _token = localStorage.getItem("_token");
      console.log("_token", _token);
      const user = await axios.get(`${BASE_URL}users/${username}`, {params: {_token}});
      // console.log("user", user.data.user);
      setUserState(user.data.user);
      console.log("User", userState)
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, [auth]);

  return (
    auth ? 
      <div className="my-3">
        <h2>{username}</h2>
        {userState.bio ? <p>{`Bio: ${userState.bio}`}</p> : null}
        <img className="img-thumbnail photo" src={userState.photo_url} alt={userState.username}/>
        <h2>Wallet</h2>
        <h1 style={{color: "green"}}>${userState.wallet}</h1>
        <h2 className="heading">Payments Sent</h2>
        {userState.sent_payments ?
          <ul className="list-group list-group-flush transactions">
            {userState.sent_payments.map(p => <Payment payment={p} key={p.id}/>)}
          </ul>
        : <p>None</p>
        }
        <h2 className="heading">Payments Received</h2>
        {userState.received_payments ?
          <ul className="list-group list-group-flush transactions">
            {userState.received_payments.map(p => <Payment payment={p} key={p.id}/>)}
          </ul>
        : <p>None</p>
        }
      </div>
    : <Redirect to="/" />
  );
}

export default UserDetails;