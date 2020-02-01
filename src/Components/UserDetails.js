import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import Payment from "./Payment";
import Loading from "./Loading";
import './UserDetails.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function UserDetails(props) {
  const username = props.match.params.username;
  const [auth, setAuth] = useContext(AuthContext);
  const [userState, setUserState] = useState({});

  async function getUser() {
    try {
      let _token = localStorage.getItem("_token");
      const user = await axios.get(`${BASE_URL}users/${username}`, {params: {_token}});
      setUserState(user.data.user);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
    setAuth(true);
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
            {userState.sent_payments.map(p => <Link to={`/transactions/${p.id}`} key={p.id}><Payment payment={p}/></Link>)}
          </ul>
        : <Loading />
        }
        <h2 className="heading">Payments Received</h2>
        {userState.received_payments ?
          <ul className="list-group list-group-flush transactions">
            {userState.received_payments.map(p => <Link to={`/transactions/${p.id}`} key={p.id}><Payment payment={p}/></Link>)}
          </ul>
        : <p>None</p>
        }
      </div>
    : <Redirect to="/" />
  );
}

export default UserDetails;