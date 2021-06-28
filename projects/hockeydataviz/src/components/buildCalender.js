import React from 'react';
import { june21 } from '../static/testFetch';

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
    let gamesToo = {};
    const endAPI = `schedule?startDate=${year}-${month < 9 ? '0' + (month + 1) : month + 1}-01&endDate=${year}-${month < 9 ? '0' + (month + 1) : month + 1}-${daysInMonth}`
    fetch('https://statsapi.web.nhl.com/api/v1/' + endAPI).then(response => response.json()).then(responseJSON => responseJSON.dates.forEach(x => games[parseInt(x.date.slice(8))] = x));
    june21.dates.forEach(x => gamesToo[parseInt(x.date.slice(8))] = x);
    let row = [];
    let cell = [];
    console.log(games);
    for (let i = 1; i <= daysInMonth; i++) {
      currentDate = new Date(year, month, i);
      if (currentDate.getDate() === 1) {
        const dayOfWeek = currentDate.getDay();
        for (let j = 1; j <= dayOfWeek; j++) {
          cell.push(<td key={`blank${j}`}></td>);
        }
        if (i in gamesToo) {
          cell.push(<td key={i}><a href={`#${i}`}>{i}</a></td>);
        } else {
          cell.push(<td key={i}>{i}</td>); 
        }
      } else if (currentDate.getDay() === 0) {
        row.push(<tr key={`row${i}`}>{cell}</tr>)
        if (i in gamesToo) {
          cell = [<td key={i}><a href={`#${i}`}>{i}</a></td>];
        } else {
          cell = [<td key={i}>{i}</td>];
        }
      } else {
        if (i in gamesToo) {
          cell.push(<td key={i}><a href={`#${i}`}>{i}</a></td>);
        } else {
          cell.push(<td key={i}>{i}</td>);
        }
      }   
    }
    row.push(<tr key={`rowLast`}>{cell}</tr>)
    return row;
  }
  
  getMonth() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    return months[this.props.month];
    }
  

  render() {
    return (
      <div className='calender'>
        <table>
          <thead>
            <tr>
              <th colSpan='5'>{this.getMonth()}</th>
              <th colSpan='2'>{this.props.year}</th>
            </tr>
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