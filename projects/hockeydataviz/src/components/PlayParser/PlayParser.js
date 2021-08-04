export default function PlayParser(htmlReport) {
  const el = document.createElement('html');
  el.innerHTML = htmlReport;
  const bodyReport = el.getElementsByTagName('body')[0];
  return bodyReport;
}