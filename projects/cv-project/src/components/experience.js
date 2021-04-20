import React, { Component } from 'react'

// A section to add practical exp (company, title, tasks, dates)
// A submit button for each section or whole form
// Display values in HTML
// Button to edit and resubmit

class Experience extends Component {
  constructor() {
    super()
    this.state = {
      experience: [] 
    }
    this.getInformation = this.getInformation.bind(this)
    this.addExperience = this.addExperience.bind(this)
  }

  addExperience() {
    this.setState(prevState => {
      const newJob = {
        employer: document.getElementById('employerName').value,
        jobTitle: document.getElementById('jobTitle').value,
        start: document.getElementById('jobStart').value,
        end: document.getElementById('jobEnd').value
      }
      return {experience: [...prevState.experience, newJob]}
    })

  }

  getInformation() {
    return (
      <div>
        <label for='employerName'>Employer Name:</label>
        <input type='text' id='employerName' name='employerName' />
        <label for='jobTitle'>Job Title:</label>
        <input type='text' id='jobTitle' name='jobTitle' />
        <label for='jobStart'>Start:</label>
        <input type='text' id='jobStart' name='jobStart' />
        <label for='jobEnd'>End:</label>
        <input type='text' id='jobEnd' name='jobEnd' />
        <input type='submit' onClick={this.addExperience} value='Submit' />
      </div>
    )
  }

  render() {
    const jobList = this.state.experience.map(entry => {
      return (
          <tr>
            <td>{entry.employer}</td>
            <td>{entry.jobTitle}</td>
            <td>{entry.start}-{entry.end}</td>
          </tr>
      )
    })
    return (
      <div>
        {this.getInformation()}
        <table>
          <tr>
            <th>Employer</th>
            <th>Job Title</th>
            <th>Years</th>
          </tr>
          {jobList}
        </table>
      </div>
    )
  }
}

export default Experience