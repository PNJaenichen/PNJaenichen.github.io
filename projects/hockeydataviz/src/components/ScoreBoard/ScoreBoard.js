import React from 'react';
import './ScoreBoard.css';

const buildDigits ={
  1: {'topBar': false, 'uprBar': true, 'uplBar': false, 'midBar': false,
    'lorBar': true, 'lolBar': false, 'botBar': false},
  2: {'topBar': true, 'uprBar': true, 'uplBar': false, 'midBar': true,
    'lorBar': false, 'lolBar': true, 'botBar': true}, 
  3: {'topBar': true, 'uprBar': false, 'uplBar': true, 'midBar': true,
    'lorBar': false, 'lolBar': true, 'botBar': true},
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
}

export default class ScoreBoard extends React.Component {
  render() {
    return (
      <div className='scoreBoard'>
        <p className='homeTeamName'>Home Team</p>
        <div className='homeGoals'>
          <div id='homeRightDigit' className='digit'>
            <div className="digitBar topBar"></div>
            <div className="digitBar uprBar"></div>
            <div className="digitBar uplBar"></div>
            <div className="digitBar midBar"></div>
            <div className="digitBar lorBar"></div>
            <div className="digitBar lolBar"></div>
            <div className="digitBar botBar"></div>
          </div>
          <div id='homeLeftDigit' className='digit'>
            <div className="digitBar topBar"></div>
            <div className="digitBar uprBar"></div>
            <div className="digitBar uplBar"></div>
            <div className="digitBar midBar"></div>
            <div className="digitBar lorBar"></div>
            <div className="digitBar lolBar"></div>
            <div className="digitBar botBar"></div>
          </div>
        </div>    
        <div className='gameTime'>
          <div className='minutes'>
            <div id='minuteRightDigit' className='digit'>
              <div className="digitBar topBar"></div>
              <div className="digitBar uprBar"></div>
              <div className="digitBar uplBar"></div>
              <div className="digitBar midBar"></div>
              <div className="digitBar lorBar"></div>
              <div className="digitBar lolBar"></div>
              <div className="digitBar botBar"></div>
            </div>
            <div id='minuteLeftDigit' className='digit'>
              <div className="digitBar topBar"></div>
              <div className="digitBar uprBar"></div>
              <div className="digitBar uplBar"></div>
              <div className="digitBar midBar"></div>
              <div className="digitBar lorBar"></div>
              <div className="digitBar lolBar"></div>
              <div className="digitBar botBar"></div>
            </div>
          </div>
          <div className='timeBreak'>
            <div className='dot'></div>
            <div className='dot'></div>
          </div>
          <div className='seconds'>
            <div id='secondRightDigit' className='digit'>
              <div className="digitBar topBar"></div>
              <div className="digitBar uprBar"></div>
              <div className="digitBar uplBar"></div>
              <div className="digitBar midBar"></div>
              <div className="digitBar lorBar"></div>
              <div className="digitBar lolBar"></div>
              <div className="digitBar botBar"></div>
            </div>
            <div id='secondLeftDigit' className='digit'>
              <div className="digitBar topBar"></div>
              <div className="digitBar uprBar"></div>
              <div className="digitBar uplBar"></div>
              <div className="digitBar midBar"></div>
              <div className="digitBar lorBar"></div>
              <div className="digitBar lolBar"></div>
              <div className="digitBar botBar"></div>
            </div>
          </div>
        </div>
        <p className='visitTeamName'>Visitor Team</p>
        <div className='awayGoals'>
          <div id='awayRightDigit' className='digit'>
            <div className="digitBar topBar"></div>
            <div className="digitBar uprBar"></div>
            <div className="digitBar uplBar"></div>
            <div className="digitBar midBar"></div>
            <div className="digitBar lorBar"></div>
            <div className="digitBar lolBar"></div>
            <div className="digitBar botBar"></div>
          </div>
          <div id='awayLeftDigit' className='digit'>
            <div className="digitBar topBar"></div>
            <div className="digitBar uprBar"></div>
            <div className="digitBar uplBar"></div>
            <div className="digitBar midBar"></div>
            <div className="digitBar lorBar"></div>
            <div className="digitBar lolBar"></div>
            <div className="digitBar botBar"></div>
          </div>
        </div>
      </div>
    )
  }
}