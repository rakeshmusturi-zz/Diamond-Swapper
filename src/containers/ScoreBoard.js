import React, { Component } from 'react';

class ScoreBoard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="ScoreBoardContainer">
        <div className="notification">
          <h1>
          {this.props.status ? `WoW Champ! You found all diamonds! Your score is ${this.props.count}!` : `Current score: ${this.props.count}. Keep Going!`}
          </h1>
        </div>
    </div>
    )
  }
}
export default ScoreBoard;
