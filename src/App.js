import { Route, Switch } from 'react-router-dom';
import Blog from './Blog';
import Home from './Home';
import Projects from './Projects';
import ResumeCV from './ResumeCV';
import React from 'react';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Blog">
            <Blog />
          </Route>
          <Route path="/Projects">
            <Projects />
          </Route>
          <Route path="/ResumeCV">
            <ResumeCV />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
