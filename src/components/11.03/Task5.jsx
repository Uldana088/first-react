import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, tasksett] = useState([]);
  const [taskText, taskTest] = useState("");
  const [ozgerty, setozgerty] = useState(null);

  const addTask = () => {
    if (!taskText.trim()) return;
    if (ozgerty !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === ozgerty ? { ...task, text: taskText } : task
      );
      tasksett(updatedTasks);
      setozgerty(null);
    } else {
      tasksett([...tasks, { text: taskText, completed: false }]);
    }
    taskTest("")
  };
}


export default TodoApp;
