import React from 'react';
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import RinkDisplay from '../RinkDisplay/RinkDisplay'
import './GameDisplay.css';

export class GameDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 'F',
    }
    this.handleReturn = this.handleReturn.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
  }

  handleReturn() {
    this.props.onClick()
  }

  changePeriod(per) {
    this.setState({period: per})
  }

  render() {
    return (
      <div className='gameDisplay'>
        <button onClick={this.handleReturn}>Return</button>
        <ScoreBoard 
          boxscore={this.props.gameData.liveData.boxscore.teams} 
          timeRemaining={this.props.gameData.liveData.plays.currentPlay ? this.props.gameData.liveData.plays.currentPlay.about : '00:00'} 
          periodSelect={this.changePeriod}
          period={this.state.period}
        />
        <RinkDisplay gameInfo={this.props.gameData.liveData} period={this.state.period} />
      </div>
    )
  }
} 