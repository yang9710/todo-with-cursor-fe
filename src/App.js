import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiPlus, FiTrash2, FiFilter, FiCheck } from 'react-icons/fi';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // 获取所有待办事项
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-todo');
      if (!response.ok) {
        throw new Error('获取待办事项失败');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('获取待办事项时出错: ' + err.message);
      console.error('获取待办事项时出错:', err);
    } finally {
      setLoading(false);
    }
  };

  // 添加新待办事项
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch('/api/add-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: newTodo, isCompleted: false }),
      });

      if (!response.ok) {
        throw new Error('添加待办事项失败');
      }

      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    } catch (err) {
      setError('添加待办事项时出错: ' + err.message);
      console.error('添加待办事项时出错:', err);
    }
  };

  // 更新待办事项状态
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`/api/update-todo/${id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('更新待办事项状态失败');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('更新待办事项状态时出错: ' + err.message);
      console.error('更新待办事项状态时出错:', err);
    }
  };

  // 删除待办事项
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/del-todo/${id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('删除待办事项失败');
      }

      await response.json();
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('删除待办事项时出错: ' + err.message);
      console.error('删除待办事项时出错:', err);
    }
  };

  // 组件加载时获取待办事项
  useEffect(() => {
    fetchTodos();
  }, []);

  // 检测系统主题偏好
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setDarkMode(e.matches);
    });
  }, []);

  // 应用暗色模式
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // 过滤待办事项
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  // 计算完成度
  const completionRate = todos.length > 0
    ? Math.round((todos.filter(todo => todo.isCompleted).length / todos.length) * 100)
    : 0;

  return (
    <div className="min-h-screen pb-10">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">优雅待办</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label={darkMode ? "切换到亮色模式" : "切换到暗色模式"}
          >
            {darkMode ? <FiSun className="text-yellow-400 w-5 h-5" /> : <FiMoon className="text-gray-700 w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="todo-container">
        <div className="progress-card fade-in">
          <h2 className="progress-title">任务完成度</h2>
          <div className="progress-bar-bg">
            <div
              className="progress-bar"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-sm font-medium">{completionRate}% 已完成</p>
        </div>

        <form onSubmit={addTodo} className="todo-form">
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

        <div className="filter-container">
          <h2 className="filter-title">我的待办</h2>
          <div className="filter-buttons">
            <button
              onClick={() => setFilter('all')}
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            >
              未完成
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            >
              已完成
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">加载中...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            <FiFilter className="empty-icon" />
            <p className="text-lg">没有{filter === 'all' ? '' : filter === 'active' ? '未完成的' : '已完成的'}待办事项</p>
          </div>
        ) : (
          <ul>
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className="todo-item fade-in"
              >
                <div
                  className={`todo-checkbox ${todo.isCompleted ? 'checked' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.isCompleted && <FiCheck className="text-white w-3 h-3" />}
                </div>
                <span
                  className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}
                >
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
        )}
      </main>
    </div>
  );
}

export default App;
