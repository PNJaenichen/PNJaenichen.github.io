import React from 'react';

export default class DayCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      start: new Date(2021, 0, 4),
      updated: new Date(2021, 7, 23)
    }
    this.formatDate = this.formatDate.bind(this);
    this.dayDifference = this.dayDifference.bind(this);
  }

  formatDate(input) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const buildYear = input.getFullYear();
    const buildMonth = months[input.getMonth()];
    const buildDate = input.getDate();
    return `${buildDate} ${buildMonth} ${buildYear}`;
  }

  dayDifference(input1, input2) {
    const diffTime = input1.getTime() - input2.getTime();
    return Math.floor(diffTime / (1000 * 3600 * 24));
  }

  render() {
    let final = "";
    if (this.dayDifference(this.state.today, this.state.updated) === 0) {
      final = "is today.";
    } else if (this.dayDifference(this.state.today, this.state.updated) === 1) {
      final = "was yesterday!";
    } else {
      final = `was ${this.dayDifference(this.state.today, this.state.updated)} days ago.`;
    }
    return (
      <p>
        Today is {this.formatDate(this.state.today)}. This page was created on 
        This page was created on {this.formatDate(this.state.start)} and that 
        was {this.dayDifference(this.state.today, this.state.start)} days ago. 
        It was last updated on {this.formatDate(this.state.updated)} which {final}
      </p>
    )
  }

}