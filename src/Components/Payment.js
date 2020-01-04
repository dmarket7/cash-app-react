import React from "react";
import "./Payment.css";

function Payment(props) {
  const { id, sender, receiver, amt, date } = props.payment;

  return (
    <li className="list-group-item payment">
      <span>{sender}</span>
      <span>paid</span>
      <span>{receiver}</span>
      <span>{`$${amt}`}</span>
    </li>
  );
}

export default Payment;