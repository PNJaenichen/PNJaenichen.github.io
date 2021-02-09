function tabThree() {
    var mainElement = document.getElementById('content');
    mainElement.innerHTML = "";
    var headOne = document.createElement('h3');
    var paraOne = document.createElement('p');
    var headTwo = document.createElement('h3');
    var paraTwo = document.createElement('p');
    headOne.textContent = 'Phone';
    headTwo.textContent = 'Address';
    paraOne.innerText = '1-555-123-4567';
    paraTwo.innerText = '123 Main St\nAnytown, USA  45678'
    mainElement.appendChild(headOne);
    mainElement.appendChild(paraOne);
    mainElement.appendChild(headTwo);
    mainElement.appendChild(paraTwo);    
}

module.exports = tabThree;