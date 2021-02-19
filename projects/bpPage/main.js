function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const currentDate = new Date();
const bpBirthday = new Date("2021-03-13");

var difference = dateDiffInDays(currentDate, bpBirthday);
var days = document.getElementById('days');
var message = document.getElementById('message');
if (days && message) {
    if (difference <= 0) {
        days.innerText = '';
        message.innerHTML = "It's bP's Birthday!";
    } else if (difference === 1) {
        days.innerText = '';
        message.innerHTML = "bP's Birthday is Tomorrow!";
    } else {
        days.innerText = difference;
        message.innerHTML = '&nbspDays To 47!';
    }
}


