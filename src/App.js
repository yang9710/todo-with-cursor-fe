import React, { useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import ProgressCard from './components/todo/ProgressCard';
import TodoForm from './components/todo/TodoForm';
import TodoFilter from './components/todo/TodoFilter';
import TodoList from './components/todo/TodoList';
import useTodoStore from './store/todoStore';

function App() {
  const {
    darkMode,
    setDarkMode,
    fetchTodos
  } = useTodoStore();

  // 组件加载时获取待办事项
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // 检测系统主题偏好
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setDarkMode(e.matches);
    });
  }, [setDarkMode]);

  // 应用暗色模式
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen pb-10">
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="todo-container">
        <ProgressCard />
        <TodoForm />
        <TodoFilter />
        <TodoList />
      </main>
    </div>
  );
}

export default App;
