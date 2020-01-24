import React from "react";
import "./Payment.css";

function Payment(props) {
  const { id, sender, receiver, amt, date } = props.payment;

  return (
    <li className="payment">
      <span className="name">{sender}</span>
      <span>paid -></span>
      <span className="name">{receiver}</span>
      <span>{`$${amt}`}</span>
    </li>
  );
}

export default Payment;