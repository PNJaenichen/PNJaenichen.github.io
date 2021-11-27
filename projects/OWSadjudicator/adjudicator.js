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
    missiles['20'] = missiles['16'];
    delete missiles['16'];
  }
  if (missiles['12']) {
    missiles['16'] = missiles['12'];
    delete missiles['12'];
  }
  if (missiles['10']) {
    missiles['12'] = missiles['10'];
    delete missiles['10'];
  }
  if (missiles['8']) {
    missiles['10'] = missiles['8'];
    delete missiles['12'];
  }
  if (missiles['6']) {
    missiles['8'] = missiles['6'];
    delete missiles['6'];
  }
  if (missiles['4']) {
    missiles['6'] = missiles['4'];
    delete missiles['4'];
  }
  return missiles;
}

function demoteOne(missiles) {
  let dice = Object.keys(missiles).map(x => parseInt(x)).reverse();
  let high_missile = dice[0]
  if (missiles[high_missile] === 0) {
    if (dice.length > 1) {
      delete missiles[high_missile];
      high_missile = dice[1];
    } else if (dice.length === 1) {
      delete missiles[high_missile];
      return missiles;
    }
  }
  switch (high_missile) {
    case 4:
      missiles[4] === 1 ? delete missiles[4] : missiles[4] -= 1;
      break;
    case 6:
      missiles.hasOwnProperty(4) ? missiles[4] += 1 : missiles[4] = 1;
      missiles[6] === 1 ? delete missiles[6] : missiles[6] -= 1;
      break;
    case 8:
      missiles.hasOwnProperty(6) ? missiles[6] += 1 : missiles[6] = 1;
      missiles[8] === 1 ? delete missiles[8] : missiles[8] -= 1;
      break;
    case 10:
      missiles.hasOwnProperty(8) ? missiles[8] += 1 : missiles[8] = 1;
      missiles[10] === 1 ? delete missiles[10] : missiles[10] -= 1;
      break;
    case 12:
      missiles.hasOwnProperty(10) ? missiles[10] += 1 : missiles[10] = 1;
      missiles[12] === 1 ? delete missiles[12] : missiles[12] -= 1;
      break;
    case 16:
      missiles.hasOwnProperty(12) ? missiles[12] += 1 : missiles[12] = 1;
      missiles[16] === 1 ? delete missiles[16] : missiles[16] -= 1;
      break;
    default:
      missiles.hasOwnProperty(16) ? missiles[16] += 1 : missiles[16] = 1;
      missiles[20] === 1 ? delete missiles[20] : missiles[20] -= 1;
  }
  return missiles
}

function dieRoller(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function surfaceStrike(incoming, defense=[], cap=0, promotions=0, demotions=0) {
  let missiles = incoming;
  let total_sm = 0;
  if (defense.length > 0) {
    for (const [key, value] of Object.entries(defense)) {
      if (key === '0') {
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
  for (let i = 0; i < cap; i++) {
    demoteOne(missiles);
  }
  let total_inbound = Object.keys(missiles).length > 0 ? Object.values(missiles).reduce((a, b) => a + b) : 0;
  console.log(missiles, total_sm, total_inbound)
  for (let i = 0; i < (total_sm - total_inbound); i++) {
    demoteOne(missiles)
  }
  console.log(missiles)
  const missile_rolls = []
  if (defense.length === 1) {
    for (const [key, value] of Object.entries(missiles)) {
      for (let i = 0; i < value; i++) {
        missile_rolls.push(dieRoller(key))
      }
    }
    return missile_rolls.filter(x => x >= defense[0])
  } else {
      let def_sm = defense.slice(1);
      let def_rolls = []
      for (let [key, value] of [...def_sm]) {
        for (let i = 0; i < value; i++) {
          def_rolls.push(key)
        }
      }
      const miss_diff = total_inbound - def_rolls.length
      if (def_rolls.length < total_inbound) {
        for (let i = 0; i < miss_diff; i++) {
          def_rolls.push(defense[0])
        }
      }
      def_rolls.reverse()
      let def_sm_track = 0;
      for (const [key, value] of Object.entries(missiles)) {
        for (let i = 0; i < value; i++) {
          let in_result = (dieRoller(key))
          if (in_result >= def_rolls[def_sm_track]) {
            missile_rolls.push(in_result)
          }
          def_sm_track += 1;
        }
      }
  }
  return missile_rolls;
}

function subAttack(targStep, ASW=[]) {
  return `The target has ${targStep} ${targStep === 1 ? 'step' : 'steps'}`
}

function subAttackResults() {
  return subAttack(1);
}

function getStrikeResults() {
  const promos = document.getElementById('promo_input').value ? parseInt(document.getElementById('promo_input').value) : 0;
  let demos = document.getElementById('demo_input').value ? parseInt(document.getElementById('demo_input').value) : 0;
  const cap = document.getElementById('cap_input').value ? parseInt(document.getElementById('cap_input').value) : 0;
  const base_def = document.getElementById('target_def').value ? parseInt(document.getElementById('target_def').value) : 0;
  const inbound = {};
  const defense = [base_def];
  for (let user_input of ['inbound_one', 'inbound_two', 'inbound_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total').value) {
      inbound[parseInt(document.getElementById(user_input).value)] = parseInt(document.getElementById(user_input + '_total').value);
    }
  }
  for (let user_input of ['def_one', 'def_two', 'def_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total')) {
      const missile_set = [parseInt(document.getElementById(user_input).value), parseInt(document.getElementById(user_input + '_total').value)];
      defense.push(missile_set);
    }
  }
  if (defense.length > 1) {
    demos += document.getElementById("aew_input").checked ? 2 : 0;
  }
  return surfaceStrike(inbound, defense, cap, promos, demos)
}

document.getElementById('strikeSubmit').addEventListener('click', () => {
  document.getElementById('resultArea_strike').innerText = getStrikeResults();
  }, false);

document.getElementById('torpedoSubmit').addEventListener('click', () => {
  document.getElementById('resultArea_torpedo').innerText = subAttackResults();
}, false);

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
