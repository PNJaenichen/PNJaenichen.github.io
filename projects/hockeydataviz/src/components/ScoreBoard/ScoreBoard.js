import React from 'react';
import './ScoreBoard.css';
import { TeamInfo } from '../../util/TeamInfo';

const buildDigits ={
  1: {'topBar': false, 'uprBar': true, 'uplBar': false, 'midBar': false,
    'lorBar': true, 'lolBar': false, 'botBar': false},
  2: {'topBar': true, 'uprBar': true, 'uplBar': false, 'midBar': true,
    'lorBar': false, 'lolBar': true, 'botBar': true}, 
  3: {'topBar': true, 'uprBar': true, 'uplBar': false, 'midBar': true,
    'lorBar': true, 'lolBar': false, 'botBar': true},
  4: {'topBar': false, 'uprBar': true, 'uplBar': true, 'midBar': true,
    'lorBar': true, 'lolBar': false, 'botBar': false},
  5: {'topBar': true, 'uprBar': false, 'uplBar': true, 'midBar': true,
    'lorBar': true, 'lolBar': false, 'botBar': true},
  6: {'topBar': true, 'uprBar': false, 'uplBar': true, 'midBar': true,
    'lorBar': true, 'lolBar': true, 'botBar': true},
  7: {'topBar': true, 'uprBar': true, 'uplBar': false, 'midBar': false,
    'lorBar': true, 'lolBar': false, 'botBar': false},
  8: {'topBar': true, 'uprBar': true, 'uplBar': true, 'midBar': true,
    'lorBar': true, 'lolBar': true, 'botBar': true},
  9: {'topBar': true, 'uprBar': true, 'uplBar': true, 'midBar': true,
    'lorBar': true, 'lolBar': false, 'botBar': true},
  0: {'topBar': true, 'uprBar': true, 'uplBar': true, 'midBar': false,
    'lorBar': true, 'lolBar': true, 'botBar': true},
};

const bars = ['topBar', 'uprBar', 'uplBar', 'midBar', 'lorBar', 'lolBar',
'botBar'];

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.digitBuilder = this.digitBuilder.bind(this);
  }

  digitBuilder(digit) {
    return bars.map(bar => {
      if (buildDigits[digit][bar]) {
        return (<div className={`digitBar ${bar}`}></div>)
      } else {
        return (<div className={`digitBar ${bar}`} style={{backgroundColor: 'black'}}></div>)
      }
    })
  }

  displayBuilder(disp, location) {
    let locationID;
    if (location === 'home' || location === 'away') {
      locationID = `${location}Goals`;
    } else {
      locationID = `${location}s`;
    }
    if (disp < 10) {
      return (
        <div className={locationID}>
          <div id={`${location}RightDigit`} className='digit'>
            {this.digitBuilder(0)}
          </div>
          <div id={`${location}LeftDigit`} className='digit'>
            {this.digitBuilder(disp)}
          </div>
        </div>
      )
    } else if (disp > 9 && disp < 100) {
      const splitNums = disp.toString().split('').map(x => parseInt(x));
      return (
        <div className={locationID}>
          <div id={`${location}RightDigit`} className='digit'>
            {this.digitBuilder(splitNums[0])}
          </div>
          <div id={`${location}LeftDigit`} className='digit'>
            {this.digitBuilder(splitNums[1])}
          </div>
        </div>
      )
    } else {
      return (
        <div className={locationID}>
          <div id={`${location}RightDigit`} className='digit'>
            {this.digitBuilder(0)}
          </div>
          <div id={`${location}LeftDigit`} className='digit'>
            {this.digitBuilder(0)}
          </div>
        </div>
      )
    }
  }

  render() {
    const homeTeam = this.props.boxscore.home;
    const awayTeam = this.props.boxscore.away;
    return (
      <div className='scoreBoard'>
        <p className='homeTeamName'>Home Team</p>
        {this.displayBuilder(homeTeam.teamStats.teamSkaterStats.goals, 'home')}    
        <div className='gameTime'>
          {this.displayBuilder(0, 'minute')}
          <div className='timeBreak'>
            <div className='dot'></div>
            <div className='dot'></div>
          </div>
          {this.displayBuilder(0, 'second')}
        </div>
        <p className='visitTeamName'>Visitor Team</p>
        {this.displayBuilder(awayTeam.teamStats.teamSkaterStats.goals, 'away')}
        <div className='shots'>
          {this.displayBuilder(homeTeam.teamStats.teamSkaterStats.shots, 'homeShot')}
          <p>Shots on Goal</p>
          {this.displayBuilder(awayTeam.teamStats.teamSkaterStats.shots, 'awayShot')}
        </div>
        <div className='teamLogos'>
          <img src={TeamInfo[homeTeam.team.name].logo} alt={`${homeTeam.team.name} Logo`} className='logo'></img>
          <img src={TeamInfo[awayTeam.team.name].logo} alt={`${awayTeam.team.name} Logo`} className='logo'></img>
        </div>
      </div>
    )
  }
}