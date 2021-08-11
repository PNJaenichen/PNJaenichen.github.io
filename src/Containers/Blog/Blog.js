import React from "react";
import "../../assets/sheets/main.css";
import "../../assets/sheets/normalize.css";

export default class Blog extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <h2>Blog Page</h2>
        </div>
        <main>
          <div className="leftcolumn">
            <div className="card">
              <h3>LOREM IPSUM...</h3>
              <h4>...dolor sit amet; MMM DD, YYYY</h4>
              <div className="fakeimg"><img src="" alt="Empty" height="100%" /></div>
              <p>This is a blog entry</p>
              <p>Consectetur adipisicing elit.</p>
            </div>
          </div>
          
        </main>
      </div>
    );
  }
}