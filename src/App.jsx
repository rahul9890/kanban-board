import React, { useState } from 'react';
import './App.css';
import Controls from './components/Controls/Controls';
import Board from './components/Board/Board';

function App() {

  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [stagesTasks, setStagesTasks] = useState([
    ['task 0', 'task 1', 'task 2', 'task 3'], // Backlog
    ['task 4', 'task 5', 'task 6'],           // To Do
    ['task 7', 'task 8'],                     // Ongoing
    []                                       // Done
  ]);

  const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];

  // Create Task
  const createTask = () => {
    if (!newTask) return;

    const updated = [...stagesTasks];
    updated[0] = [...updated[0], newTask];

    setStagesTasks(updated);
    setNewTask('');
  };

  // Select Task
  const selectTask = (stageIndex, taskIndex) => {
    setSelectedTask({ stageIndex, taskIndex });
  };

  // Move Forward
  const moveForward = () => {
    if (!selectedTask) return;

    const { stageIndex, taskIndex } = selectedTask;
    if (stageIndex === stagesTasks.length - 1) return;

    const updated = stagesTasks.map(stage => [...stage]);
    const task = updated[stageIndex][taskIndex];

    updated[stageIndex].splice(taskIndex, 1);
    updated[stageIndex + 1].push(task);

    setStagesTasks(updated);
    setSelectedTask(null);
  };

  // Move Back
  const moveBack = () => {
    if (!selectedTask) return;

    const { stageIndex, taskIndex } = selectedTask;
    if (stageIndex === 0) return;

    const updated = stagesTasks.map(stage => [...stage]);
    const task = updated[stageIndex][taskIndex];

    updated[stageIndex].splice(taskIndex, 1);
    updated[stageIndex - 1].push(task);

    setStagesTasks(updated);
    setSelectedTask(null);
  };

  // Delete Task
  const deleteTask = () => {
    if (!selectedTask) return;

    const { stageIndex, taskIndex } = selectedTask;
    const updated = stagesTasks.map(stage => [...stage]);

    updated[stageIndex].splice(taskIndex, 1);

    setStagesTasks(updated);
    setSelectedTask(null);
  };

  const selectedTaskName =
    selectedTask !== null
      ? stagesTasks[selectedTask.stageIndex][selectedTask.taskIndex]
      : '';

  return (
    <div className="App">
      <Controls
        newTask={newTask}
        setNewTask={setNewTask}
        createTask={createTask}
        selectedTaskName={selectedTaskName}
        moveBack={moveBack}
        moveForward={moveForward}
        deleteTask={deleteTask}
        selectedTask={selectedTask}
        stagesTasks={stagesTasks}
      />

      <Board
        stagesNames={stagesNames}
        stagesTasks={stagesTasks}
        selectTask={selectTask}
      />
    </div>
  );
}

export default App;