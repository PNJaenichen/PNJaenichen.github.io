import React from 'react';
/*import { june21 } from '../static/testFetch'*/

export class BuildCalender extends React.Component {
  constructor(props) {
    super(props);
    this.setCalender = this.setCalender.bind(this);
    this.state = {
      startAPI: 'https://statsapi.web.nhl.com/api/v1/',
      monthData: null,
    }
  }

  setCalender(year, month) {
    let currentDate;
    const daysInMonth = new Date(year, month+1, 0).getDate();
    let games = {};
    const endAPI = `schedule?startDate=${year}-${month < 9 ? '0' + (month + 1) : month + 1}-01&endDate=${year}-${month < 9 ? '0' + (month + 1) : month + 1}-${daysInMonth}`
    fetch('https://statsapi.web.nhl.com/api/v1/' + endAPI).then(response => response.json()).then(responseJSON => responseJSON.dates.forEach(x => games[parseInt(x.date.slice(8))] = x));
    console.log(games);
    let row = [];
    let cell = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentDate = new Date(year, month, i);
      if (currentDate.getDate() === 1) {
        const dayOfWeek = currentDate.getDay();
        for (let j = 1; j <= dayOfWeek; j++) {
          cell.push(<td key={`blank${j}`}></td>);
        } 
        cell.push(<td key={i}>{i}</td>);  
      } else if (currentDate.getDay() === 0) {
        row.push(<tr key={`row${i}`}>{cell}</tr>)
        cell = [<td key={i}>{i}</td>]
      } else {
        cell.push(<td key={i}>{i}</td>);
      }   
    }
    row.push(<tr key={`rowLast`}>{cell}</tr>)
    return row;
  }
  
  render() {
    return (
      <div className='calender'>
        <table>
          <thead>
            <tr>
              <th>SU</th>
              <th>MO</th>
              <th>TU</th>
              <th>WE</th>
              <th>TH</th>
              <th>FR</th>
              <th>SA</th>
            </tr>
          </thead>
          <tbody>
            {this.setCalender(this.props.year, this.props.month)}
          </tbody>
        </table>
      </div>
    );
  }
}