const HOROSCOPES = [
  'Your intuition may not be completely fool-proof today',
  'You may feel uncertain about who you can trust this morning',
  'A desire for luxury, romance, or self-care could detract from your actual responsibilties today',
  'Seeing the path toward your dreams could feel like a tall order today',
  'Try not to let jealous or judgmental eyes push you under the radar today',
  'Confusion could hit you within your romantic or domestic sphere today',
  'Your mind could feel like a foggy place this morning',
  'Your ego could give some bad advice when it comes to treating yourself this morning',
  'The vibe in your home may feel a bit off or surreal this morning',
  'You may feel as though you\'re surrounded by liars and deceivers this morning',
  'You won\'t feel like investing your energy into relationships that don\'t feel secure and supportive today',
  'Emotional blocks could prevent you from sharing your desires this morning'
];

const result_section = document.getElementById('result_section');
const gen_button = document.getElementById('gen_button');



gen_button.addEventListener('click', () => {
  let random_message_index = Math.floor(Math.random() * 12);
  result_section.innerText = HOROSCOPES[random_message_index];
})
