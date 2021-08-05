// import { API_KEY } from './key.js';

// const channel_id = 'UCtKKhu8MzKSde-X-xVH-Vpw'

// async function setRecent() {
//   const response = await fetch(`https://youtube.googleapis.com/youtube/v3/activities?part=contentDetails&channelId=${channel_id}&key=${API_KEY}`);
//   const videoList = await response.json();
//   const recentVideo = videoList.items[0].contentDetails.upload.videoId;
//   const vidFrame = document.getElementById('recentVideo')
//   vidFrame.src = `https://www.youtube.com/embed/${recentVideo}?html5=1`
// }

// API_KEY ? setRecent() : '';

function init() {
  const vidDefer = document.getElementsByTagName('iframe');
  console.log(vidDefer);
  for (let i = 0; i < vidDefer.length; i++) {
    if (vidDefer[i].getAttribute('data-src')) {
      vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
    }
  }
}

window.onload = init();