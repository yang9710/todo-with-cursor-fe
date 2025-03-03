import React from 'react';
import useTodoStore from '../../store/todoStore';

const TodoFilter = () => {
  const { filter, setFilter } = useTodoStore(state => ({
    filter: state.filter,
    setFilter: state.setFilter
  }));

  return (
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
  );
};

export default TodoFilter;