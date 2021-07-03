import React from 'react';
import './BuildDailyGames.css';

export class BuildDailyGames extends React.Component {
  constructor(props) {
    super(props);
    this.createGame = this.createGame.bind(this);
  }

  createGame(gameInfo) {
    return gameInfo.map(game => {
      return (
        <div key={game.gamePk} id={game.gamePk} className='gameDisplay'>
          <div className='gameTeams'>
            <p>{`${game.teams.away.team.name}`}</p>
            <p>at</p>
            <p>{`${game.teams.home.team.name}`}</p>
          </div>
          <div className='gameScores'>
            <p>{`${game.teams.away.score}`}</p> 
            <p>{`${game.teams.home.score}`}</p>
          </div>
          <p>{`${game.status.detailedState} - ${game.venue.name}`}</p>
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