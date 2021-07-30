export default function PlayParser(htmlReport) {
  const el = document.createElement('html');
  el.innerHTML = htmlReport;
  const bodyReport = document.getElementsByTagName('body')[0];
  return bodyReport.children[2];
}