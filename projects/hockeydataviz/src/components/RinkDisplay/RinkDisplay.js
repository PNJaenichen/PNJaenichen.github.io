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
    this.setupIce = this.setupIce.bind(this);
  }

  setupIce() {
    const teamLogo = TeamInfo[this.props.gameInfo.boxscore.teams.home.team.name].logo;
    return <img className='centerLogo' src={teamLogo} alt=''></img>;
  }

  render() {
    const centerLogo = this.setupIce();
    return (
      <div>
        <div className='buttonPool'>
          <button>Faceoffs</button>
          <button>Shots</button>
          <button>Blocked Shots</button>
          <button>Takeaways</button>
          <button>Hits</button>
          <button>Missed Shots</button>
          <button>Giveaways</button>
          <button>Goals</button>
          <button>Penalties</button>
        </div>
        <div className='iceRink'>
          <p className='playLocation'>+</p>
          <div className={'testLocation playLocation'}>{'\u2613'}</div>
          {centerLogo}
        </div>
      </div>
    )
  }
}