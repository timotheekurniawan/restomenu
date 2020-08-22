import React, { useState } from "react";

export default function OrderItem(props) {
  const [isCrossed, setIsCrossed] = useState(false);

  function crossItem() {
    setIsCrossed((prevValue) => {
      return prevValue ? false : true;
    });
  }

  return (
    <div
      onClick={() => {
        crossItem();
      }}
    >
      {isCrossed ? (
        <p>
          {" "}
          <strike>
            {" "}
            {props.quantity} {props.text}{" "}
          </strike>{" "}
        </p>
      ) : (
        <p>
          {" "}
          {props.quantity} {props.text}{" "}
        </p>
      )}
    </div>
  );
}
