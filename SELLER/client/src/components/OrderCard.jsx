import React, { useState } from "react";
import OrderItem from "./OrderItem";
import InputArea from "./InputArea";

export default function OrderCard(props) {
  const [items, setItems] = useState([props.items]);

  return (
    <div className="container">
      <div className="heading">
        <h1>Table {props.tableNumber}</h1>
      </div>
      {/* <InputArea
        handleChange={handleChange}
        addItem={addItem}
        inputText={inputText}
      /> */}
      <div>
        <ul>
          {/* items index at 0 bcs the item  is 2 layers deep idk why */}
          {items[0].map((item, index) => (
            <OrderItem
              key={index}
              id={index}
              quantity={item.quantity}
              text={item.name}
              note={item.note}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
