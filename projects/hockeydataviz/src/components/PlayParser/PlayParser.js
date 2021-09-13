const spaces = /\s+/g;
const digits = /\d+/g;

export default function PlayParser(htmlReport) {
  // get the html from the report page
  const el = document.createElement('html');
  el.innerHTML = htmlReport;

  // the document is seperated into 'pages', pull those pages and then put the rows into an array
  const childEl = [...el.getElementsByTagName('body')[0].children];
  const pageArray = childEl.slice(2, childEl.length - 1).map(element => [...element.children[0].children[0].children]);
  const pageBreakDown = pageArray.map(element => element.map(row => [...row.children]));

  // remove all the plays that do not have player informatin, like game start, period start, etc
  const rowBreakDown = pageBreakDown.map(row => row.filter(element => element.length === 8));
  
  // pull the playId, period number, time stamp, away team, and home team information
  const playBreakDown = rowBreakDown.map(row => row.map(element => {
    return [parseInt(element[0].innerText), element[1].innerText, element[3].innerText.match(/(\d{1,2}:\d{2})/g), element[6].innerText.replace(spaces, "").match(digits), element[7].innerText.replace(spaces, "").match(digits), element[4].innerText]
  }));
  
  // add it all to a single array and return it
  return Array.prototype.concat.apply([], playBreakDown.map(row => row.filter(element => element[3] !== null && element[4] !== null && !["PGSTR", "PGEND", "ANTHEM", "PSTR", "PEND"].includes(element[5]))))
} 