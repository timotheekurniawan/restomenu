import React, { useState, useEffect } from "react";
import { ListItem, List } from "@material-ui/core";
import Order from "./Order";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

export default function OrdersView() {
  // empty array as initial
  const [orders, setOrders] = useState([]);

  // TODO: SOCKET.ON DOES NOT SEEM TO LISTEN TO SOCKET.EMIT "ISUPTODATE". FIX THIS.
  useEffect(() => {
    // fetch orders the first time
    fetchOrders();
    const socket = socketIOClient(ENDPOINT);
    socket.on("isUptodate", (data) => {
      // listen to "isUptodate" from the backend.
      if (data === false) {
        fetchOrders();
      }
    });
  }, []);

  function fetchOrders() {
    // fetch orders from db
    axios.get("/server/orders/fetch").then((res) => {
      setOrders([]); // empty orders, then set orders to res.data again. the  michael weng u fucking smart
      setOrders(res.data);
    });
  }

  // console.log(orders);

  return (
    <div style={{ height: "600px", width: "100%", overflow: "auto" }}>
      <List style={{ display: "flex", flexDirection: "row" }}>
        {orders.map((order, index) => (
          <ListItem>
            <Order
              key={index}
              id={order._id}
              orderNumber={index}
              items={order.items}
              tableNumber={order.tableNumber}
              fetchOrders={fetchOrders}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
