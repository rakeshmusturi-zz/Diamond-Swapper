import React, { Component } from 'react';
import questionImage from '../assets/images/question.png';
import diamondImage from '../assets/images/diamond.png';
import leftArrow from '../assets/images/leftArrow.png';
import rightArrow from '../assets/images/rightArrow.png';
import downArrow from '../assets/images/downArrow.png';
import ScoreBoard from './ScoreBoard';

class DiamondSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [
          ["", "", "", "", "", "", "diamond", ""],
          ["", "", "", "", "diamond", "", "", ""],
          ["diamond", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "diamond"],
          ["", "", "diamond", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "diamond"],
          ["", "", "", "diamond", "", "", "", ""],
          ["diamond", "", "", "", "", "", "", ""]
        ],
        visited: [
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false]
        ],
        score: 64,
        completed: false,
        previousPosition: [0][0]
    };
  };
  // Function To check the status of the game
  completed = () => {
    const { visited, data } = this.state;
    for (let i = 0; i < visited.length; i++) {
      for (let j = 0; j < visited.length; j++) {
        if (data[i][j] == "diamond" && visited[i][j] == false)
          return false;
      }
    }
    return true;
  }
  // Function to revel the cell on click
  checkForDiamond = (rowIndex, colIndex) => {
    if (!this.state.completed) {
      const { visited, score, data, previousPosition } = this.state;
      visited[rowIndex][colIndex] = true;
      if (previousPosition.length > 0 && data[previousPosition[0]][previousPosition[1]] !== 'diamond') {
        data[previousPosition[0]][previousPosition[1]] = '';
      }
      const diamondIndex = data[rowIndex].indexOf('diamond');
      if (data[rowIndex][colIndex] !== 'diamond') {
        if (visited[rowIndex][diamondIndex])
          data[rowIndex][colIndex] = 'downArrow';
        else
          data[rowIndex][colIndex] = diamondIndex < colIndex ? 'leftArrow' : 'rightArrow';
      }
      this.completed() ? this.setState({ completed: true }) : this.setState({ visited, score: score - 1, previousPosition: [rowIndex, colIndex] }) ;
    }
  }
  // Render Individual Boxes based on the image, diamond or Question mark
  getBox = (cell, rowIndex, colIndex) => {
    const image = this.getBoxImage(cell, rowIndex, colIndex);
    return (
      <div className="box" key={colIndex}>
        {image ? <img src={image} onClick={() => this.checkForDiamond(rowIndex, colIndex)} /> : null}
      </div>
    );
  }
  /* Set Image diamond or arrow */
  getBoxImage = (cell, rowIndex, colIndex) => {
    if (!this.state.visited[rowIndex][colIndex])
        return questionImage;
    else if (cell == "diamond")
        return diamondImage;
    else if (cell == "leftArrow")
        return leftArrow;
    else if (cell == "rightArrow")
        return rightArrow;
    else if (cell == "downArrow")
        return downArrow;
  }
  buildBox = (row, rowIndex) => {
    return row.map((cell, colIndex) => this.getBox(cell, rowIndex, colIndex));
  }
   render() {
     return (
        <div className={'mainContainer'}>
          <ScoreBoard count={this.state.score} status={this.state.completed} />
          <div className={this.state.completed ? 'wrapper gameOver' : 'wrapper'}>
            {this.state.data.map((row, rowIndex) => this.buildBox(row, rowIndex))}
          </div>
        </div>
     );
  }
}
export default DiamondSweeper;
