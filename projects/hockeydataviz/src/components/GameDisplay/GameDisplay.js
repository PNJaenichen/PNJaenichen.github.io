import React from 'react';
import ScoreBoard from '../ScoreBoard/ScoreBoard'
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
    const homeScore = this.props.gameData.liveData.linescore.teams.home.goals;
    const awayScore = this.props.gameData.liveData.linescore.teams.away.goals;
    return (
      <div>
        <button onClick={this.handleReturn}>Return</button>
        <ScoreBoard awayScore={awayScore} homeScore={homeScore}/>
        <div className='iceRink'>
          <div className='awayTeamGame'>
            <img src={TeamInfo[this.props.gameData.gameData.teams.away.name].logo} alt='Away Team Logo'></img>
            <p>{awayScore}</p>
          </div>
          <p>:</p>
          <div className='homeTeamGame'>
            <p>{homeScore}</p>
            <img src={TeamInfo[this.props.gameData.gameData.teams.home.name].logo} alt='Home Team Logo'></img>
          </div>
        </div>
      </div>
    )
  }
}