import React, { useState, useEffect } from "react";
import { ListItem, List } from "@material-ui/core";
import Order from "./Order";
import axios from "axios";

export default function OrdersView() {
  // empty array as initial
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // setOrders([]); // empty orders, then fetch again. the  michael weng u fucking smart
    fetchOrders();
  }, []); // empty array as second argument to prevent infinite loop (run only once, on initial render)

  function fetchOrders() {
    // fetch orders from db
    axios.get("/server/orders/fetch").then((res) => {
      setOrders([]); // empty orders, then set orders to res.data again. the  michael weng u fucking smart
      setOrders(res.data);
    });
  }

  console.log(orders);

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
