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
        <div className='iceRink'>
          {centerLogo}
        </div>
      </div>
    )
  }
}