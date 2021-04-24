import React, { Component } from 'react'
import uniqid from 'uniqid'

// A section to add educational info (school, study, dates)
// A submit button for each section or whole form
// Display values in HTML
// Button to edit and resubmit

class Education extends Component {
  constructor() {
    super()
    this.state = {
      educationId: 0,
      schoolName: '', 
      study: '', 
      schoolStart: '', 
      schoolEnd: '',
      editEducation: [false, null],
      education: [] 
    }
    this.getInformation = this.getInformation.bind(this)
    this.addEducation = this.addEducation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.editEducation = this.editEducation.bind(this)
  }

  addEducation() {
    if (this.state.editEducation[0]) {
      this.setState(prevState => {
        const newEd = {
          schoolName: this.state.schoolName,
          study: this.state.study,
          schoolStart: this.state.schoolStart,
          schoolEnd: this.state.schoolEnd
        }
        prevState.education[this.state.editEducation[1]] = newEd;
        return {
          schoolName: '', 
          study: '', 
          schoolStart: '', 
          schoolEnd: '', 
          education: [...prevState.education]
        }
      })
    } else {
      this.setState(prevState => {
        const newEd = {
          educationId: this.state.educationId,
          schoolName: this.state.schoolName,
          study: this.state.study,
          schoolStart: this.state.schoolStart,
          schoolEnd: this.state.schoolEnd
        }
        return {
          educationId: prevState.educationId + 1,
          schoolName: '', 
          study: '', 
          schoolStart: '', 
          schoolEnd: '', 
          education: [...prevState.education, newEd]
        }
      })
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  getInformation() {
    return (
      <div>
        <label htmlFor='schoolName'>School:</label>
        <input 
          type='text' 
          id='schoolName' 
          name='schoolName' 
          value={this.state.schoolName} 
          onChange={this.handleChange} 
        />
        <label htmlFor='study'>Study:</label>
        <input 
          type='text' 
          id='study' 
          name='study' 
          value={this.state.study} 
          onChange={this.handleChange} 
        />
        <label htmlFor='schoolStart'>Start:</label>
        <input 
          type='text' 
          id='schoolStart' 
          name='schoolStart' 
          value={this.state.schoolStart} 
          onChange={this.handleChange} 
        />
        <label htmlFor='schoolEnd'>End:</label>
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

  editEducation(event) {
    const editEd = {
      schoolName: this.state.education[event.target.value].schoolName,
      study: this.state.education[event.target.value].study,
      schoolStart: this.state.education[event.target.value].schoolStart,
      schoolEnd: this.state.education[event.target.value].schoolEnd,
      editEducation: [true, event.target.value]
    }
    this.setState(editEd)
  }

  render() {
    const educationList = this.state.education.map(entry => {
      return (
          <tr key={uniqid()}>
            <td>{entry.schoolName}</td>
            <td>{entry.study}</td>
            <td>{entry.schoolStart}-{entry.schoolEnd}</td>
            <td><button value={entry.educationId} onClick={this.editEducation}>Edit</button></td>
          </tr>
      )
    })
    return (
      <div>
        {this.getInformation()}
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Study</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>
            {educationList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Education