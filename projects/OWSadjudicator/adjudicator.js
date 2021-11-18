function demoteAll(missiles) {
  if (missiles['4']) {
    delete missiles['4'];
  }
  if (missiles['6']) {
    missiles['4'] = missiles['6'];
    delete missiles['6'];
  }
  if (missiles['8']) {
    missiles['6'] = missiles['8'];
    delete missiles['8'];
  }
  if (missiles['10']) {
    missiles['8'] = missiles['10'];
    delete missiles['10'];
  }
  if (missiles['12']) {
    missiles['10'] = missiles['12'];
    delete missiles['12'];
  }
  if (missiles['16']) {
    missiles['12'] = missiles['16'];
    delete missiles['16'];
  }
  if (missiles['20']) {
    missiles['16'] = missiles['20'];
    delete missiles['20'];
  }
  return missiles;
}

function promoteAll(missiles) {
  if (missiles['16']) {
    missiles['20'] += missiles['16'];
    delete missiles['16'];
  }
  if (missiles['12']) {
    missiles['16'] += missiles['12'];
    delete missiles['12'];
  }
  if (missiles['10']) {
    missiles['12'] += missiles['10'];
    delete missiles['10'];
  }
  if (missiles['8']) {
    missiles['10'] += missiles['8'];
    delete missiles['12'];
  }
  if (missiles['6']) {
    missiles['8'] += missiles['6'];
    delete missiles['6'];
  }
  if (missiles['4']) {
    missiles['6'] += missiles['4'];
    delete missiles['4'];
  }
  return missiles;
}

function demoteOne(missiles) {
  let dice = Object.keys(missiles).map(x => parseInt(x)).reverse();
  let high_missile = dice[0]
  if (missiles[high_missile] == 0) {
    if (dice.length > 1) {
      delete missiles[high_missile];
      high_missile = dice[1];
    } else if (dice.length == 1) {
      delete missiles[high_missile];
      return missiles;
    }
  }
  switch (high_missile) {
    case 4:
      missiles[4] -= 1;
      break;
    case 6:
      missiles[6] -= 1;
      missiles.hasOwnProperty(4) ? missiles[4] += 1 : missiles[4] = 1;
      break;
    case 8:
      missiles[8] -= 1;
      missiles.hasOwnProperty(8) ? missiles[6] += 1 : missiles[6] = 1;
      break;
    case 10:
      missiles[10] -= 1;
      missiles.hasOwnProperty(10) ? missiles[8] += 1 : missiles[8] = 1;
      break;
    case 12:
      missiles[12] -= 1;
      missiles.hasOwnProperty(12) ? missiles[10] += 1 : missiles[10] = 1;
      break;
    case 16:
      missiles[16] -= 1;
      missiles.hasOwnProperty(16) ? missiles[12] += 1 : missiles[12] = 1;
      break;
    default:
      missiles[20] -= 1;
      missiles.hasOwnProperty(20) ? missiles[16] += 1 : missiles[16] = 1;
  }
  return missiles;
}

function dieRoller(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function surfaceStrike(incoming, defense=[], cap=0, promotions=0, demotions=0) {
  let missiles = incoming;
  console.log(missiles)
  let total_sm = 0;
  if (defense.length > 0) {
    for (const [key, value] of Object.entries(defense)) {
      if (key == 0) {
        continue;
      } else {
        total_sm += value[1];
      }
    }
  }
  for (let i = 0; i < promotions; i++) {
    promoteAll(missiles);
  }
  for (let i = 0; i < demotions; i++) {
    demoteAll(missiles);
  }
  console.log(missiles)
  for (let i = 0; i < cap; i++) {
    demoteOne(missiles);
  }
  console.log(missiles)
  let total_inbound = Object.keys(missiles).length > 0 ? Object.values(missiles).reduce((a, b) => a + b) : 0;

  for (let i = 0; i < (total_sm - total_inbound); i++) {
    demoteOne(missiles)
  }
  console.log(missiles)
  const missile_rolls = []
  for (const [key, value] of Object.entries(missiles)) {
    for (let i = 0; i < value; i++) {
      missile_rolls.push(dieRoller(key))
    }
  }
  return missile_rolls.filter(x => x >= defense[0]);
}

const doc = document.getElementById('testArea');

const inbound_missiles = {10: 1, 12: 3};
const defense = [4, [6 , 2]]
const results = surfaceStrike(inbound_missiles, defense, 2, 0, 2);
doc.innerText = results;
/*
  Surface Strike

  Modifiers:
    ** AEW Support (Blue Only) 2x Demo to all
    ** CAP Support 1x Demo 1:1
    ** Excess shields 1x Demo 1:1
    ** SIGINT/EMSO 1x Promo to all
    ** Disrupted C2/Active & Passive CM 1x demo to all
 */

/*
  Submarine Attack

  3. all units in ASW roll for detection
     a. if successful roll for attack
  4. Sub attacks, 1 torp per step
*/

/* 
  Surface to Air

  Missiles vs Aircraft
*/

/*
  Air to Air 

  Air vs. Air, simultaneous attacks
*/

/*
  SOF Direct Action

  Roll for detection, if not detected, roll for direct action
*/

/*
  Ground Combat


*/