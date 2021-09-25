import React, { Component } from 'react'
import General from './components/projects/cv-project/components/general'
import Education from './components/projects/cv-project/components/education'
import Experience from './components/projects/cv-project/components/experience'

class resumeApp extends Component {
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
        <Education />
        <h2>Experience</h2>
        <Experience />
      </div>
    )
  };
}

export default resumeApp;
