import React, { Component } from 'react'
import uniqid from 'uniqid'

// A section to add general information like name, email, phone number
// A submit button for each section or whole form
// Display values in HTML
// Button to edit and resubmit

class General extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phoneNum: '',
      info: [],
      edit: true,
      complete: false
    }
    this.submitInformation = this.submitInformation.bind(this)
    this.buildGeneral = this.buildGeneral.bind(this)
    this.completeGeneral = this.completeGeneral.bind(this)
    this.inputGeneral = this.inputGeneral.bind(this)
    this.editGeneral = this.editGeneral.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  submitInformation() {
    this.setState(() => {
      return {
        info: [this.state.name, this.state.email, this.state.phoneNum],
        edit: false
      }
    });
  }

  completeGeneral() {
    this.setState({complete: true})
  }

  editGeneral() {
    this.setState({edit: true})
  }

  inputGeneral() {
    return (
      <div>
        <label htmlFor='name'>Name:</label>
        <input 
          type='text' 
          id='name' 
          name='name' 
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor='email'>Email:</label>
        <input 
          type='email' 
          id='email' 
          name='email' 
          value={this.state.email}
          onChange={this.handleChange} 
        />
        <label htmlFor='phoneNum'>Phone Number:</label>
        <input 
          type='text' 
          id='phoneNum' 
          name='phoneNum' 
          value={this.state.phoneNum}
          onChange={this.handleChange}
        />
        <button onClick={this.submitInformation}>Submit</button>
      </div>
    )
  }

  buildGeneral() {
    if (this.state.name !== '' || this.state.email !== '' || this.state.phoneNum !== '') {
      if (!this.state.complete && this.state.info.length !== 0) {
        return (
          <tr key={uniqid()}>
            <td>{this.state.info[0]}</td>
            <td>{this.state.info[1]}</td>
            <td>{this.state.info[2]}</td>
            <td><button onClick={this.editGeneral}>Edit</button></td>
            <td><button onClick={this.completeGeneral}>Complete</button></td>
          </tr>
        )
      } else {
        return (
          <tr key={uniqid()}>
            <td>{this.state.info[0]}</td>
            <td>{this.state.info[1]}</td>
            <td>{this.state.info[2]}</td>
          </tr>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {!this.state.edit ? null : this.inputGeneral()}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.buildGeneral()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default General 