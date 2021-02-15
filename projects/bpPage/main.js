function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const currentDate = new Date();
const bpBirthday = new Date("2021-03-13");

var difference = dateDiffInDays(currentDate, bpBirthday);
var counter = document.getElementById('countdown');
if (counter) {
    counter.textContent = `${difference} Days To 47!`;
}

var logo = document.getElementById('logo');
var logoRatio = Math.floor(window.innerWidth * .3);
window.addEventListener('resize', function() {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function() {
        logoRatio = Math.floor(window.innerWidth * .3);
        console.log(`Resized finished: ${logoRatio}`);
        logo.style.height = `${logoRatio}px`
        logo.style.width = `${logoRatio}px`
    }, 250);
});
;
