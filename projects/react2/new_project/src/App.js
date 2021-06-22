import Header from "./components/Header";
import AddTask from "./components/AddTask";
import "./components/myStyle.css";
import { useState } from "react";
import Task from "./components/Task";

function App() {
  // console.log(task[currentTask]);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Take out the laundry",
      completed: true,
    },
    {
      id: 2,
      title: "Dinner with wife",
      completed: true,
    },
    {
      id: 3,
      title: "Meeting with boss",
      completed: false,
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);

  //toggle
  const toggleTask = (id) => {
    // console.log(id);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return { ...task };
      })
    );
  };

  // add task
  const addTk = (task) => {
    // console.log(task);
    const myId = Math.trunc(Math.random() * 100);
    const newTasks = {
      id: myId,
      ...task,
    };
    console.log(newTasks);
    setTasks([...tasks, newTasks]);
  };

  // delete Task
  const deleteTask = (num) => {
    // console.log("delete", id);
    // console.log(id);
    setTasks(tasks.filter((task) => task.id !== num));
  };
  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTk} />}
      {tasks.length > 0 ? (
        <Task task={tasks} taskDel={deleteTask} toggle={toggleTask} />
      ) : (
        "No task"
      )}
    </div>
  );
}

export default App;
