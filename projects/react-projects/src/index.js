import React from 'react';
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import App from './App';
import './cv-project.css'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App testMessage={document.querySelector('input[name="projectName"]:checked').value}/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

