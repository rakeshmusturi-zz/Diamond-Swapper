import React, { Component } from 'react';
import questionImage from '../assets/images/question.png';
import diamondImage from '../assets/images/diamond.png';
import ScoreBoard from './ScoreBoard';

class DiamondSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [
            ["", "", "", "", "", "", "diamond", ""],
            ["", "", "", "", "diamond", "", "", ""],
            ["", "", "", "", "diamond", "", "", ""],
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
        completed: false
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
        const { visited, score } = this.state;
        visited[rowIndex][colIndex] = true;
        if (this.completed()) {
            this.setState({ completed: true });
        } else {
            this.setState({ visited, score: score - 1 });
        }
    }
  }
  // Render Individual Boxes based on the image, diamond or Question mark
  getBox = (cell, rowIndex, colIndex) => {
    const image = !this.state.visited[rowIndex][colIndex] ? questionImage : (cell == "diamond" ? diamondImage : null);
    // this.imageOf(cell, rowIndex, colIndex);
    return (
        <div className="box" key={colIndex}>
            {
              image
                  ? <img src={image} onClick={() => this.checkForDiamond(rowIndex, colIndex)} />
                  : null
            }
        </div>
    );
  }
  buildBox = (row, rowIndex) => {
      return row.map((cell, colIndex) => this.getBox(cell, rowIndex, colIndex));
  }
   render() {
     return (
        <div className={'mainContainer'}>
          <ScoreBoard count={this.state.score} status={this.state.completed} />
          <div className="wrapper">
            {this.state.data.map((row, rowIndex) => this.buildBox(row, rowIndex))}
          </div>
        </div>
     );
  }
}
export default DiamondSweeper;
