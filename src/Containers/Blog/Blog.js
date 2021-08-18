import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import pixelKiwi from "../../assets/pixel-jaenichen.webp";
import { posts } from "./posts";

export default class Blog extends React.Component {
  cardCreater() {
    let uniqID = 0;
    return posts.map(post => {
      uniqID += 1;
      let paraID = 0;
      const subDate = post.subtitle ? `${post.subtitle}; ${post.date}` : post.date;
      return (
        <div key={`blogPost${uniqID}`} className="card">
          <h3>{post.title}</h3>
          <h4>{subDate}</h4>
          <div className="fakeimg"><img src={post.image} alt="Empty" height="100%" /></div>
          {post.text.map(paragraph => {
            paraID += 1;
            return <p key={`para${uniqID}${paraID}`}>{paragraph}</p>
            }
          )}
        </div> 
      )
    })
  }
  render() {
    return (
      <div>
        <div className="header">
          <h2>Kiwi's Coding Journey</h2>
        </div>
        <main>
          <div className="leftcolumn">
            {this.cardCreater()}
          </div>
          <div className="rightcolumn">
            <div className="card">
              <h3>About Me</h3>
              <div className="fakeimg" style={{height: "100px"}}><img src={pixelKiwi} style={{height: "100px"}} alt="pixelated author" /></div>
            </div>
          </div>
        </main>
        <Footer />
        <footer>
          <Link to="/">Return to Main Page</Link>
        </footer>
      </div>
    );
  }
}