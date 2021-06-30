import React from 'react';
import './BuildCalender.css';

export class BuildCalender extends React.Component {
  constructor(props) {
    super(props);
    this.setCalender = this.setCalender.bind(this);
  }

  setCalender(info) {
    const month = info[0];
    const year = info[1];
    let currentDate;
    const daysInMonth = new Date(year, parseInt(month)+1, 0).getDate();
    let gamesToo = info[2];
    let row = [];
    let cell = [];
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
    return months[this.props.monthlyGames[0]];
    }
  
  render() {
    return (
      <div className='calender'>
        <table>
          <thead>
            <tr className='calTitle'>
              <th colSpan='7'>{`${this.getMonth()} ${this.props.monthlyGames[1]}`}</th>
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
            {this.setCalender(this.props.monthlyGames)}
          </tbody>
        </table>
      </div>
    );
  }
}