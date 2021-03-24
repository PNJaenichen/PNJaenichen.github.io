/* eslint-disable linebreak-style */
const apiID = '87d966865c787694603f7cd3ddefdc23';
const submit = document.querySelector('button');

async function getWeather(location = 20187) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${location},us&APPID=${apiID}`);
    const wxData = await response.json();
    console.log(wxData);
    return wxData;
  } catch (error) {
    return 'code not found';
  }
}

console.log(submit);

// Write the functions that process the JSON data you’re getting from
// the API and return an object with only the data you require for your
// app.

// Set up a simple form that will let users input their location and
// will fetch the weather info (still just console.log() it).

// Display the information on your webpage!

// Add any styling you like!

// Optional: add a ‘loading’ component that displays from the time the
// form is submitted until the information comes back from the API.

// Push that baby to github and share your solution below!
