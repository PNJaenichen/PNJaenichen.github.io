import React from 'react';
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './cv-project.css'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <resumeApp />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

