import React, { Component } from 'react';
import './App.css';
import Controls from './components/Controls';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: '',
      selectedTask: null,
      stagesTasks: [
        ['task 0', 'task 1', 'task 2', 'task 3'], // Backlog
        ['task 4', 'task 5', 'task 6'],           // To Do
        ['task 7', 'task 8'],                     // Ongoing
        []                                       // Done
      ]
    };

    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  // Create Task
  createTask = () => {
    const { newTask, stagesTasks } = this.state;
    if (!newTask) return;

    stagesTasks[0].push(newTask);

    this.setState({ stagesTasks, newTask: '' });
  };

  // Select Task
  selectTask = (stageIndex, taskIndex) => {
    this.setState({
      selectedTask: { stageIndex, taskIndex }
    });
  };

  // Move Forward
  moveForward = () => {
    const { selectedTask, stagesTasks } = this.state;
    if (!selectedTask) return;

    const { stageIndex, taskIndex } = selectedTask;
    if (stageIndex === stagesTasks.length - 1) return;

    const task = stagesTasks[stageIndex][taskIndex];
    stagesTasks[stageIndex].splice(taskIndex, 1);
    stagesTasks[stageIndex + 1].push(task);

    this.setState({ stagesTasks, selectedTask: null });
  };

  // Move Back
  moveBack = () => {
    const { selectedTask, stagesTasks } = this.state;
    if (!selectedTask) return;

    const { stageIndex, taskIndex } = selectedTask;
    if (stageIndex === 0) return;

    const task = stagesTasks[stageIndex][taskIndex];
    stagesTasks[stageIndex].splice(taskIndex, 1);
    stagesTasks[stageIndex - 1].push(task);

    this.setState({ stagesTasks, selectedTask: null });
  };

  // Delete Task
  deleteTask = () => {
    const { selectedTask, stagesTasks } = this.state;
    if (!selectedTask) return;

    const { stageIndex, taskIndex } = selectedTask;
    stagesTasks[stageIndex].splice(taskIndex, 1);

    this.setState({ stagesTasks, selectedTask: null });
  };

  render() {
    const { newTask, selectedTask, stagesTasks } = this.state;

    const selectedTaskName =
      selectedTask !== null
        ? stagesTasks[selectedTask.stageIndex][selectedTask.taskIndex]
        : '';

    return (
      <div className="App">
        <Controls
          newTask={newTask}
          setNewTask={(val) => this.setState({ newTask: val })}
          createTask={this.createTask}
          selectedTaskName={selectedTaskName}
          moveBack={this.moveBack}
          moveForward={this.moveForward}
          deleteTask={this.deleteTask}
          selectedTask={selectedTask}
          stagesTasks={stagesTasks}
        />

        <Board
          stagesNames={this.stagesNames}
          stagesTasks={stagesTasks}
          selectTask={this.selectTask}
        />
      </div>
    );
  }
}

export default App;