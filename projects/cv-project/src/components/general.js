import React, { Component } from 'react'

// A section to add general information like name, email, phone number

class General extends Component {
  constructor() {
    super()
    this.state = {}
    this.doSomething = this.doSomething.bind(this)
    this.buildGeneral = this.buildGeneral.bind(this)
  }

  doSomething() {
    this.setState(() => {
      return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phoneNum').value
      }
    });
  }

  buildGeneral() {
    if (Object.keys(this.state).length !== 0) {
      return (
        <div>
          <p>Name: {this.state.name}</p>
          <p>Email: {this.state.email}</p>
          <p>Phone: {this.state.phone}</p>
          <button className='edit' onClick={this.editInfo}>Edit</button>
        </div>
      )
    }
    return (
      <div>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name'></input>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email'></input>
        <label htmlFor='phoneNum'>Phone Number:</label>
        <input type='text' id='phoneNum' name='phoneNum'></input>
        <input type='submit' value='Press to Test' onClick={this.doSomething}></input>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.buildGeneral()}
      </div>
    )
  }
}

export default General 