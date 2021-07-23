// On Ice can be pulled from www.nhl.com/scores/htmlreports/{startYear}{endYear}/PL{gameID}.HTM
// start year and end year are 4 digits
// gameID is only the last 6 digits, first four digits are start year

// Player portraits can come from https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{playerID}.jpg

import React from 'react';
import { TeamInfo } from '../../util/TeamInfo';
import './RinkDisplay.css';

export default class RinkDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playType: '',
    }
    this.setupIce = this.setupIce.bind(this);
    this.addPlays = this.addPlays.bind(this);
    this.setPlayType = this.setPlayType.bind(this);
  }

  setupIce() {
    const teamLogo = TeamInfo[this.props.gameInfo.boxscore.teams.home.team.name].logo;
    return <img className='centerLogo' src={teamLogo} alt=''></img>;
  }

  setPlayType(e) {
    this.setState({playType: e.target.value})
  }

  addPlays(playType) {
    const chosenPlays = this.props.gameInfo.plays.allPlays.filter(x => x.result.event === playType)
    const playDisplay = chosenPlays.map(x => {
      let pColor = 'black';
      let sColor = 'green';
      if (x.team) {
        pColor = TeamInfo[x.team.name].pColor;
        sColor = TeamInfo[x.team.name].sColor;
      }
      const scaleX = x.coordinates.x * 4;
      const scaleY = x.coordinates.y * -4;
      return (
        <div key={`${x.result.eventCode}`} className='playLocation' style={{color: `${pColor}`, textShadow: `2px 2px 2px ${sColor}`, transform: `translateX(${scaleX}px) translateY(${scaleY}px)`}}>{'\u2613'}</div>
      )
    })
    return playDisplay
  }

  render() {
    const centerLogo = this.setupIce();
    return (
      <div>
        <div className='buttonPool'>
          <button value='Faceoff' onClick={this.setPlayType}>Faceoffs</button>
          <button value='Shot' onClick={this.setPlayType}>Shots</button>
          <button value='Blocked Shot' onClick={this.setPlayType}>Blocked Shots</button>
          <button value='Takeaway' onClick={this.setPlayType}>Takeaways</button>
          <button value='Hit' onClick={this.setPlayType}>Hits</button>
          <button value='Missed Shot' onClick={this.setPlayType}>Missed Shots</button>
          <button value='Giveaway' onClick={this.setPlayType}>Giveaways</button>
          <button value='Goal' onClick={this.setPlayType}>Goals</button>
          <button value='Penalty' onClick={this.setPlayType}>Penalties</button>
        </div>
        <p>{this.state.playType}</p>
        <div className='iceRink'>
          <p className='playLocation'>{'\u2613'}</p>
          <div className='playLocation' style={{color: '#F47A38', textShadow: '2px 2px 2px #B9975B', transform: 'translateX(-276px) translateY(88px)'}}>{'\u2613'}</div>
          {this.addPlays(this.state.playType)}
          {centerLogo}
        </div>
      </div>
    )
  }
}