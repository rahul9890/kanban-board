import React from 'react';
import './Controls.css';

const Controls = ({
  newTask, setNewTask, createTask,
  selectedTaskName, moveBack, moveForward,
  deleteTask, selectedTask, stagesTasks
}) => {
  const isFirst = selectedTask && selectedTask.stageIndex === 0;
  const isLast  = selectedTask && selectedTask.stageIndex === stagesTasks.length - 1;

  return (
    <div className="controls-bar">
      <span className="controls-label">New task</span>
      <input
        className="controls-input"
        data-testid="new-task-name-input"
        placeholder="Task name"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="btn btn-primary"
        data-testid="create-task-btn"
        onClick={createTask}
        disabled={!newTask}
      >
        Create
      </button>

      <div className="controls-divider" />

      <input
        className="controls-input controls-input--readonly"
        data-testid="selected-task-field"
        placeholder="Selected task"
        value={selectedTaskName}
        readOnly
      />
      <button
        className="btn"
        data-testid="move-back-btn"
        onClick={moveBack}
        disabled={!selectedTask || isFirst}
      >
        ← Back
      </button>
      <button
        className="btn"
        data-testid="move-forward-btn"
        onClick={moveForward}
        disabled={!selectedTask || isLast}
      >
        Forward →
      </button>
      <button
        className="btn btn-danger"
        data-testid="delete-task-btn"
        onClick={deleteTask}
        disabled={!selectedTask}
      >
        Delete
      </button>
    </div>
  );
};

export default Controls;