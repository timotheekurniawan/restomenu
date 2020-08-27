import React from "react";
import OrdersView from "./components/OrdersView";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh", // height of the browser viewport
        display: "flex",
        alignItems: "center",
      }}
    >
      <OrdersView />
    </div>
  );
}
