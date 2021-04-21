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
    this.handleChange = this.handleChange.bind(this)
  }

  addEducation() {
    this.setState(prevState => {
      const newEd = {
        schoolName: this.state.schoolName,
        study: this.state.study,
        schoolStart: this.state.schoolStart,
        schoolEnd: this.state.schoolEnd
      }
      return {
        schoolName: '', 
        study: '', 
        schoolStart: '', 
        schoolEnd: '', 
        education: [...prevState.education, newEd]
      }
    })
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  getInformation() {
    return (
      <div>
        <label for='schoolName'>School:</label>
        <input 
          type='text' 
          id='schoolName' 
          name='schoolName' 
          value={this.state.schoolName} 
          onChange={this.handleChange} 
        />
        <label for='study'>Study:</label>
        <input 
          type='text' 
          id='study' 
          name='study' 
          value={this.state.study} 
          onChange={this.handleChange} 
        />
        <label for='schoolStart'>Start:</label>
        <input 
          type='text' 
          id='schoolStart' 
          name='schoolStart' 
          value={this.state.schoolStart} 
          onChange={this.handleChange} 
        />
        <label for='schoolEnd'>End:</label>
        <input 
          type='text' 
          id='schoolEnd' 
          name='schoolEnd' 
          value={this.state.schoolEnd} 
          onChange={this.handleChange} 
        />
        <input type='submit' onClick={this.addEducation} value='Submit' />
      </div>
    )
  }

  render() {
    const educationList = this.state.education.map(entry => {
      return (
          <tr>
            <td>{entry.schoolName}</td>
            <td>{entry.study}</td>
            <td>{entry.schoolStart}-{entry.schoolEnd}</td>
          </tr>
      )
    })
    return (
      <div>
        {this.getInformation()}
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