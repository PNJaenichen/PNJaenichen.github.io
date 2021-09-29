import React from 'react';
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import App from './App';
import './cv-project.css'

let radioValue = document.querySelector('input[name="projectName"]:checked').value;

function renderComponent(radio) {
  ReactDOM.render(
    <React.StrictMode>
      <HashRouter>
        <App testMessage={radio} />
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

document.querySelectorAll('[name="projectName"]').forEach((elem) => {
  elem.addEventListener('change', function() {
    radioValue = document.querySelector('input[name="projectName"]:checked').value; 
    renderComponent(radioValue);
  });
});

renderComponent(radioValue);

