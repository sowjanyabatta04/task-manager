import React, { useEffect, useState } from "react";
import api from "../api";

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const toggleComplete = async (id) => {
    await api.put(`/tasks/${id}`);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, [refresh]);

  return (
    <div>
      <h2>📋 Your Tasks</h2>
      {tasks.map((t) => (
        <div key={t._id} style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
          <h3 style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            {t.title}
          </h3>
          <p>{t.description}</p>
          <button onClick={() => toggleComplete(t._id)}>
            {t.completed ? "Undo" : "Mark Complete"}
          </button>
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
