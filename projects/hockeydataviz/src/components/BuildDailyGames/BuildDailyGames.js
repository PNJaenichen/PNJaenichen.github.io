import React from 'react';

export class BuildDailyGames extends React.Component {
  constructor(props) {
    super(props);
    this.createGame = this.createGame.bind(this);
  }

  createGame(gameInfo) {
    return gameInfo.map(game => {
      return (
        <div key={game.gamePk} id={game.gamePk}>
          <p>{game.status.detailedState}</p>
          <p>{`${game.teams.away.team.name} at ${game.teams.home.team.name}`}</p>
          <p>{`${game.teams.away.score} ${game.teams.home.score}`}</p>
          <p>{game.venue.name}</p>
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