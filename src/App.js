  import { Route, Switch } from "react-router-dom";
  import Blog from "./Containers/Blog/Blog";
  import Home from "./Containers/Home/Home"
  import Projects from "./Containers/Projects/Projects";
  import ResumeCV from "./Containers/ResumeCV/ResumeCV";
  import React from "react";


  class App extends React.Component {
    render() {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Blog" component={Blog} />
            <Route exact path="/Projects" component={Projects} />
            <Route path="/ResumeCV" component={ResumeCV} />
          </Switch>
        </div>
      );
    }
  }

  export default App;
