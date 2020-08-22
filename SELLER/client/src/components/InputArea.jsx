import React from "react";

function InputArea(props) {
  return (
    <div className="form">
      <input
        // callback function (event), to pass in the event to App.jsx
        onChange={event => {
          props.handleChange(event);
        }}
        type="text"
        value={props.inputText}
      />
      <button
        onClick={() => {
          props.addItem();
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
