import React from "react";
import JammmingApp from "./components/projects/jammming/Components/App/JammmingApp";
import ResumeApp from "./components/projects/cv-project/resumeApp";
import TaskApp from "./components/projects/task-app/taskApp";

export default class App extends React.Component {
  render() {
    let reactProj = "";
    switch (this.props.testMessage) {
      case "cv-project":
        reactProj = <ResumeApp />;
        break;
      case "jammming":
        reactProj = <JammmingApp />;
        break;
      case "task-app":
        reactProj = <TaskApp />;
        break;
      default:
        reactProj = "No project has been selected.";
    }
    return (
      <div>
        {reactProj}    
      </div>
    )
  }
}