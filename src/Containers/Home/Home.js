import React from "react";
import { Link } from "react-router-dom";
import DayCounter from "../../Components/DayCounter/DayCounter"
import authorPix from "../../assets/pixel-jaenichen.webp";
import Footer from "../../Components/Footer/Footer"

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="hero-image">
            <div className="hero-text">
              <h1>Nate "Kiwi" Jaenichen</h1>
              <p>Web Developer / Gamer</p>
            </div>
          </div>
          <nav>
            <Link to="/Blog">Blog</Link>
            <Link to="/Projects">Projects</Link>
            <Link to="/ResumeCV">Resume/CV</Link>
          </nav>
        </header>
        <main>
          <img className="logo" src={authorPix} alt="Pixel Art of Author"></img>
          <p>
            My programming journey started in 2017 when I began my 
            graduate studies in Data Analytics. I learned a small 
            amount of R and SQL before shifting into Python. Python
            is where I spent the rest of my studies. I continued making
            various small projects with Python before adding HTML, 
            CSS, and Javascript and thus began my Front End Web 
            Development journey.
          </p>
          <p>
            As I continue this development journey, I will update this
            page in order to improve it with the various things I learn.
          </p>
          <p>
            As of 1/5/21, this page is being hosted via Github Pages. 
            Per the README file my goals for starting this project are 
            as followed:
          </p>
          <ol>
              <li>Use github on a daily basis</li>
              <li>Have a place where I journal about my journey into development</li>
              <li>Do a little coding, be it python or web, a little everyday</li>
              <li>Have a project to give additional purpose to my learning</li>
          </ol>
          <DayCounter />
        </main>
        <Footer />
      </div>     
    );
  }
}