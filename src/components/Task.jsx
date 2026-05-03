import React from 'react';
import './Task.css';

const Task = ({ name, onClick, selected }) => {
  return (
    <div
      className={`task-card${selected ? ' task-card--selected' : ''}`}
      data-testid={`task-${name}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default Task;