import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { IconButton } from "@material-ui/core";
import OrderCard from "./OrderCard";
import axios from "axios";

export default function Order(props) {
  function deleteOrder() {
    //delete order from db and remove card
    // second arg must be an object
    axios.post("/server/newOrders/delete", { id: props.id }).then((res) => {
      console.log(res.data);
    });
    props.deleteCard(0);
  }

  function completeOrder() {
    //move order from newOrder collection to completedOrder collection
    //and remove card
    console.log("Complete Order Successful");
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
