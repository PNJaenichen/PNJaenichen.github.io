export default function PlayParser(htmlReport) {
  const el = document.createElement('html');
  el.innerHTML = htmlReport;
  const bodyReport = el.getElementsByTagName('body')[0];
  const childEl = [...bodyReport.children];
  console.log(childEl)
  console.log(childEl.slice(2, childEl.length - 1))
  return bodyReport.innerHTML;
} 