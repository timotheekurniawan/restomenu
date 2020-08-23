import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { IconButton } from "@material-ui/core";
import OrderCard from "./OrderCard";
import axios from "axios";

export default function Order(props) {
  function deleteOrder() {
    // delete order from db and fetch orders. second arg must be an object
    axios.post("/server/orders/delete", { id: props.id }).then((res) => {
      console.log("Successfully deleted order.");
      props.fetchOrders();
    });
  }

  function completeOrder() {
    //move order from newOrder collection to completedOrder collection and fetch Orders
    axios.post("/server/orders/complete", { id: props.id }).then((res) => {
      console.log("Successfully completed order.");
      props.fetchOrders();
    });
  }

  return (
    <div>
      <OrderCard
        key={props.orderNumber}
        id={props.orderNumber}
        items={props.items}
        tableNumber={props.tableNumber}
        // onChecked={deleteItem}
      />
      <div style={{ textAlign: "center" }}>
        <IconButton aria-label="delete" onClick={deleteOrder}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="complete" onClick={completeOrder}>
          <CheckCircleIcon />
        </IconButton>
      </div>
    </div>
  );
}
