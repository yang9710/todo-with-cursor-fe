import React from 'react';
import useTodoStore from '../../store/todoStore';

const ProgressCard = () => {
  const completionRate = useTodoStore(state => state.completionRate());

  return (
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
  );
};

export default ProgressCard;