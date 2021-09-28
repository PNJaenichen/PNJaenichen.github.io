import React from "react";

export default class App extends React.Component {
  render() {
    console.log(document.querySelector('input[name="projectName"]:checked').value)
    return (
      <div>
        <p>The project selected is: {this.props.testMessage}</p>
      </div>
    )
  }
}