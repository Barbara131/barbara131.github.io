import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import "./components/myStyle.css";
import Task from "./components/Task";

function App() {
  // console.log(task[currentTask]);
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    console.log(data);
    return data;
  };

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
  const addTk = async (task) => {
    // console.log(task);
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    // const myId = Math.trunc(Math.random() * 100);
    // const newTasks = {
    //   id: myId,
    //   ...task,
    // };
    // console.log(newTasks);
    // setTasks([...tasks, newTasks]);
  };

  // delete Task
  const deleteTask = async (id) => {
    // console.log("delete", id);
    // console.log(id);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
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
