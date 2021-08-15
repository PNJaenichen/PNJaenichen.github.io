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

const dates = [new Date(), new Date(2021, 0, 4), new Date(2021, 7, 15)];

const statement = document.createElement('p');
let final = '';
if (dayDifference(dates[0], dates[2]) === 0) {
  final = 'is today.';
} else if (dayDifference(dates[0], dates[2]) === 1) {
  final = 'was yesterday!';
} else {
  final = `was ${dayDifference(dates[0], dates[2])} days ago.`;
}

statement.innerText = `Today is ${formatDate(dates[0])}. This page was created on ${formatDate(dates[1])} and that was ${dayDifference(dates[0], dates[1])} days ago. It was last updated on ${formatDate(dates[2])} which ${final}`;

document.getElementById('dayCounts').appendChild(statement);
