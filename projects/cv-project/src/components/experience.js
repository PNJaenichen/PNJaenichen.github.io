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
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  addExperience() {
    this.setState(prevState => {
      const newJob = {
        employerName: this.state.employerName,
        jobTitle: this.state.jobTitle,
        jobStart: this.state.jobStart,
        jobEnd: this.state.jobEnd
      }
      return {
        employerName: '',
        jobTitle: '',
        jobStart: '',
        jobEnd: '',
        experience: [...prevState.experience, newJob]}
    })

  }

  getInformation() {
    return (
      <div>
        <label for='employerName'>Employer Name:</label>
        <input 
          type='text' 
          id='employerName' 
          name='employerName'
          value={this.state.employerName}
          onChange={this.handleChange} 
        />
        <label for='jobTitle'>Job Title:</label>
        <input 
          type='text' 
          id='jobTitle' 
          name='jobTitle'
          value={this.state.jobTitle}
          onChange={this.handleChange}
        />
        <label for='jobStart'>Start:</label>
        <input 
          type='text' 
          id='jobStart' 
          name='jobStart' 
          value={this.state.jobStart}
          onChange={this.handleChange}
        />
        <label for='jobEnd'>End:</label>
        <input 
          type='text' 
          id='jobEnd' 
          name='jobEnd'
          value={this.state.jobEnd}
          onChange={this.handleChange}
        />
        <input type='submit' onClick={this.addExperience} value='Submit' />
      </div>
    )
  }

  render() {
    const jobList = this.state.experience.map(entry => {
      return (
          <tr>
            <td>{entry.employerName}</td>
            <td>{entry.jobTitle}</td>
            <td>{entry.jobStart}-{entry.jobEnd}</td>
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