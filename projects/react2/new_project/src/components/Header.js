import React from "react";
// import "./myStyle.css";
import Button from "./Button";
// import {  } from "";

const Header = ({ onAdd, showAddTask }) => {
  return (
    <div>
      <h1 className="header">
        Task Tracker
        <Button
          // color={"green"}
          onAdd={onAdd}
          showAddTask={showAddTask}
        />
      </h1>
    </div>
  );
};

export default Header;
