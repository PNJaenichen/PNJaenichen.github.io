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
var dates = [new Date(), new Date(2021,0,4), new Date(2021,0,10)];
document.getElementById('today').innerHTML = formatDate(dates[0]);
document.getElementById('created').innerHTML = formatDate(dates[1]);
document.getElementById('dayDiff1').innerHTML = dayDifference(dates[0],dates[1]);
document.getElementById('updated').innerHTML = formatDate(dates[2]);
document.getElementById('dayDiff2').innerHTML = dayDifference(dates[0],dates[2]);