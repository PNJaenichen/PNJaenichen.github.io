import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '2021',
      month: '0',
    };
    this.search = this.search.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.year, this.state.month);
  }

  handleYearChange(event) {
    this.setState({year: event.target.value});
  }

  handleMonthChange(event) {
    this.setState({month: event.target.value});
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    const monthOptions = months.map(x => <option key={`${x}${months.indexOf(x)}`} value={months.indexOf(x)}>{x}</option>)
    const now = new Date().getUTCFullYear();
    const years = Array(now - 1920).fill('').map((v, idx) => now - idx);
    const yearOptions = years.map(x => <option key={`year${x}`} value={x}>{x}</option>)
    return (
      <div className='SearchBar'>
        <label>Select Month:
          <select value={this.state.month} onChange={this.handleMonthChange}>
            {monthOptions}
          </select>
        </label>
        <label>Select Year:
          <select value={this.state.year} onChange={this.handleYearChange}>
            {yearOptions}
          </select>
        </label>
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    )
  }

}