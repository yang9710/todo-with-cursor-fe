import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import useTodoStore from '../../store/todoStore';

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState('');
  const addTodo = useTodoStore(state => state.addTodo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const success = await addTodo(newTodo);
    if (success) {
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-container">
        <input
          type="text"
          className="todo-input"
          placeholder="添加新的待办事项..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          className="add-button"
          disabled={newTodo.trim() === ''}
        >
          <FiPlus className="w-5 h-5" />
          添加
        </button>
      </div>
    </form>
  );
};

export default TodoForm;