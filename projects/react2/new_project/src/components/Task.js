import React from "react";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, taskDel, toggle }) => {
  //   for (const {title} of tasks.values()) {
  //       return title
  //   }
  return (
    <div>
      {task.map((task) => (
        <div
          className={`task ${task.completed ? "task-remainder" : ""}`}
          key={task.id}
          onDoubleClick={() => toggle(task.id)}
        >
          <h3 className="task h3">
            {task.title}
            <FaTimes
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => taskDel(task.id)}
            />
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Task;
