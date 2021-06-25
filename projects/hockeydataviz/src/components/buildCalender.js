import React from 'react';
import { june21 } from '../static/testFetch'

export class BuildCalender extends React.Component {
  constructor(props) {
    super(props);
    this.setCalender = this.setCalender.bind(this);
    this.state = {
      startAPI: 'https://statsapi.web.nhl.com/api/v1/'
    }
  }

  async getCalender(start, end) {
    /*const endAPI = `schedule?startDate=${start}&endDate=${end}`
    const response = await fetch(this.state.startAPI + endAPI);
    const responseJSON = await response.json();*/
    console.log(start, end);
    const responseJSON = setTimeout(() => {return june21}, 1000);
    return responseJSON;
  }

  setCalender(year, month) {
    let currentDate;
    const daysInMonth = new Date(year, month+1, 0).getDate();
    let row = [];
    let cell = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentDate = new Date(year, month, i);
      if (currentDate.getDate() === 1) {
        const dayOfWeek = currentDate.getDay();
        for (let j = 1; j <= dayOfWeek; j++) {
          cell.push(<td></td>);
        }
        cell.push(<td>{i}</td>)
      } else if (currentDate.getDay() === 0) {
        row.push(<tr>{cell}</tr>)
        cell = [<td>{i}</td>];
      } else {
        cell.push(<td>{i}</td>)
      }
    }
    row.push(<tr>{cell}</tr>)
    return row;
  }
  render() {
    return (
      <div className='calender'>
        <table>
          <tr>
            <th>SU</th>
            <th>MO</th>
            <th>TU</th>
            <th>WE</th>
            <th>TH</th>
            <th>FR</th>
            <th>SA</th>
          </tr>
          {this.setCalender(this.props.year, this.props.month)}
        </table>
      </div>
    );
  }
}