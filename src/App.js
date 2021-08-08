import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Blog from './Blog';
import Home from './Home';
import Projects from './Projects';
import ResumeCV from './ResumeCV';
import React from 'react';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          <nav>
            <ul id='navigation'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/Blog'>Blog</Link>
              </li>
              <li>
                <Link to='/Projects'>Projects</Link>
              </li>
              <li>
                <Link to='/ResumeCV'>Resume/CV</Link>
              </li>
            </ul>
          </nav>
        </div>
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
