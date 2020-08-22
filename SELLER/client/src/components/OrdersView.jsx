import React, { useState, useEffect } from "react";
import { ListItem, List } from "@material-ui/core";
import orderList from "../orderList";
import Order from "./Order";
import axios from "axios";

export default function OrdersView() {
  // empty array as initial
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []); // empty array as second argument to prevent infinite loop (run only once, on initial render)

  function fetchOrders() {
    // get orders from db
    axios.get("/server/newOrders/fetch").then((res) => {
      setOrders(res.data);
      console.log("Fetching orders successful");
    });
  }

  function deleteCard(orderNumber) {
    //delete card (does not delete from db)
    setOrders((prevOrders) => {
      return prevOrders.filter((order, index) => {
        return index !== orderNumber;
      });
    });
  }
  console.log(orders);

  return (
    <div style={{ height: "600px", width: "100%", overflow: "auto" }}>
      <List style={{ display: "flex", flexDirection: "row" }}>
        {/* have to be indexed to orders[0] bcs idk why */}
        {orders.map((order, index) => (
          <ListItem>
            <Order
              id={order._id}
              orderNumber={index}
              items={order.items}
              tableNumber={order.tableNumber}
              deleteCard={deleteCard}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
