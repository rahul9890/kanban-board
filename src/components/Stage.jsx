import React from 'react';
import Task from './Task';
import './Stage.css';

const stageClasses = ['backlog', 'todo', 'ongoing', 'done'];

const Stage = ({ name, stageId, tasks, selectTask }) => {
  return (
    <div
      className={`stage-col stage-col--${stageClasses[stageId] || 'backlog'}`}
      data-testid={`stage-${stageId}`}
    >
      <div className="stage-header">
        <span className="stage-title">{name}</span>
        <span className="stage-count">{tasks.length}</span>
      </div>

      {tasks.length === 0 && (
        <p className="stage-empty">No tasks yet</p>
      )}

      {tasks.map((task, index) => (
        <Task
          key={index}
          name={task}
          onClick={() => selectTask(stageId, index)}
        />
      ))}
    </div>
  );
};

export default Stage;