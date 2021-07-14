import React from 'react';
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import RinkDisplay from '../RinkDisplay/RinkDisplay'
import './GameDisplay.css';

export class GameDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.handleReturn = this.handleReturn.bind(this);
  }

  handleReturn() {
    this.props.onClick()
  }

  render() {
    return (
      <div className='gameDisplay'>
        <button onClick={this.handleReturn}>Return</button>
        <ScoreBoard 
          boxscore={this.props.gameData.liveData.boxscore.teams} 
          timeRemaining={this.props.gameData.liveData.plays.currentPlay.about} 
        />
        <RinkDisplay gameInfo={this.props.gameData.liveData} />
      </div>
    )
  }
}