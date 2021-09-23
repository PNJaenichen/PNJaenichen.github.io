import React from 'react';
import { Link } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import ResumeApp from './resumeApp';
import './cv-project.css'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ResumeApp />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

