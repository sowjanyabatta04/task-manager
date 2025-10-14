import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>📝 Task Manager</h1>
      <TaskForm refresh={triggerRefresh} />
      <TaskList refresh={refresh} />
    </div>
  );
}

export default App;
