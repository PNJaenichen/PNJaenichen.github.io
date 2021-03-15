var slideIndex = 1;
showDivs(slideIndex);
carousel();


function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showImage(n) {
    showDivs(n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName('mySlides');
    var y = document.getElementsByClassName('slideDot');
    if (n > x.length) {
        slideIndex = 1
    } else if (n < 1) {
        slideIndex = x.length
    } else {
        slideIndex = n;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        y[i].style.backgroundColor = 'white';
    }
    x[slideIndex-1].style.display = "block";
    y[slideIndex-1].style.backgroundColor = 'darkslategray';
}

function carousel() {
    plusDivs(1);
    setTimeout(carousel, 5000);
}
