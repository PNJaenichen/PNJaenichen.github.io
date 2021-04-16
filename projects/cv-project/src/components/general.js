import React, { Component } from 'react'

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
      phone: '',
      edit: true
    }
    this.doSomething = this.doSomething.bind(this)
    this.buildGeneral = this.buildGeneral.bind(this)
    this.inputGeneral = this.inputGeneral.bind(this)
    this.editGeneral = this.editGeneral.bind(this)
  }

  doSomething() {
    this.setState(() => {
      return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phoneNum').value,
        edit: false
      }
    });
  }

  editGeneral() {
    this.setState({edit: true})
  }

  inputGeneral() {
    return (
      <div>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' defaultValue={this.state.name}></input>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' defaultValue={this.state.email}></input>
        <label htmlFor='phoneNum'>Phone Number:</label>
        <input type='text' id='phoneNum' name='phoneNum' defaultValue={this.state.phone}></input>
        <input type='submit' value='Press to Test' onClick={this.doSomething}></input>
      </div>
    )
  }

  buildGeneral() {
    if (this.state.name !== '' || this.state.email !== '' || this.state.phone !== '') {
      return (
        <div>
          <p>Name: {this.state.name}</p>
          <p>Email: {this.state.email}</p>
          <p>Phone: {this.state.phone}</p>
          <button className='edit' onClick={this.editGeneral}>Edit</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>{this.state.edit ? this.inputGeneral() : this.buildGeneral()}
      </div>
    )
  }
}

export default General 