import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import AuthContext from './AuthContext';
// import TransactionsContext from "./TransactionsContext";
import './Home.css';
import Payment from './Payment';
import Loading from './Loading';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function Home() {
  const [auth, setAuth] = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTransactions() {
    try {
      let _token = localStorage.getItem("_token");
      let username = localStorage.getItem("username");
      const transactions = await axios.get(`${BASE_URL}transactions/`, {params: {_token}});
      const user = await axios.get(`${BASE_URL}users/${username}`, {params: {_token}});
      console.log("user", user.data.user);
      setPayments(transactions.data.transactions);
      setAuth(true);
      setLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTransactions();
  }, [auth]);

  return (
    <div className="all-transactions">
      {auth ? <h1>Cash App</h1> : <Redirect to="/"/>}
      <h3>All Transactions</h3>
      {loading ? <Loading /> 
      :
      <ul className="list-group list-group-flush transactions">
        {payments ? 
          payments.map(p => <Payment payment={p} key={p.id}/>) 
          : null}
      </ul>
      }
    </div>
  );
}

export default Home;