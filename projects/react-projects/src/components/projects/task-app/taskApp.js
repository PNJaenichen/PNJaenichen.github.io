import React, { Component } from 'react'
import uniqid from 'uniqid'
import Overview from './components/Overview';

class TaskApp extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      tasks: [],
    }
    this.newTasker = this.newTasker.bind(this);
    this.addTasker = this.addTasker.bind(this);
  }
  newTasker(e) {
    this.setState(() => {
      return {task: e.target.value}
    });
  }
  addTasker(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {tasks: [...prevState.tasks, this.state.task]}
    });
    this.setState({task: ''});
  }
  render() {
    let taskElements = this.state.tasks.map(tasker => (<p key={uniqid()}>{tasker}</p>))
    return (
      <div>
        <input id='inputText' type='text' onChange={this.newTasker} value={this.state.task}></input>
        <button onClick={this.addTasker}>Add Task</button>
        <Overview task={taskElements}/>
      </div>
    );
  }
}

export default TaskApp;
