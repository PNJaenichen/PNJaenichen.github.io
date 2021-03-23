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

getScore.addEventListener('click', () => {
  const gameValue = document.querySelector('#gameList');
  fetch(`https://statsapi.web.nhl.com/api/v1/game/${gameValue.value}/feed/live`)
    .then((response) => response.json())
    .then((data) => {
      const gameP = document.querySelector('#gameInfo');
      gameP.innerHTML = `${data.gameData.teams.away.abbreviation} ${data.liveData.linescore.teams.away.goals} @ ${data.liveData.linescore.teams.home.goals} ${data.gameData.teams.home.abbreviation} on ${data.gameData.datetime.dateTime.slice(0, 10)}`;
    });
});
