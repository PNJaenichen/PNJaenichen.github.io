function tabOne() {
    var mainElement = document.getElementById('content');
    mainElement.innerHTML = "";
    var headOne = document.createElement('h3');
    var headTwo = document.createElement('h3');
    headOne.textContent = 'Tab 2 - Menu';
    headTwo.textContent = 'Tab 3 - Contact';
    mainElement.appendChild(headOne);
    mainElement.appendChild(headTwo);
}

module.exports = tabOne;