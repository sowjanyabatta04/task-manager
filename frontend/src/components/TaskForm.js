import React, { useState } from "react";
import api from "../api";

function TaskForm({ refresh }) {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", task);
    setTask({ title: "", description: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>➕ Add Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
