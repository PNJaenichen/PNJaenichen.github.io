import React, { Component } from 'react'

// A section to add general information like name, email, phone number

class General extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Initial',
      email: '',
      phoneNumber: ''
    }
    this.doSomething = this.doSomething.bind(this)
  }

  doSomething(e) {
  /*  this.setState(() => {
      return {name: 'Nate'}
    }); */
    console.log(e)
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name'></input>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email'></input>
          <label htmlFor='phoneNum'>Phone Number:</label>
          <input type='text' id='phoneNum' name='phoneNum'></input>
          <input type='submit' value='Press to Test' onClick={this.doSomething}></input>
        </form>
        <p>{this.state.name}</p>
      </div>
    )
  }
}

export default General 