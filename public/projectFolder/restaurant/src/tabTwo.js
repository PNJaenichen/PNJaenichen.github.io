function tabTwo() {
    var mainElement = document.getElementById('content');
    mainElement.innerHTML = "";
    var imgOne = document.createElement('img');
    imgOne.src = "https://thumbor.thedailymeal.com/HHLQVluCYBhbUEzBXBXfYrwDDpM=//https://www.thedailymeal.com/sites/default/files/2019/09/11/HERO_Iconic_Breakfasts_shutterstock.jpg";
    imgOne.height = '300';
    var paraOne = document.createElement('p');
    paraOne.textContent = "Cinnamon Rolls"
    var imgTwo = document.createElement('img');
    imgTwo.src = "https://www.spoonforkbacon.com/wp-content/uploads/2020/07/easy-baked-eggs-recipe-card.jpg";
    imgTwo.height = "300";
    var paraTwo = document.createElement('p');
    paraTwo.textContent = "Breakfast Hash"
    var imgThree = document.createElement('img');
    imgThree.src = "https://media.self.com/photos/5f189b76c58e27c99fbef9e3/4:3/w_400%2Cc_limit/blackberry-vanilla-french-toast.jpg";
    imgThree.height = "300";
    var paraThree = document.createElement('p');
    paraThree.textContent = "French Toast";
    mainElement.appendChild(imgOne);
    mainElement.appendChild(paraOne);
    mainElement.appendChild(imgTwo);
    mainElement.appendChild(paraTwo);
    mainElement.appendChild(imgThree);
    mainElement.appendChild(paraThree);
}

module.exports = tabTwo;