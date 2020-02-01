import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from './AuthContext';
import "./PaymentDetail.css";
import Loading from "./Loading";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";


function PaymentDetail(props) {
  const paymentID = props.match.params.id;
  const [auth, setAuth] = useContext(AuthContext);
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatDate(date) {
    let d = new Date(date);
    return d.toDateString();
  }

  async function getTransaction() {
    try {
      let _token = localStorage.getItem("_token");
      const transaction = await axios.get(`${BASE_URL}transactions/${paymentID}`, {params: {_token}});
      transaction.data.transaction.formatDate = formatDate(transaction.data.transaction.paid_date)
      setPayment(transaction.data.transaction);
      setAuth(true);
      setLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTransaction();
  }, [auth]);

  return (
    loading ? <Loading /> :
    <div>
      <h1>PaymentDetail</h1><br></br>
      <h4>Payment Amount: {payment.amt}</h4>
      <h4>From: {payment.sender} To: --> {payment.receiver}</h4>
      <h4>Sent On: {payment.formatDate}</h4>
    </div>
  );
}

export default PaymentDetail;