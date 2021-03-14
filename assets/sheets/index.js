function formatDate(input) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var buildYear = input.getFullYear();
    var buildMonth = months[input.getMonth()];
    var buildDate = input.getDate();
    return buildDate + " " + buildMonth + " " + buildYear
}
function dayDifference(input1, input2) {
    var diffTime = input1.getTime() - input2.getTime();
    return Math.floor(diffTime / (1000 * 3600 * 24));
}
var dates = [new Date(), new Date(2021,0,4), new Date(2021,2,13)];

var statement = document.createElement('p');

statement.innerText = `Today is ${formatDate(dates[0])}. This page was created on ${formatDate(dates[1])} and that was ${dayDifference(dates[0],dates[1])} days ago. It was last updated on ${formatDate(dates[2])} which ${dayDifference(dates[0],dates[2]) === 0 ? 'is today.' : dayDifference(dates[0],dates[2]) === 1 ? 'was yesterday!' : 'was ' + dayDifference(dates[0],dates[2]) + ' days ago.'}`;

document.getElementById('dayCounts').appendChild(statement);