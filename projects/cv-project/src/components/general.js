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
      phoneNum: '',
      edit: true
    }
    this.doSomething = this.doSomething.bind(this)
    this.buildGeneral = this.buildGeneral.bind(this)
    this.inputGeneral = this.inputGeneral.bind(this)
    this.editGeneral = this.editGeneral.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  doSomething() {
    this.setState(() => {
      return {
        name: this.state.name,
        email: this.state.email,
        phoneNum: this.state.phoneNum,
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
        <input type='submit' value='Submit' onClick={this.doSomething}></input>
      </div>
    )
  }

  buildGeneral() {
    if (this.state.name !== '' || this.state.email !== '' || this.state.phoneNum !== '') {
      return (
        <div>
          <p>Name: {this.state.name}</p>
          <p>Email: {this.state.email}</p>
          <p>Phone: {this.state.phoneNum}</p>
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