import React from "react";
import emailPng from "../../assets/email.png";
import linkedInPng from "../../assets/linkedin.png";
import gitHubPng from "../../assets/github.png";
import twitterPng from "../../assets/twitter.png";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <a href="mailto:pnjaenichen@gmail.com"><img className="foot_img" src={emailPng} alt="email to author" /></a>
        <a href="https://github.com/PNJaenichen"><img className="foot_img" src={gitHubPng} alt="author's github" /></a>
        <a href="https://www.linkin.com/in/pauljaenichen"><img className="foot_img" src={linkedInPng} alt="author's linkedin" /></a>
        <a href="https://www.twitter.com/MeadyOkerGamer"><img className="foot_img" src={twitterPng} alt="author's twitter" /></a>
      </footer>
    )
  }
}