// import React from "react";
// import React, { useState } from "react";
// import TB from "./components/AddTask";

const Button = ({ onAdd, showAddTask }) => {
  return (
    <div>
      <button
        className="btn"
        style={{ backgroundColor: !showAddTask ? "green" : "red" }}
        onClick={onAdd}
      >
        {!showAddTask ? "Add" : "Close"}
      </button>
    </div>
  );
};

export default Button;
