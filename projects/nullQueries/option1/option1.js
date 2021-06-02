import { API_KEY } from './test.js';

const channel_id = 'UCtKKhu8MzKSde-X-xVH-Vpw'

function scrollFunction() {
  if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
    document.getElementById('navbar').style.top = '0';
  } else {
    document.getElementById('navbar').style.top = '-50px'; 
  }
}

async function setRecent() {
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/activities?part=contentDetails&channelId=${channel_id}&key=${API_KEY}`);
  const videoList = await response.json();
  const recentVideo = videoList.items[0].contentDetails.upload.videoId;
  const vidFrame = document.getElementById('recentVideo')
  vidFrame.src = `https://www.youtube.com/embed/${recentVideo}?html5=1`
}

window.onscroll = function() {scrollFunction()};

API_KEY ? setRecent() : console.log('No Key');