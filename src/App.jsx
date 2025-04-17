import React, { useReducer, useState } from 'react';
import './TodoApp.css'; // CSS файлды бөлек жасаймыз

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), title: action.payload, completed: false },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'EDIT_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleEditTodo = (id, title) => {
    setEditId(id);
    setEditTitle(title);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      dispatch({
        type: 'EDIT_TODO',
        payload: { id: editId, title: editTitle },
      });
      setEditId(null);
      setEditTitle('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div className="todo-container">
      <h2>📋 Менің тапсырмаларым</h2>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Тапсырма жазыңыз..."
        />
        <button onClick={handleAddTodo}>➕ Қосу</button>
      </div>

      <ul className="todo-list">
        {state.todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editId === todo.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={handleSaveEdit}>💾 Сақтау</button>
              </div>
            ) : (
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span
                  onClick={() => handleToggleTodo(todo.id)}
                  className={todo.completed ? 'completed' : ''}
                >
                  {todo.title}
                </span>
                <div className="actions">
                  <button onClick={() => handleEditTodo(todo.id, todo.title)}>
                    ✏️
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    🗑
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
