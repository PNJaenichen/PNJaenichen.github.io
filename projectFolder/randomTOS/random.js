/* eslint-disable linebreak-style */
let slideIndex = 1;

function showDivs(n) {
  const x = document.getElementsByClassName('mySlides');
  const y = document.getElementsByClassName('slideDot');
  if (n > x.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = x.length;
  } else {
    slideIndex = n;
  }
  for (let i = 0; i < x.length; i += 1) {
    x[i].style.display = 'none';
    y[i].style.backgroundColor = 'white';
  }
  x[slideIndex - 1].style.display = 'block';
  y[slideIndex - 1].style.backgroundColor = 'darkslategray';
}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

// eslint-disable-next-line no-unused-vars
function showImage(n) {
  showDivs(n);
}

function carousel() {
  plusDivs(1);
  setTimeout(carousel, 5000);
}

showDivs(slideIndex);
carousel();

function checkPass() {
  const passOne = document.getElementById('passwordOne');
  const passTwo = document.getElementById('passwordTwo');
  if (passOne.value !== passTwo.value) {
    passTwo.setCustomValidity('Password must be matching.');
  } else {
    passTwo.setCustomValidity('');
  }
}

const password = document.querySelector('#passwordOne');
password.addEventListener('input', checkPass);

const getScore = document.querySelector('#gameScore');

getScore.addEventListener('click', async () => {
  const gameValue = document.querySelector('#gameList');
  const gameP = document.querySelector('#gameInfo');
  try {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/game/${gameValue.value}/feed/live`);
    const gameJSON = await response.json();
    gameP.innerHTML = `${gameJSON.gameData.teams.away.abbreviation} ${gameJSON.liveData.linescore.teams.away.goals} @ ${gameJSON.liveData.linescore.teams.home.goals} ${gameJSON.gameData.teams.home.abbreviation} on ${gameJSON.gameData.datetime.dateTime.slice(0, 10)}`;
  } catch (error) {
    gameP.innerHTML = 'Error pulling game information';
  }
});
