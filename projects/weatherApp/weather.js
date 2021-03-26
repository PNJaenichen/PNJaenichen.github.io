/* eslint-disable linebreak-style */
const apiID = '87d966865c787694603f7cd3ddefdc23';
const submit = document.querySelector('#userLoc');
const zipper = document.querySelector('#zipCode');

function logTemp(input, unit = 'k', newUnit = 'f') {
  const { temp } = input.main;
  switch (unit) {
    case 'k':
      if (newUnit === 'f') {
        return (temp * (9 / 5)) - 459.67;
      }
      if (newUnit === 'c') {
        return temp - 273.15;
      }
      return temp;
    case 'f':
      if (newUnit === 'k') {
        return (temp + 459.67) * (5 / 9);
      }
      if (newUnit === 'c') {
        return (temp - 32) * (5 / 9);
      }
      return temp;
    default:
      if (newUnit === 'k') {
        return temp + 273.15;
      }
      if (newUnit === 'f') {
        return (temp * (9 / 5)) + 32;
      }
      return temp;
  }
}

function getWx(input) {
  const wxImg = input.weather[0].icon;
  const ping = `http://openweathermap.org/img/wn/${wxImg}@2x.png`;
  return [input.weather[0].description, ping];
}

function getWind(input) {
  const { wind } = input;
  if (wind.hasOwnProperty('gust')) {
    return `${wind.deg} @ ${Math.ceil(wind.speed)}G${Math.ceil(wind.gust)}`;
  }
  return `${wind.deg} @ ${Math.ceil(wind.speed)}`;
}

function getTimePull(input) {
  const { dt } = input;
  return new Date(dt * 1000);
}

async function getWeather(location = 20187) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${location},us&APPID=${apiID}`);
    const wxData = await response.json();
    console.log(wxData);
    console.log(logTemp(wxData).toFixed(1));
    console.log(getWx(wxData));
    console.log(getWind(wxData));
    console.log(getTimePull(wxData));
    return wxData;
  } catch (error) {
    return 'code not found';
  }
}

function validZipCode() {
  if (zipper.value.length !== 5) {
    zipper.setCustomValidity('Zip Code must be 5 digits.');
  } else {
    zipper.setCustomValidity('');
  }
}

zipper.addEventListener('input', validZipCode);
submit.addEventListener('click', () => {
  if (zipper.validity.valid && zipper.value !== '') {
    getWeather(zipper.value);
  }
});
// Write the functions that process the JSON data you’re getting from
// the API and return an object with only the data you require for your
// app.

// Display the information on your webpage!

// Add any styling you like!

// Optional: add a ‘loading’ component that displays from the time the
// form is submitted until the information comes back from the API.

// Push that baby to github and share your solution below!
