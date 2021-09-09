export default function PlayParser(htmlReport) {
  const el = document.createElement('html');
  el.innerHTML = htmlReport;
  const bodyReport = el.getElementsByTagName('body')[0];
  const childEl = [...bodyReport.children];
  const pagesChi = childEl.slice(2, childEl.length - 1);
  const pageArray = pagesChi.map(element => [...element.children[0].children[0].children]);
  const pageBreakDown = pageArray.map(element => element.map(row => [...row.children]));
  const rowBreakDown = pageBreakDown.map(row => row.filter(element => element.length === 8));
  const playBreakDown = rowBreakDown.map(row => row.map(element => [element[0].innerText, element[1].innerText, element[3].innerText.match(/(\d{1,2}:\d{2})/g), element[6].innerText.replace(/\s+/g, "").match(/\d+/g), element[7].innerText.replace(/\s+/g, "").match(/\d+/g)]));
  const filteredPlays = playBreakDown.map(row => row.filter(element => element[3] !== null));
  const playList = Array.prototype.concat.apply([], filteredPlays)
  return playList;
} 