import tribute from "../../assets/tribute.webp";
import survey from "../../assets/survey.webp";
import product from "../../assets/product.webp";
import technical from "../../assets/technical.webp";
import google from "../../assets/google.webp";
import RPS from "../../assets/RPS.webp";
import etchasketch from "../../assets/etchasketch.webp";
import calculator from "../../assets/calculator_page.webp";
import library from "../../assets/library.webp";
import tictactoe from "../../assets/tictactoe.webp";
import restaurant from "../../assets/restaurant.webp";
import todos from "../../assets/todos.webp";
import weather from "../../assets/weather.webp";
import benefit from "../../assets/benefit.webp";

export const projectsFCC = [
  {
    title: "Tribute",
    url: "/tribute.html",
    thumbnail: tribute,
    shortDesc: "The project was to build a tribute page with nine user stories.",
    longDesc: "This was the first website I had built from scratch since I tried to learn the language back in my Geocities days. The page itself is bare. It meets the requirements of the project but not much beyond that. My biggest challenge was getting the image to resize as the window was resized."
  },
  {
    title: "Survey",
    url: "/survey.html",
    thumbnail: survey,
    shortDesc: "The project was to build a survey form with 16 user stories.",
    longDesc: "This project took a bit more CSS googling, especially to line up all the labels with the respective elements. The page itself is bland, as it was designed to meet the requirements of the project."
  },
  {
    title: "Product Landing",
    url: "/product.html",
    thumbnail: product,
    shortDesc: "The project was to build a product landing page that had 15 user stories.",
    longDesc: "The part I found most difficult about this particular project was create the 'cards' for each of the elements at the bottom of the page. This was also my first look at the iframe element putting the YouTube video in."
  },
  {
    title: "Technical",
    url: "/technical.html",
    thumbnail: technical,
    shortDesc: "The project was to build a page with technical documentation that had 15 user stories.",
    longDesc: "This project saw the use of some new HTML elements. I found the most difficult portion to be the creation of the navigation bar. It is responsive in that on larger screens it sits on the left side of the window while on smaller screens it shifts to the top. Like the other projects from FreeCodeCamp this project meets the requirements of the project and is bare after that."
  }
]

export const projectsOdin = [
  {
    title: "Google",
    url: "#",
    thumbnail: google,
    shortDesc: "The project was to build replica of the Google homepage.",
    longDesc: "This was a nice exercise of HTML and CSS, especially as I was getting back into learning front end development. The real benefit I found in this project (beyond more practice with the code) was the integration of the assignment with GitHub."
  },
  {
    title: "Rock, Paper, Scissors Game",
    url: "#",
    thumbnail: RPS,
    shortDesc: "The project was to build a website that enabled the user to play Rock, Paper, Scissors against a random opponent.",
    longDesc: "This project shifted the focus from HTML and CSS to javascript. There were two portions to this exercise, one which used the console and then updating it to show everything on the page. This was my first attempt at adjusting a pages DOM utilizing javascript."
  },
  {
    title: "Etch-A-Sketch",
    url: "#",
    thumbnail: etchasketch,
    shortDesc: "The project was to build a website that mimicked the Etch-a-Sketch toy.",
    longDesc: "This project provided more opportunity to adjust a pages DOM. I found the reseting and rebuilding the canvas the most difficult and took some work. The actual changing of the 'pixels' was new but it was easy enough to figure out with a small amount of reading/googling."
  },
  {
    title: "Calculator",
    url: "#",
    thumbnail: calculator,
    shortDesc: "The project was to build a simple calculator that does basic mathmatical operations.",
    longDesc: "This one had a few interesting elements. One was taking user input and performing the operations required. It took some figuring out to get it to work like a basic calculator. One of the other challenges was to make sure that only a single decimal was input, which programtically I knew how to do it, but it took a little with javascript specific elements in order to get it done."
  },
  {
    title: "Library",
    url: "#",
    thumbnail: library,
    shortDesc: "The project was to build an application where a user could add and remove books from a 'library' and mark whether they had been read or not.",
    longDesc: "This is a very plain looking website and could certainly use a visual uplift. DOM manipulation and Event listeners were big in this one. THe hardest part was to figure out how to create listeners for elements on the page that had not been created yet via the script. The other item I focused on, was ensuring that the user input went to the elements 'textContent' vice 'innerHTML' to add additional security. Unfortunately the library is not persistent, that would be the next step."
  },
  {
    title: "Tic Tac Toe",
    url: "#",
    thumbnail: tictactoe,
    shortDesc: "Lorem",
    longDesc: "Ipsum"
  },
  {
    title: "Restaurant",
    url: "#",
    thumbnail: restaurant,
    shortDesc: "The goal of this project was to create a site that would utilize tabs in order to display information about a restaurant. The real goal was to utilize webpack and different javascript modules.",
    longDesc: "The tabs themselves were easy to complete. The Odin Project provided a page with tons of examples and I just chose the one I like the most and then used the developers tools to learn how it was made. After that creating the modules that build the DOM for each tab was relatively easy. It took a bit of online searching to figure out webpack with multiple entries but I figured that out as well. I think if I would refactor this, it would be to find an better way at creating the DOM. Especially for the second tab, which repeated itself tons of times to create each of the elements. I like the took of the tabs and I think eventually I wanted to adjust this portion of the page to look more like that instead of the current layout."
  },
  {
    title: "Todo List",
    url: "#",
    thumbnail: todos,
    shortDesc: "The intent was to provide the user with the ability to create dynamic todo list items. These items needed due dates, be editable, and stay within a designated category. It also used Local Storage.",
    longDesc: "The hardest part of this project was making sure that only one object would expand while it was being hovered over and items would still expand when editing another. I took this a step forward and added the Pomodoro Tomato clock. It is built with HTML/CSS and the timer itself is Javascript."
  },
  {
    title: "Weather App",
    url: "#",
    thumbnail: weather,
    shortDesc: "Their were two learning objectives behind this project. The first was accessing an API. I had done this previously using the NHL API, however that was with Python. I did it again during the course of the syllabus but using Javascript as well. The second objective was the use of async/await to ensure that the API request is complete prior to building the site.",
    longDesc: "My struggle here was figuring out where to put the code to work with the return from the API. I could not find a way to work with it out as a return, but got results when I worked with it from within the async/await function. I am still not sure if this is the way it works OR that I simply did not find the right answer to make that happy. THat would be what I would work on for refactoring, as of right now that function both makes the request to the API and adjust the DOM, while I at least have other functions performing the actual work with the API return. NOTE: The API key is not in the code and the website will not work. The screenshot to the left displays its current look."
  }
]

export const persProjects = [
  {
    title: "bP's Benefit",
    url: "#",
    thumbnail: benefit,
    shortDesc: "This was my first 'real' project. My wife wanted to raise money for charity and did a virtual 5k along with it. I sat down with her and created a wire diagram of what she envisioned for the website. I had a friend help create a graphic that I could build from.",
    longDesc: "I really enjoyed this. Trying to recreate something that was designed for a specific purpose. The site overall was relatively simple with a countdown to her brithday. The one thing I would refactor is the countdown. There was a rounding error depending on what half of the day you visited the page. In the morning the countdown would be correct however in the afternoon it rounded the difference downand would be a day early as a result. Most important though was my wife loved it and she raised just over $900!"
  }
]

// {
//   title: "",
//   url: "#",
//   thumbnail: "#",
//   shortDesc: "",
//   longDesc: ""
// }