import React from "react";
import { SearchBar } from "../SearchBar/SearchBar"
import { BuildCalender } from "../BuildCalender/BuildCalender";
import { BuildDailyGames } from "../BuildDailyGames/BuildDailyGames";
import { NHLapi } from "../../util/NHLapi"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyGames: ['','',[]],
      dailyGames: null,
    }
    this.monthSearch = this.monthSearch.bind(this);
    this.displayDailyGames = this.displayDailyGames.bind(this);
  }

  monthSearch(year, month) {
    NHLapi.monthSearch(year, month).then(searchResults =>
      this.setState({monthlyGames: searchResults, dailyGames: null}));
  }

  displayDailyGames(gameDay) {
    this.setState({dailyGames: this.state.monthlyGames[2][gameDay].games});
  }

  render() {
    console.log(this.state.dailyGames);
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <SearchBar onSearch={this.monthSearch} />
        {this.state.monthlyGames[0] 
          ? <BuildCalender onClick={this.displayDailyGames} monthlyGames={this.state.monthlyGames} />
          : null
        }
        {this.state.dailyGames
          ? <BuildDailyGames gameList={this.state.dailyGames} />
          : null
        }
      </div>  
    );
  }
}

export default App;
