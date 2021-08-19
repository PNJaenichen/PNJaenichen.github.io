import React from "react";
import { Link } from "react-router-dom";

export default class ResumeCV extends React.Component {
  render() {
    return (
      <div className="grid">
        <div className="leftColumn">
          <h1>Nate Jaenichen</h1>
          <div className="seperator">
            <h2>Personal Info</h2>
          </div>
          <h3>Address</h3>
          <p>Insert Address Here</p>
          <h3>Phone</h3>
          <p>Insert Phone Here</p>
          <h3>E-mail</h3>
          <p>pnjaenichen@gmail.com</p>
          <h3>LinkedIn</h3>
          <p>linkedin.com/in/pauljaenichen</p>
          <div className="seperator">
            <h2>Skills</h2>
          </div>
          <p></p>
          <div className="seperator">
            <h2>Programming</h2>
          </div>
          <label for="python">Python</label>
          <progress id="python" max="100" value="50"></progress>
          <p class="levelText">Good</p>
          <label for="python">Javascript</label>
          <progress id="python" max="100" value="70"></progress>
          <p class="levelText">Very Good</p>
          <label for="python">CSS</label>
          <progress id="python" max="100" value="50"></progress>
          <p class="levelText">Good</p>
          <label for="python">HTML</label>
          <progress id="python" max="100" value="50"></progress>
          <p class="levelText">Good</p>
          <div className="seperator">
            <h2>Languages</h2>
          </div>
          <label for="python">English</label>
          <progress id="python" max="100" value="90"></progress>
          <p class="levelText">Native</p>
          <label for="python">German</label>
          <progress id="python" max="100" value="25"></progress>
          <p class="levelText">Basic</p>
        </div>
        <div className="rightColumn">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab 
            quidem fuga, maiores, sequi praesentium omnis vitae laborum, 
            accusantium amet sint vel perspiciatis nisi dolore laboriosam 
            quas sunt magnam enim at?
          </p>
          <h2>Experience</h2>
          <div className="expEntry">
            <div className="dateColumn">
              2005-05 to Present
            </div>
            <div className="experienceColumn">
              US Marine
            </div>
          </div>
          <h2>Education</h2>
          <div className="expEntry">
            <div className="dateColumn">
              2017-08 to 2019-05
            </div>
            <div className="experienceColumn">
              Master of Data Analytics, University of Maryland University College
            </div>
          </div>
          <div className="expEntry">
            <div className="dateColumn">
              2001-06 to 2005-05
            </div>
            <div className="experienceColumn">
              Bachelor of History, United States Naval Academy
            </div>
          </div>
          <h2>Certifications</h2>
          <div className="expEntry">
            <div className="dateColumn">
              2021-06
            </div>
            <div className="experienceColumn">
              Yellow Belt, Lean Six Sigma
            </div>
          </div>
          <h2>Interests</h2>
          <p>Avid board gamer with a podcast (<a href="https://www.firstturncast.com">First Turn</a>)</p>
        </div>
        <footer>
          <Link to="/">Return to Main Page</Link>
        </footer>
      </div>
    )
  }
} 