import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from './AuthContext';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

function Home() {
  const [loading, updateLoading] = useState(true);
  const [transactions, updateTransactions] = useState([]);
  // const [loggedIn, updateLoggedIn] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  async function getTransactions(_token) {
    try {
      let _token = localStorage.getItem("_token");
      console.log("_token", _token);
      // if(_token) updateLoggedIn(true);
      const transactions = await axios.get(`${BASE_URL}transactions/`, {params: {_token}});
      console.log("transactions", transactions);
      // updateTransactions(transactions || []);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTransactions();
    updateLoading(false);
  }, [transactions, updateTransactions]);

  return (
    loading ? <div>Loading...</div> :
    <div>
      {auth ? <h1>Search</h1> : null}
      <h2>Transactions</h2>
    </div>
  );
}

export default Home;