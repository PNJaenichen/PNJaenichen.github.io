import React, { Component } from 'react'
import uniqid from 'uniqid'

// A section to add practical exp (company, title, tasks, dates)
// A submit button for each section or whole form
// Display values in HTML
// Button to edit and resubmit

class Experience extends Component {
  constructor() {
    super()
    this.state = {
      jobId: 0,
      employerName: '',
      jobTitle: '',
      jobStart: '',
      jobEnd: '',
      editJob: [false, null],
      experience: [],
      complete: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.addExperience = this.addExperience.bind(this)
    this.informationComplete = this.informationComplete.bind(this)
    this.getInformation = this.getInformation.bind(this)
    this.editExperience = this.editExperience.bind(this)
    this.removeExperience = this.removeExperience.bind(this)
  }
 
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  addExperience() {
    if (this.state.editJob[0]) {
      this.setState(prevState => {
        const newJob = {
          jobId: this.state.editJob[1],
          employerName: this.state.employerName,
          jobTitle: this.state.jobTitle,
          jobStart: this.state.jobStart,
          jobEnd: this.state.jobEnd
        }
        prevState.experience[this.state.editJob[1]] = newJob;
        return {
          employerName: '',
          jobTitle: '',
          jobStart: '',
          jobEnd: '',
          editJob: [false, null],
          experience: [...prevState.experience]
        }
      })
    } else {
      this.setState(prevState => {
        const newJob = {
          jobId: this.state.jobId.toString(),
          employerName: this.state.employerName,
          jobTitle: this.state.jobTitle,
          jobStart: this.state.jobStart,
          jobEnd: this.state.jobEnd
        }
        return {
          jobId: prevState.jobId + 1,
          employerName: '',
          jobTitle: '',
          jobStart: '',
          jobEnd: '',
          experience: [...prevState.experience, newJob]
        }
      })
    }
  }
  
  informationComplete() {
    this.setState({complete: true})
  }
  
  getInformation() {
    return (
      <div>
        <label htmlFor='employerName'>Employer Name:</label>
        <input 
          type='text' 
          id='employerName' 
          name='employerName'
          value={this.state.employerName}
          onChange={this.handleChange} 
        />
        <label htmlFor='jobTitle'>Job Title:</label>
        <input 
          type='text' 
          id='jobTitle' 
          name='jobTitle'
          value={this.state.jobTitle}
          onChange={this.handleChange}
        />
        <label htmlFor='jobStart'>Start:</label>
        <input 
          type='text' 
          id='jobStart' 
          name='jobStart' 
          value={this.state.jobStart}
          onChange={this.handleChange}
        />
        <label htmlFor='jobEnd'>End:</label>
        <input 
          type='text' 
          id='jobEnd' 
          name='jobEnd'
          value={this.state.jobEnd}
          onChange={this.handleChange}
        />
        <button onClick={this.addExperience}>Submit</button>
        <button onClick={this.informationComplete}>Complete</button> 
      </div>
    )
  }

  editExperience(event) {
    const editJob = {
      employerName: this.state.experience[event.target.value].employerName,
      jobTitle: this.state.experience[event.target.value].jobTitle,
      jobStart: this.state.experience[event.target.value].jobStart,
      jobEnd: this.state.experience[event.target.value].jobEnd,
      editJob: [true, event.target.value],
      complete: false
    }
    this.setState(editJob)
  }
  
  removeExperience(event) {
    const newJobList = this.state.experience.filter(entry => entry.jobId !== event.target.value)
    for (let i = 0; i < newJobList.length; i++) {
      if (newJobList[i]['jobId'] !== i.toString()) {
        newJobList[i]['jobId'] = i.toString();
      }
    }
    console.log(newJobList);
    this.setState(prevState => {
      return {
        jobId: prevState.jobId - 1, 
        experience: newJobList
      }
    })
  }

  render() {
    const jobList = this.state.experience.map(entry => {
      if ((!this.state.editJob[0] && entry !== null) || (this.state.editJob[0] && entry.jobId !== this.state.editJob[1])) {
        return (
            <tr key={uniqid()}>
              <td>{entry.employerName}</td>
              <td>{entry.jobTitle}</td>
              <td>{entry.jobStart}-{entry.jobEnd}</td>
              <td><button value={entry.jobId} onClick={this.editExperience}>Edit</button></td>
              <td><button value={entry.jobId} onClick={this.removeExperience}>Remove</button></td>
            </tr>
        )
      }
      return null
    })
    return (
      <div>
        {this.state.complete ? null : this.getInformation()}
        <table>
          <thead>
            <tr>
              <th>Employer</th>
              <th>Job Title</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>
            {jobList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Experience