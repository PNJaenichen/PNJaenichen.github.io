import React from "react";

export default class App extends React.Component {
  makeChange() {
    this.props.onChange();
  }

  render() {
    let message = "";
    switch (this.props.testMessage) {
      case "cv-project":
        message = "The CV Project was selected.";
        break;
      case "jammming":
        message = "The Jammming Project was selected.";
        break;
      case "task-app":
        message = "The Task App Project was selected.";
        break;
      default:
        message = "No project has been selected.";
    }
    return (
      <div>
        <p>{message}</p>    
      </div>
    )
  }
}