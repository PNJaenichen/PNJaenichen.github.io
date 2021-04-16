import React, { Component } from 'react'
import General from './components/general'

// A section to add general information like name, email, phone number
// A section to add educational info (school, study, dates)
// A section to add practical exp (company, title, tasks, dates)
// A submit button for each section or whole form
// Display values in HTML
// Button to edit and resubmit

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>My CV</h1>
        <h2>Contact Information</h2>
        <General />
        <h2>Education</h2>
        <h2>Experience</h2>
      </div>
    )
  };
}

export default App;
