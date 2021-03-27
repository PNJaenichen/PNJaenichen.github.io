/* eslint-disable linebreak-style */
const apiID = '';
const submit = document.querySelector('#userLoc');
const zipper = document.querySelector('#zipCode');

function logTemp(temp, unit = 'k', newUnit = 'f') {
  switch (unit) {
    case 'k':
      if (newUnit === 'f') {
        return ((temp * (9 / 5)) - 459.67).toFixed(1);
      }
      if (newUnit === 'c') {
        return (temp - 273.15).toFixed(1);
      }
      return (temp).toFixed(1);
    case 'f':
      if (newUnit === 'k') {
        return ((temp + 459.67) * (5 / 9)).toFixed(1);
      }
      if (newUnit === 'c') {
        return ((temp - 32) * (5 / 9)).toFixed(1);
      }
      return (temp).toFixed(1);
    default:
      if (newUnit === 'k') {
        return (temp + 273.15).toFixed(1);
      }
      if (newUnit === 'f') {
        return ((temp * (9 / 5)) + 32).toFixed(1);
      }
      return (temp).toFixed(1);
  }
}

function getWx(input) {
  const wxImg = input.weather[0].icon;
  const ping = `http://openweathermap.org/img/wn/${wxImg}@2x.png`;
  return [input.weather[0].description, ping];
}

function getWind(input) {
  const { wind } = input;
  if (Object.prototype.hasOwnProperty.call(wind, 'gust')) {
    return [wind.deg, Math.ceil(wind.speed), Math.ceil(wind.gust)];
  }
  return [wind.deg, Math.ceil(wind.speed)];
}

function convertTime(unixTime) {
  const actualTime = new Date(unixTime * 1000);
  return [actualTime.toString().slice(4, 15), actualTime.toString().slice(16, 21),
    actualTime.toString().slice(34)];
}

function convertVis(input, units = 'imperial') {
  const { visibility } = input;
  if (units === 'imperial') {
    return `${((visibility / 1000) * 0.621371).toFixed(1)} mi`;
  }
  return `${(visibility / 1000).toFixed(1)} km`;
}

async function getWeather(location = 20187) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${location},us&APPID=${apiID}`);
    const wxData = await response.json();
    document.getElementById('location').innerHTML = wxData.name;
    document.getElementById('loTemp').innerHTML = logTemp(wxData.main.temp_min);
    document.getElementById('hiTemp').innerHTML = logTemp(wxData.main.temp_max);
    document.getElementById('currTemp').innerHTML = logTemp(wxData.main.temp);
    // eslint-disable-next-line prefer-destructuring
    document.getElementById('wxIcon').src = getWx(wxData)[1];
    // eslint-disable-next-line prefer-destructuring
    document.getElementById('wxName').innerHTML = getWx(wxData)[0];
    document.getElementById('compass').innerHTML = getWind(wxData);
    document.getElementById('timePull').innerHTML = `Observation Time: ${convertTime(wxData.dt)[1]}`;
    document.getElementById('rise').innerHTML = `Sunrise: ${convertTime(wxData.sys.sunrise)[1]}`;
    document.getElementById('set').innerHTML = `Sunset ${convertTime(wxData.sys.sunset)[1]}`;
    document.getElementById('cloudCover').innerHTML = `Cloud Cover: ${wxData.clouds.all}%`;
    document.getElementById('visibility').innerHTML = `Visibility: ${convertVis(wxData)}`;
    document.getElementById('humidity').innerHTML = `humidity: ${wxData.main.humidity}%`;
    document.getElementById('weather').style.visibility = 'visible';
    return 'success';
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

// Add any styling you like!

// Optional: add a ‘loading’ component that displays from the time the
// form is submitted until the information comes back from the API.

// Push that baby to github and share your solution below!
