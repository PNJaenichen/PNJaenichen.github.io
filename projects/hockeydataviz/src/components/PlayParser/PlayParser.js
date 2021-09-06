export default function PlayParser(htmlReport) {
  const el = document.createElement('html');
  el.innerHTML = htmlReport;
  const bodyReport = el.getElementsByTagName('body')[0];
  const childEl = [...bodyReport.children];
  const pagesChi = childEl.slice(2, childEl.length - 1);
  const pageBreakDown = pagesChi.map(element => [...element.children[0].children[0].children]);
  console.log(pageBreakDown[0][6]);
  return bodyReport.innerHTML;
} 