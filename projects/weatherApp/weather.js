/* eslint-disable linebreak-style */
const testWx = {
  coord: {
    lon: -77.7417,
    lat: 38.7153,
  },
  weather: [{
    id: 804,
    main: 'Clouds',
    description: 'overcast clouds',
    icon: '04d',
  }],
  base: 'stations',
  main: {
    temp: 287.15,
    feels_like: 285.98,
    temp_min: 286.48,
    temp_max: 288.15,
    pressure: 1015,
    humidity: 88,
  },
  visibility: 10000,
  wind: {
    speed: 2.57,
    deg: 360,
  },
  clouds: {
    all: 90,
  },
  dt: 1616619963,
  sys: {
    type: 1,
    id: 4448,
    country: 'US',
    sunrise: 1616584064,
    sunset: 1616628385,
  },
  timezone: -14400,
  id: 0,
  name: 'Warrenton',
  cod: 200,
};

const apiID = '';
const submit = document.querySelector('#userLoc');
const zipper = document.querySelector('#zipCode');

function logTemp(temp, unit = 'k', newUnit = 'f') {
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

async function getWeather(location = 20187) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${location},us&APPID=${apiID}`);
    const wxData = await response.json();
    console.log(wxData);
    console.log(logTemp(wxData.main.temp).toFixed(1));
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
