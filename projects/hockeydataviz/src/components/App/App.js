import React from "react";
import { SearchBar } from "../SearchBar/SearchBar"
import { BuildCalender } from "../BuildCalender/BuildCalender";
import { NHLapi } from "../../util/NHLapi"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyGames: ['5','2021',[]],
    }
    this.monthSearch = this.monthSearch.bind(this);
  }

  monthSearch(year, month) {
    NHLapi.monthSearch(year, month).then(searchResults =>
      this.setState({monthlyGames: searchResults}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <SearchBar onSearch={this.monthSearch} />
        <BuildCalender monthlyGames={this.state.monthlyGames} />
      </div>  
    );
  }
}

export default App;
