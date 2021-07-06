import React from 'react';

export class GameDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.handleReturn = this.handleReturn.bind(this);
  }

  handleReturn() {
    this.props.onClick()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleReturn}>Return</button>
        <p>{JSON.stringify(this.props.gameData)}</p>
      </div>
    )
  }
}