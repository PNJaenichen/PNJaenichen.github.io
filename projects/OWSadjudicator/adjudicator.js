// Dice functions for all tools

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
/*
function promoteOne(missiles) {
  let dice = Object.keys(missiles).map(x => parseInt(x));
  let low_missile = dice[0];
  if (missiles[low_missile] === 0) {
    if (dice.length > 1) {
      delete missiles[low_missile];
      low_missile = dice[1];
    } else if (dice.length === 1) {
      missiles[low_missile] += 1;
      return missiles;
    }
  }
  switch (low_missile) {
    case 20:
      break;
    case 16:
      missiles.hasOwnProperty(20) ? missiles[20] += 1 : missiles[20] = 1;
      missiles[16] === 1 ? delete missiles[16] : missiles[16] -= 1;
      break;
    case 12:
      missiles.hasOwnProperty(16) ? missiles[16] += 1 : missiles[16] = 1;
      missiles[12] === 1 ? delete missiles[12] : missiles[12] -= 1;
      break;
    case 10:
      missiles.hasOwnProperty(12) ? missiles[12] += 1 : missiles[12] = 1;
      missiles[10] === 1 ? delete missiles[10] : missiles[10] -= 1;
      break;
    case 8:
      missiles.hasOwnProperty(10) ? missiles[10] += 1 : missiles[10] = 1;
      missiles[8] === 1 ? delete missiles[8] : missiles[8] -= 1;
      break;
    case 6:
      missiles.hasOwnProperty(8) ? missiles[8] += 1 : missiles[8] = 1;
      missiles[6] === 1 ? delete missiles[6] : missiles[6] -= 1;
      break;
    default:
      missiles.hasOwnProperty(6) ? missiles[6] += 1 : missiles[6] = 1;
      missiles[4] === 1 ? delete missiles[4] : missiles[4] -= 1;
  }
  return missiles
}
*/
function dieRoller(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Surface to Surface and Air to Surface Strikes

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
  for (let i = 0; i < (total_sm - total_inbound); i++) {
    demoteOne(missiles)
  }
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

// Torpedo Attack Tool

function findSub(subDetect, ASW=[0, 0, 0, {}]) {
  let ASW_assets = ASW[3];
  let promo_demo = ASW.slice(0,-1).reduce((acc, a) => acc + a, 0);
  if (promo_demo > 0) {
    for (let i = 0; i < promo_demo; i++) {
      ASW_assets = promoteAll(ASW_assets)
    }
  } else {
    for (let i = 0; i > promo_demo; i--) {
      ASW_assets = demoteAll(ASW_assets)
    }
  }
  const ASW_rolls = []
  for (const [key, value] of Object.entries(ASW_assets)) {
    for (let i = 0; i < value; i++) {
      ASW_rolls.push(dieRoller(key))
    }
  }
  const checked_results = ASW_rolls.filter(x => x >= subDetect);
    
  return checked_results.length > 0
}

function subAttack(targStep, targDef, subDetect, torpStr, subDef, ASW=[0, 0, 0, 8, {}]) {
  let checked_results = [];
  if (findSub(subDetect, ASW)) {
    const ASW_attacks = []
    for (const [key, value] of Object.entries(ASW[3])) {
      for (let i = 0; i < value; i++) {
        ASW_attacks.push(dieRoller(key))
      }
    }
    checked_results = ASW_attacks.filter(x => x >= subDef);
  }
  let torp_results =  [];
  for (let i = 0; i < targStep; i++) {
    torp_results.push(dieRoller(torpStr))
  }
  torp_results = torp_results.filter(x => x >= targDef)
  console.log(checked_results.length > 0 ? 'The sub was destroyed.' : 'The sub survived.')
  return `${torp_results.length > 0 ? 'The target took ' + torp_results.length + ' hits' : 'The target was not hit'}. ${findSub(8, ASW) ? 'The sub was found.' : 'The sub was undetected.'}`
}

function subAttackResults() {
  const asw = [];
  asw.push(document.getElementById("torp_run_silent").checked ? -1 : 0);
  asw.push(document.getElementById("torp_littorals").checked ? -1 : 0);
  asw.push(document.getElementById("torp_cavitation").checked ? 1 : 0);
  asw.push({});
  for (let user_input of ['ASW_asset_one', 'ASW_asset_two']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total').value) {
      asw[3][parseInt(document.getElementById(user_input).value)] = parseInt(document.getElementById(user_input + '_total').value);
    }
  }
  const target_steps = document.getElementById("torp_target_step").value ? parseInt(document.getElementById("torp_target_step").value) : 0;
  const target_def = document.getElementById("torp_target_def").value ? parseInt(document.getElementById("torp_target_def").value) : 0;
  const sub_detect = document.getElementById("torp_sub_detect").value ? parseInt(document.getElementById("torp_sub_detect").value) : 0;
  const sub_def = document.getElementById("torp_sub_def").value ? parseInt(document.getElementById("torp_sub_def").value) : 0;
  const torp_str = document.getElementById("torp_str").value ? parseInt(document.getElementById("torp_str").value) : 0;
  console.log(target_steps, target_def, sub_detect, sub_def, torp_str, asw);
  return subAttack(target_steps, target_def, sub_detect, sub_def, torp_str, asw);
}

document.getElementById('torpedoSubmit').addEventListener('click', () => {
  document.getElementById('resultArea_torpedo').innerText = subAttackResults();
}, false);

// Surface to Air Attack Tool

function samAttackResults() {
  const sam_assets = {}
  const aircraft = {}
  for (let user_input of ['SAM_asset_one', 'SAM_asset_two', 'SAM_asset_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total').value) {
      sam_assets[parseInt(document.getElementById(user_input).value)] = parseInt(document.getElementById(user_input + '_total').value);
    }
  }
  for (let user_input of ['ac_asset_one', 'ac_asset_two', 'ac_asset_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total').value) {
      aircraft[parseInt(document.getElementById(user_input).value)] = parseInt(document.getElementById(user_input + '_total').value);
    }
  }
  console.log(sam_assets, aircraft);
  const all_results = [];
  for (const [key, value] of Object.entries(sam_assets)) {
    for (let i = 0; i < value; i++) {
      all_results.push(dieRoller(key))
    }
  }
  return all_results;
}

document.getElementById('samStrikeSubmit').addEventListener('click', () => {
  document.getElementById('resultArea_samStrike').innerText = samAttackResults();
}, false);

/*
  Air to Air 

  Air vs. Air, simultaneous attacks
*/

const dash_number = ['one', 'two', 'three', 'four', 'five'];

function getAircraft(side) {
  let flight = []
  for (const number of dash_number) {
    const atk_value = document.getElementById(`${side}_aaw_${number}_atk`).value;
    const def_value = parseInt(document.getElementById(`${side}_aaw_${number}_def`).value);
    const target = parseInt(document.getElementById(`${side}_aaw_${number}_targ`).value);
    if (atk_value) {
      flight.push([atk_value, def_value, target])
    }
  }
  return flight
}

function furball() {
  const blue_victories = []
  const red_victories = []
  const blue_aircraft = getAircraft('blue');
  const red_aircraft = getAircraft('red');
  for (const attacker of blue_aircraft) {
    if (attacker[0] === 0) {
      continue
    } else {
      const attk_roll = dieRoller(attacker[0])
      if (attk_roll > red_aircraft[attacker[attacker[2] - 1]][1]) {
        blue_victories.push(`Red A/C ${attacker[2]} was destroyed (${attk_roll})`)
      } else {
        blue_victories.push('Blue missed its target')
      }
    }
  }
  for (const attacker of red_aircraft) {
    if (attacker[0] === 0) {
      continue 
    } else {
      const attk_roll = dieRoller(attacker[0])
      if (attk_roll > blue_aircraft[attacker[attacker[2] - 1]][1]) {
        red_victories.push(`Blue A/C ${attacker[2]} was destroyed (${attk_roll})`)
      } else {
        red_victories.push('Red missed its target')
      }
    }
  }
  return `${blue_victories} vs. ${red_victories}`
}

document.getElementById('airToAirSubmit').addEventListener('click', () => {
  document.getElementById('resultArea_airToAir').innerText = furball();
}, false);

// SOF Direct Action Tool

function SOFDirectAction() {
  const detection_roll = dieRoller(parseInt(document.getElementById('sofDA_detect_roll').value))
  if (detection_roll >= parseInt(document.getElementById('sofDA_ISR_value').value)) {
    return [`With a roll of ${detection_roll} the Unit was discovered`]
  } else {
    const attack_value = parseInt(document.getElementById('sofDA_att').value)
    const attack_roll = dieRoller(attack_value)
    if (attack_roll >= parseInt(document.getElementById('sofDA_def').value)) {
      if (attack_roll === attack_value) {
        return [detection_roll, attack_roll, "Two hits were scored!"]
      } 
      return [detection_roll, attack_roll, "One hit was scored."]
    }
    return [detection_roll, attack_roll, "The attack was unsuccessful"]
  }
}

document.getElementById('sofDirectActionSubmit').addEventListener('click', () => {
  document.getElementById('resultArea_sofDirectAction').innerText = SOFDirectAction();
}, false);

// Ground Combat

/* 
  NEED TO ADD BRIGADE COMBAT RULE, remove a brigade die to upgrade another (3 D6 could be
  a D6 and D8 or it could be a single D10 for example)
*/ 

function getAttackerModifiers() {
  let att_modi = 0
  const att_axis = Array.from(document.getElementsByName('att_ax')).find(radio => radio.checked);
  switch (att_axis.value) {
    case 'ax2':
      att_modi += 1
      break;
    case 'ax3':
      att_modi += 2
      break;
    default:
      break;
  }
  att_modi = document.getElementById('grndCom_att_CAS').value ? att_modi += parseInt(document.getElementById('grndCom_att_CAS').value) : att_modi;
  att_modi = document.getElementById('grndCom_att_FS').value ? att_modi += parseInt(document.getElementById('grndCom_att_FS').value) : att_modi;
  att_modi = document.getElementById('grndCom_att_defender').checked ? att_modi += 2 : att_modi;
  att_modi = document.getElementById('grndCom_att_main_effort').checked ? att_modi += 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_SIGINTEMSO').checked ? att_modi += 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_disruptC2').checked ? att_modi -= 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_suppress').checked ? att_modi -= 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_rsoi').checked ? att_modi -= 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_rivCross').checked ? att_modi -= 2 : att_modi;
  att_modi = document.getElementById('grndCom_att_airAslt').checked ? att_modi -= 2 : att_modi;
  att_modi = document.getElementById('grndCom_att_ampAslt').checked ? att_modi -= 2 : att_modi;
  return att_modi
}

function getDefenderModifiers() {
  let def_modi = 0
  def_modi = document.getElementById('grndCom_def_CAS').value ? def_modi += parseInt(document.getElementById('grndCom_def_CAS').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_FS').value ? def_modi += parseInt(document.getElementById('grndCom_def_FS').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_fortified').checked ? def_modi += 2 : def_modi;
  def_modi = document.getElementById('grndCom_def_suppress').checked ? def_modi += 1 : def_modi;
  def_modi = document.getElementById('grndCom_att_rsoi').checked ? def_modi += 1 : def_modi;
  def_modi = document.getElementById('grndCom_att_airAslt').checked ? def_modi += 2 : def_modi;
  def_modi = document.getElementById('grndCom_att_ampAslt').checked ? def_modi += 2 : def_modi;
  return def_modi
}

const grnd_abacus = {
  '5': {'open': 3, 'light': 2, 'urban': 1, 'durban': 1},
  '4': {'open': 2, 'light': 1, 'urban': 1, 'durban': 0},
  '3': {'open': 1, 'light': 1, 'urban': 0, 'durban': -1},
  '2': {'open': 1, 'light': 0, 'urban': -1, 'durban': -1},
  '1': {'open': 0, 'light': -1, 'urban': -1, 'durban': -2},
  '0': {'open': -1, 'light': -2, 'urban': -2, 'durban': -3},
  '-1/2': {'open': -1, 'light': -2, 'urban': -3, 'durban': -3},
  '-3': {'open': -2, 'light': -3, 'urban': -4, 'durban': -4},
}

function groundPromoDemo() {
  const terrain_type = document.getElementById('grndCom_terr').value;
  const att_mod = getAttackerModifiers();
  const def_mod = getDefenderModifiers();
  const advantage = att_mod - def_mod;
  let adjustments = 0;
  if (advantage >= 5) {
    adjustments = grnd_abacus['5'][terrain_type]
  } else if (advantage <= -3) {
    adjustments = grnd_abacus['-3'][terrain_type]
  } else {
    switch (advantage) {
      case 4:
        adjustments = grnd_abacus['4'][terrain_type]
        break;
      case 3:
        adjustments = grnd_abacus['3'][terrain_type]
        break;
      case 2:
        adjustments = grnd_abacus['2'][terrain_type]
        break;
      case 1:
        adjustments = grnd_abacus['1'][terrain_type]
        break;
      case -1:
      case -2:
        adjustments = grnd_abacus['-1/2'][terrain_type]
        break;
      default:
        adjustments = grnd_abacus['-0'][terrain_type]
        break;
    }
  }
  return adjustments
}

function conductGroundAttack() {
  let attk_dice = {};
  let adj = groundPromoDemo();
  const defense = document.getElementById('grndCom_def_val').value ? parseInt(document.getElementById('grndCom_def_val').value) : 0;
  const attk_val = document.getElementById('grndCom_att_dice').value;
  const attk_tot = parseInt(document.getElementById('grndCom_att_dice_tot').value);
  attk_dice[attk_val] = attk_tot;
  if (adj > 0) {
    for (let i = 0; i < adj; i++) {
      promoteAll(attk_dice); 
    }
  } else if (adj < 0) {
    for (let i = adj; i < 0; i++) {
      demoteAll(attk_dice);
    }
  }
  let attk_rolls = []
  for (const [key, value] of Object.entries(attk_dice)) {
    for (let i = 0; i < value; i++) {
      attk_rolls.push(dieRoller(key))
    }
  }
  return attk_rolls.length > 0 ? attk_rolls.filter(x => x >= defense) : 'No Hits';
}

document.getElementById('groundCombatSubmit').addEventListener('click', () => {
  document.getElementById('resultArea_groundCombat').innerText = conductGroundAttack();
}, false);