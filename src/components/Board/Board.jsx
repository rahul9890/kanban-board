import React from 'react';
import Stage from '../Stage/Stage';
import './Board.css';

const Board = ({ stagesNames, stagesTasks, selectTask }) => {
  return (
    <div className="board">
      {stagesNames.map((name, index) => (
        <Stage
          key={index}
          name={name}
          stageId={index}
          tasks={stagesTasks[index]}
          selectTask={selectTask}
        />
      ))}
    </div>
  );
};

export default Board;