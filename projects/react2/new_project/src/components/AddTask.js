import React from "react";
import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  // const [day, setDay] = useState("");
  const [completed, setCompleted] = useState(false);

  const onSubmit = () => {
    if (!title) {
      alert("Input the day");
    }
    onAdd({ title, completed });

    setTitle("");
    setCompleted(false);
  };

  return (
    <form action="#" className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label className={"form-control label"}>Tasks</label>
        <input
          type="text"
          placeholder="Add Task"
          className="form-control input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Set Remainder</label>
        <input
          type="checkbox"
          id="checklist"
          value={completed}
          onChange={(e) => setCompleted(e.currentTarget.checked)}
        />
      </div>
      <button className="btn btn-block">Save Task</button>
    </form>
  );
};

export default AddTask;
