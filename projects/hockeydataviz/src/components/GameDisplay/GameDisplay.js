import React from 'react';
import { TeamInfo } from '../../util/TeamInfo';
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
      <div>
        <button onClick={this.handleReturn}>Return</button>
        <div className='scoreBoard'>
          <div className='awayTeamGame'>
            <img src={TeamInfo[this.props.gameData.gameData.teams.away.name].logo} alt='Away Team Logo'></img>
            <p>{this.props.gameData.liveData.linescore.teams.away.goals}</p>
          </div>
          <p>:</p>
          <div className='homeTeamGame'>
            <p>{this.props.gameData.liveData.linescore.teams.home.goals}</p>
            <img src={TeamInfo[this.props.gameData.gameData.teams.home.name].logo} alt='Home Team Logo'></img>
          </div>
        </div>
      </div>
    )
  }
}