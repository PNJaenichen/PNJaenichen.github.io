export default function PlayParser(htmlReport) {
  const el = document.createElement('html');
  el.innerHTML = htmlReport;
  const bodyReport = el.getElementsByTagName('body')[0];
  const childEl = [...bodyReport.children];
  const pagesChi = childEl.slice(2, childEl.length - 1);
  const pageBreakDown = pagesChi.map(element => [...element.children[0].children[0].children]);
  const testFilter = [...pageBreakDown[7][11].children].slice(6,);
  const testReplace = testFilter.map(element => element.innerText.replace(/\s+/g, "").split(/[A-Z]/g));
  console.log(testReplace.map(element => element.filter(element => element !== ""))) 
  return bodyReport.innerHTML;
} 