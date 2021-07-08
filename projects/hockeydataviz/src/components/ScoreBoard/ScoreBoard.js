import React from 'react';
import './ScoreBoard.css';

export default class ScoreBoard extends React.Component {
  render() {
    return (
      <div className='scoreBoard'>
        <p className='homeTeamName'>Home Team</p>
        <div className='homeGoals'>
          <div className='digit'>
            <div id='digit11' className='digitBar'></div>
            <div id='digit12' className='digitBar'></div>
            <div id='digit13' className='digitBar'></div>
            <div id='digit14' className='digitBar'></div>
            <div id='digit15' className='digitBar'></div>
            <div id='digit16' className='digitBar'></div>
            <div id='digit17' className='digitBar'></div>
          </div>
        </div>    
        <div className='gameTime'></div>
        <p className='visitTeamName'>Visitor Team</p>
        <div className='awayGoals'></div>
      </div>
    )
  }
}