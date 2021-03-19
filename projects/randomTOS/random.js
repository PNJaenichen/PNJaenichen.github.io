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

function validate() {
  console.log('test');
  const userEmail = document.validateForm.email;
  const userCountry = document.validateForm.country;
  const userZip = document.validateForm.zipCode;
  const passOne = document.validateForm.passwordOne;
  const passTwo = document.validateForm.passwordTwo;

  if (userEmail.value === '') {
    console.log(userEmail.valdiityState);
  }
}
