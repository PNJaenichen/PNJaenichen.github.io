/* eslint-disable linebreak-style */
function formatDate(input) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const buildYear = input.getFullYear();
  const buildMonth = months[input.getMonth()];
  const buildDate = input.getDate();
  return `${buildDate} ${buildMonth} ${buildYear}`;
}
function dayDifference(input1, input2) {
  const diffTime = input1.getTime() - input2.getTime();
  return Math.floor(diffTime / (1000 * 3600 * 24));
}
const dates = [new Date(), new Date(2020, 4, 14), new Date(2020, 4, 31)];
document.getElementById('today').innerHTML = formatDate(dates[0]);
document.getElementById('created').innerHTML = formatDate(dates[1]);
document.getElementById('dayDiff1').innerHTML = dayDifference(dates[0], dates[1]);
document.getElementById('updated').innerHTML = formatDate(dates[2]);
document.getElementById('dayDiff2').innerHTML = dayDifference(dates[0], dates[2]);
