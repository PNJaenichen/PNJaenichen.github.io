import React, { Component } from 'react'
import Overview from './components/Overview';

class App extends Component {
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
    this.setState(() => {
      return {tasks: [...this.state.tasks, this.state.task]}
    });
    this.setState(() => {
      return {task: ''};
    });
  }
  render() {
    return (
      <div>
        <input id='inputText' type='text' onChange={this.newTasker} value={this.state.task}></input>
        <button onClick={this.addTasker}>Add Task</button>
        <Overview msg={this.state.tasks}/>
      </div>
    );
  }
}

export default App;
