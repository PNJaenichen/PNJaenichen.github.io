import React from "react";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>this is a test, showing {this.props.testMessage}</p>
      </div>
    )
  }
}