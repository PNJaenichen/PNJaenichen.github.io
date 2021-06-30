import React from "react";
import { SearchBar } from "../SearchBar/SearchBar"
import { BuildCalender } from "../BuildCalender/BuildCalender";
import { NHLapi } from "../../util/NHLapi"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyGames: ['','',[]],
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
        {this.state.monthlyGames[0] 
          ? <BuildCalender monthlyGames={this.state.monthlyGames} />
          : null
        }
      </div>  
    );
  }
}

export default App;
