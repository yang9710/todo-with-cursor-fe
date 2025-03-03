import React from 'react';
import { FiCheck, FiTrash2, FiFilter } from 'react-icons/fi';
import useTodoStore from '../../store/todoStore';

const TodoList = () => {
  const {
    loading,
    error,
    filteredTodos,
    filter,
    toggleTodo,
    deleteTodo
  } = useTodoStore(state => ({
    loading: state.loading,
    error: state.error,
    filteredTodos: state.filteredTodos(),
    filter: state.filter,
    toggleTodo: state.toggleTodo,
    deleteTodo: state.deleteTodo
  }));

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <FiFilter className="empty-icon" />
        <p className="text-lg">
          没有{filter === 'all' ? '' : filter === 'active' ? '未完成的' : '已完成的'}待办事项
        </p>
      </div>
    );
  }

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id} className="todo-item fade-in">
          <div
            className={`todo-checkbox ${todo.isCompleted ? 'checked' : ''}`}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.isCompleted && <FiCheck className="text-white w-3 h-3" />}
          </div>
          <span className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}>
            {todo.value}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="delete-button"
            aria-label="删除待办事项"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;