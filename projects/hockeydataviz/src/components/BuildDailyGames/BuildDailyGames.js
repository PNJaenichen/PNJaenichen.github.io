import React from 'react';
import './BuildDailyGames.css';
import { TeamInfo } from '../../util/TeamInfo';

export class BuildDailyGames extends React.Component {
  constructor(props) {
    super(props);
    this.createGame = this.createGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event.target.parentElement.id)
  }

  createGame(gameInfo) {
    return gameInfo.map(game => {
      const homeTeam = TeamInfo[game.teams.home.team.name] ? TeamInfo[game.teams.home.team.name] : {};
      const awayTeam = TeamInfo[game.teams.away.team.name] ? TeamInfo[game.teams.away.team.name] : {};
      return (
        <div key={game.gamePk} id={game.gamePk} className='gameDisplay'>
          <div className='gameTeams'>
            <div className='awayTeam'>
              <img src={awayTeam.logo} alt={`${awayTeam.abbreviation ? awayTeam.abbreviation : 'No'} logo`}></img>
              <p>{`${game.teams.away.team.name}`}</p>
            </div>
            <p>at</p>
            <div className='homeTeam'>
              <img src={homeTeam.logo} alt={`${homeTeam.abbreviation ? homeTeam.abbreviation : 'No'} logo`}></img>
              <p>{`${game.teams.home.team.name}`}</p>
            </div>
          </div>
          <div className='gameScores'>
            <p>{`${game.teams.away.score}`}</p> 
            <p>{`${game.teams.home.score}`}</p>
          </div>
          <p onClick={this.handleClick}>{`${game.status.detailedState} - ${game.venue.name}`}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.createGame(this.props.gameList)}
      </div>
    )
  }

}