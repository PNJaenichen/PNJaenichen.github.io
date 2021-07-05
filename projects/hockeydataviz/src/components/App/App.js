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
      gameInfo: null,
    }
    this.monthSearch = this.monthSearch.bind(this);
    this.getGameData = this.getGameData.bind(this);
    this.displayDailyGames = this.displayDailyGames.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
  }

  monthSearch(year, month) {
    NHLapi.monthSearch(year, month).then(searchResults =>
      this.setState({monthlyGames: searchResults, dailyGames: null}));
  }

  displayDailyGames(gameDay) {
    this.setState({dailyGames: this.state.monthlyGames[2][gameDay].games});
  }

  getGameData(gameID) {
    NHLapi.getGameData(gameID).then(searchResults => {
      console.log(searchResults);
      this.setState({gameInfo: searchResults})
    });
  }

  backToSearch() {
    this.setState({gameInfo: null});
  }

  render() {
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
          ? <BuildDailyGames gameList={this.state.dailyGames} onClick={this.getGameData} />
          : null
        }
      </div>  
    );
  }
}

export default App;
