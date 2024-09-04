// src/App.js
import React, { useState } from "react";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Add a new todo
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { title: input, status: "pending" }]);
      setInput("");
    }
  };

  // Toggle the status of a todo
  const toggleStatus = (index) => {
    const newTodos = [...todos];
    newTodos[index].status = newTodos[index].status === "pending" ? "completed" : "pending";
    setTodos(newTodos);
  };

  // Remove a todo
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      {/* Input for adding new todo */}
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* Display todos */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.status}`}>
            <span>{index + 1}. {todo.title} - {todo.status}</span>
            <div className="todo-actions">
              <button onClick={() => toggleStatus(index)}>
                {todo.status === "pending" ? "Mark as Completed" : "Mark as Pending"}
              </button>
              <button onClick={() => removeTodo(index)}>Remove</button>
            </div>
          </li>
        ))}P
      </ul>
    </div>
  );
}

export default App;
