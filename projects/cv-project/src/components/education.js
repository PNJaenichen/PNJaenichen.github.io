import React, { Component } from 'react'

// A section to add educational info (school, study, dates)
// A submit button for each section or whole form
// Display values in HTML
// Button to edit and resubmit

class Education extends Component {
  constructor() {
    super()
    this.state = {
      education: [] 
    }
    this.getInformation = this.getInformation.bind(this)
    this.addEducation = this.addEducation.bind(this)
  }

  addEducation() {
    this.setState(prevState => {
      const newEd = {
        school: document.getElementById('schoolName').value,
        study: document.getElementById('study').value,
        start: document.getElementById('startDate').value,
        end: document.getElementById('endDate').value
      }
      return {education: [...prevState.education, newEd]}
    })

  }

  getInformation() {
    return (
      <div>
        <label for='schoolName'>School:</label>
        <input type='text' id='schoolName' name='schoolName' />
        <label for='study'>Study:</label>
        <input type='text' id='study' name='study' />
        <label for='startDate'>Start:</label>
        <input type='text' id='startDate' name='startDate' />
        <label for='endDate'>End:</label>
        <input type='text' id='endDate' name='endDate' />
        <input type='submit' onClick={this.addEducation} value='Submit' />
      </div>
    )
  }

  render() {
    const educationList = this.state.education.map(entry => {
      return (
          <tr>
            <td>{entry.school}</td>
            <td>{entry.study}</td>
            <td>{entry.start}-{entry.end}</td>
          </tr>
      )
    })
    return (
      <div>
        {this.getInformation()}
        {document.getElementById('schoolName').value = ''}
        {document.getElementById('study').value = ''}
        {document.getElementById('startDate').value = ''}
        {document.getElementById('endDate').value = ''}
        <table>
          <tr>
            <th>School</th>
            <th>Study</th>
            <th>Years</th>
          </tr>
          {educationList}
        </table>
      </div>
    )
  }
}

export default Education