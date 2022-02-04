// Tabbing, code from https://www.w3schools.com/howto/howto_js_tabs.asp

function openTool(evt, toolName) {
  // Declare all variables
  let i, tabcontent, tablinks;
  
  // Get all elements with class 'tabcontent' and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class 'tabcontent' and remove the class 'active'
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the bottom that opened the tab
  document.getElementById(toolName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

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
    delete missiles['8'];
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
  if (dice.length === 0) {
    return missiles
  }
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

function removeLow(missiles) {
  let dice = Object.keys(missiles).map(x => parseInt(x));
  let low_missile = dice[0];
  if (missiles[low_missile] === 0) {
    if (dice.length > 1) {
      delete missiles[low_missile];
      low_missile = dice[1];
    } else if (dice.length === 1) {
      if (missiles[low_missile] === 1) {
        delete missiles[low_missile];
        low_missile = dice[1]
      } else {
        missiles[low_missile] -= 1;
      }
    }
  }
  if (missiles[low_missile] >= 1) {
    missiles[low_missile] -= 1;
  }
  return missiles
}

function allForOne(missiles, ASW = true) {
  let dice = Object.keys(missiles).map(x => parseInt(x)).reverse();
  let high_missile = dice[0];
  switch (high_missile) {
    case 4:
      return {'6': 1};
    case 6:
      return {'8': 1};
    case 8:
      return {'10': 1};
    case 10:
      return {'12': 1};
    case 12:
      return {'16': 1};
    case 16:
      if (ASW) {
        return missiles
      } else {
        return {'20': 1}
      }
    default:
      return missiles;
  }
}

function dieRoller(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function createResults(diceTotal, diceResults) {
  let dice = Object.keys(diceTotal).map(x => x);
  const allDice = document.createElement('div');
  let resultTrack = 0;
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < diceTotal[dice[i]]; j++) {
      const newDiv = document.createElement("div");
      const resultP = document.createElement("p");
      resultP.innerText = diceResults[resultTrack];
      resultTrack += 1;
      newDiv.classList.add('die');
      newDiv.classList.add(`dice${dice[i]}`);
      newDiv.appendChild(resultP);
      allDice.appendChild(newDiv);
    }
  }
  return allDice
}

// General Dice Roller

document.getElementById('generalSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  if (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
    document.getElementById('resultArea2').innerText = '';
  }
  const dice_to_roll = {};
  const die_value = document.getElementById('general_value').value ? document.getElementById('general_value').value : '4';
  const die_total = document.getElementById('gen_total').value ? parseInt(document.getElementById('gen_total').value) : 1;
  const die_results = [];
  if (die_value) {
    for (let i = 0; i < die_total; i++) {
      die_results.push(dieRoller(die_value))
    }
  }
  dice_to_roll[die_value] = die_total;
  resultArea.appendChild(createResults(dice_to_roll, die_results));
  document.getElementById('resultArea2').innerText = `${die_total === 1 ? `One ${die_value}-sided die was` : `${die_total} ${die_value}-sided dice were`} rolled, with the following results: ${die_results}`;
}, false)

// Theater and Local ISR Tool

function getISRUserInput() {
  let ISR_assets = {};
  ISR_assets[document.getElementById('isr_value').value] = parseInt(document.getElementById('isr_value_num').value);
  const detect_value = parseInt(document.getElementById('isr_detect').value) ? parseInt(document.getElementById('isr_detect').value) : 0;
  if (document.getElementById('isr_SIGINT_EMSO').checked) {
    ISR_assets = promoteAll(ISR_assets);
  }
  if (document.getElementById('isr_countermeasures').checked) {
    ISR_assets = demoteAll(ISR_assets);
  }
  if (document.getElementById('isr_combined').checked) {
    ISR_assets = allForOne(ISR_assets, false);
  }
  return [ISR_assets, detect_value]
}

function getISRresults() {
  const [ISR_assets, detect_value] = getISRUserInput();
  let ISR_rolls = [];
  for (let [key, value] of Object.entries(ISR_assets)) {
    for (let i = 0; i < value; i++) {
      ISR_rolls.push(dieRoller(key))
    }
  }
  const filtered_rolls = ISR_rolls.filter(x => x >= detect_value);
  return [ISR_assets, ISR_rolls, filtered_rolls.length > 0]
}

document.getElementById('isrSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  if (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
    document.getElementById('resultArea2').innerText = '';
  }
  const [ISR_assets, ISR_rolls, targFound] = getISRresults();
  const resultString = `The following ISR assets ${JSON.stringify(ISR_assets)} ${targFound ? 'found the target' : 'found nothing'} (${ISR_rolls}).`;
  document.getElementById('resultArea').appendChild(createResults(ISR_assets, ISR_rolls))
  document.getElementById('resultArea2').innerText = resultString;
}, false)

// ASW Tool

function getASWUserInput() {
  const ASW_value = document.getElementById('asw_value').value;
  const ASW_value_num = parseInt(document.getElementById('asw_value_num').value)
  const subDetect = parseInt(document.getElementById('asw_detect').value);
  const asw = [];
  asw.push(document.getElementById("asw_runningSilent").checked ? -1 : 0);
  asw.push(document.getElementById("asw_littoral").checked ? -1 : 0);
  asw.push(document.getElementById("asw_cavitation").checked ? 1 : 0);
  asw.push(document.getElementById('asw_multiAssets').checked)
  const ASW_assets = {}
  ASW_assets[ASW_value] = ASW_value_num
  asw.push(ASW_assets)
  return [subDetect, asw]
}

function singlePing() {
  let [subDetect, ASW] = getASWUserInput();
  let [ASW_assets, ASW_rolls, subFound] = findSub(subDetect, ASW);
  return [ASW_assets, ASW_rolls, subFound]
}

document.getElementById('aswSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  if (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
    document.getElementById('resultArea2').innerText = '';
  }
  let [ASW_assets, ASW_rolls, subFound] = singlePing();
  document.getElementById('resultArea').appendChild(createResults(ASW_assets, ASW_rolls))
  const ASW_result = `The following assets ${JSON.stringify(ASW_assets)} ${subFound ? 'found a submarine' : 'found nothing'} (${ASW_rolls}).`
  document.getElementById('resultArea2').innerText = ASW_result;
}, false)

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
  const missile_rolls = [];
  if (defense.length === 1) {
    for (const [key, value] of Object.entries(missiles)) {
      for (let i = 0; i < value; i++) {
        missile_rolls.push(dieRoller(key))
      }
    }
    return [missiles, missile_rolls, missile_rolls.filter(x => x >= defense[0])]
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
    const all_rolls = []
    let def_sm_track = 0;
    for (const [key, value] of Object.entries(missiles)) {
      for (let i = 0; i < value; i++) {
        let in_result = (dieRoller(key));
        all_rolls.push(in_result);
        if (in_result >= def_rolls[def_sm_track]) {
          missile_rolls.push(in_result)
        }
        def_sm_track += 1;
      }
    }
    return [missiles, all_rolls, missile_rolls]
  }
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
  return surfaceStrike(inbound, defense, cap, promos, demos);
}

document.getElementById('strikeSubmit').addEventListener('click', () => {
  const results = getStrikeResults();
  const resultArea = document.getElementById('resultArea');
  if (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
    document.getElementById('resultArea2').innerText = '';
  }
  resultArea.appendChild(createResults(results[0], results[1], results[2]));
  document.getElementById('resultArea2').innerText = `The following dice ${JSON.stringify(results[0])} rolled the following: ${results[1]}. This resulted in ${results[2].length === 1 ? 'one hit' : results[2].length + ' hits'} (${results[2]}).`;
  }, false);

// Torpedo Attack Tool

function findSub(subDetect, ASW=[0, 0, 0, false, {}]) {
  let ASW_assets = ASW[4];
  let promo_demo = ASW.slice(0,-2).reduce((acc, a) => acc + a, 0);
  if (promo_demo > 0) {
    for (let i = 0; i < promo_demo; i++) {
      ASW_assets = promoteAll(ASW_assets)
    }
  } else {
    for (let i = 0; i > promo_demo; i--) {
      ASW_assets = demoteAll(ASW_assets)
    }
  }
  if (ASW[3]) {
    ASW_assets = allForOne(ASW_assets)
  }
  const ASW_rolls = []
  for (const [key, value] of Object.entries(ASW_assets)) {
    for (let i = 0; i < value; i++) {
      ASW_rolls.push(dieRoller(key))
    }
  }
  const checked_results = ASW_rolls.filter(x => x >= subDetect);
  return [ ASW_assets, ASW_rolls, checked_results.length > 0 ]
}

function subAttack(targStep, targDef, subDetect, torpStr, subDef, ASW=[0, 0, 0, 8, {}]) {
  let checked_results = [];
  let [ASW_assets, ASW_rolls, subFound] = findSub(subDetect, ASW);
  const ASW_attacks = []
  if (subFound) {
    for (const [key, value] of Object.entries(ASW[3])) {
      for (let i = 0; i < value; i++) {
        ASW_attacks.push(dieRoller(key))
      }
    }
    checked_results = ASW_attacks.filter(x => x >= subDef);
  }
  let torp_rolls =  [];
  for (let i = 0; i < targStep; i++) {
    torp_rolls.push(dieRoller(torpStr))
  }
  const torp_hits = torp_rolls.filter(x => x >= targDef)
  return [ASW_assets, ASW_rolls, subFound, ASW_attacks, checked_results, torp_rolls, torp_hits]
}

function subAttackResults() {
  const asw = [];
  asw.push(document.getElementById("torp_run_silent").checked ? -1 : 0);
  asw.push(document.getElementById("torp_littorals").checked ? -1 : 0);
  asw.push(document.getElementById("torp_cavitation").checked ? 1 : 0);
  asw.push(document.getElementById('torp_multi_assets').checked)
  asw.push({});
  for (let user_input of ['ASW_asset_one', 'ASW_asset_two']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total').value) {
      asw[4][parseInt(document.getElementById(user_input).value)] = parseInt(document.getElementById(user_input + '_total').value);
    }
  }
  const target_steps = document.getElementById("torp_target_step").value ? parseInt(document.getElementById("torp_target_step").value) : 0;
  const target_def = document.getElementById("torp_target_def").value ? parseInt(document.getElementById("torp_target_def").value) : 0;
  const sub_detect = document.getElementById("torp_sub_detect").value ? parseInt(document.getElementById("torp_sub_detect").value) : 0;
  const sub_def = document.getElementById("torp_sub_def").value ? parseInt(document.getElementById("torp_sub_def").value) : 0;
  const torp_str = document.getElementById("torp_str").value ? parseInt(document.getElementById("torp_str").value) : 0;
  return subAttack(target_steps, target_def, sub_detect, torp_str, sub_def, asw);
}

document.getElementById('torpedoSubmit').addEventListener('click', () => {
  let [ASW_assets, ASW_rolls, subFound, ASW_attacks, checked_results, torp_rolls, torp_hits] = subAttackResults();
  const ASW_result = `The following assets ${JSON.stringify(ASW_assets)} went looking. ${subFound ? `The sub was found (${ASW_rolls}) and ${checked_results.length > 0 ? 'was destroyed' : 'survived'} (${ASW_attacks})` : `The sub was undetected (${ASW_rolls}).`}`
  const torp_result = `${torp_hits.length === 0 ? 'The target survived.' : torp_hits.length === 1 ? 'The target took one hit' : `The target took ${torp_hits.length} hits`} (${torp_rolls}).`
  document.getElementById('resultArea').innerText = `${torp_result} ${ASW_result}`;
}, false);

// Surface to Air Attack Tool

function getSAMUserInputs() {
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
  return [sam_assets, aircraft]
}

function samKills(rolls, defenses) {
  const ac_dest = [];
  for (let roll of rolls) {
    if (defenses.length === 0) {
      return ac_dest
    } else if (roll >= defenses[0]) {
      ac_dest.push(defenses.shift())
    } else {
      continue
    }
  }
  return ac_dest
}

function samAttackResults() {
  let [sam_assets, aircraft] = getSAMUserInputs();
  const all_rolls = [];
  const all_defs = [];
  for (const [key, value] of Object.entries(sam_assets)) {
    for (let i = 0; i < value; i++) {
      all_rolls.push(dieRoller(key));
    }
  }
  for (const [key, value] of Object.entries(aircraft)) {
    for (let i = 0; i < value; i++) {
      all_defs.push(parseInt(key));
    }
  }
  const sam_results = samKills(all_rolls, all_defs)
  return [JSON.stringify(sam_assets), JSON.stringify(aircraft), all_rolls, sam_results];
}

document.getElementById('samStrikeSubmit').addEventListener('click', () => {
  let [sam_assets, aircraft, all_rolls, sam_results] = samAttackResults();
  document.getElementById('resultArea').innerText = `The following weapons ${sam_assets} were fired at the following aircraft ${aircraft}. Rolls of ${all_rolls} resulted in the destruction of these aircraft: ${sam_results}`;
}, false);

// Air to Air Combat Tool

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
      if (attk_roll >= red_aircraft[attacker[2] - 1][1]) {
        blue_victories.push(`Red A/C ${attacker[2]} was destroyed (${attk_roll}).`)
      } else {
        blue_victories.push(`Blue A/C ${attacker[2]} missed its target (${attk_roll}).`)
      }
    }
  }
  for (const attacker of red_aircraft) {
    if (attacker[0] === 0) {
      continue 
    } else {
      const attk_roll = dieRoller(attacker[0])
      if (attk_roll >= blue_aircraft[attacker[2] - 1][1]) {
        red_victories.push(`Blue A/C ${attacker[2]} was destroyed (${attk_roll}).`)
      } else {
        red_victories.push(`Red A/C ${attacker[2]} missed its target (${attk_roll}).`)
      }
    }
  }
  return `${blue_victories} vs. ${red_victories}`
}

document.getElementById('airToAirSubmit').addEventListener('click', () => {
  document.getElementById('resultArea').innerText = furball();
}, false);

// SOF Direct Action Tool

function SOFDirectAction() {
  const detection_roll = dieRoller(parseInt(document.getElementById('sofDA_detect_roll').value))
  if (detection_roll >= parseInt(document.getElementById('sofDA_ISR_value').value)) {
    return [detection_roll, `The unit was discovered.`]
  } else {
    const attack_value = parseInt(document.getElementById('sofDA_att').value)
    const attack_roll = dieRoller(attack_value)
    if (attack_roll >= parseInt(document.getElementById('sofDA_def').value)) {
      if (attack_roll === attack_value) {
        return [detection_roll, attack_roll, "Two hits were scored!"]
      } 
      return [detection_roll, attack_roll, "One hit was scored."]
    }
    return [detection_roll, attack_roll, "The attack was unsuccessful."]
  }
}

document.getElementById('sofDirectActionSubmit').addEventListener('click', () => {
  let results = SOFDirectAction();
  let disp_message = '';
  if (results.length !== 3) {
    let [detection_roll, message] = results;
    disp_message = `The detection roll was ${detection_roll}. ${message}`;
  } else {
    let [detection_roll, attack_roll, message] = results;
    disp_message = `The detection roll was ${detection_roll}. The attack roll was ${attack_roll}. ${message}`;
  }
  document.getElementById('resultArea').innerText = disp_message;
}, false);

// Ground Combat

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
        adjustments = grnd_abacus['0'][terrain_type]
        break;
    }
  }
  return adjustments
}

function conductGroundAttack() {
  let attk_dice = {};
  let adj = groundPromoDemo();
  const brg_tact = document.getElementById('grndCom_brg_tact').value ? parseInt(document.getElementById('grndCom_brg_tact').value) : 0;
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
  if (brg_tact > 0) {
    for (let i = 0; i < brg_tact; i++) {
      removeLow(attk_dice)
      promoteOne(attk_dice)
    }
  }
  let attk_rolls = []
  for (const [key, value] of Object.entries(attk_dice)) {
    for (let i = 0; i < value; i++) {
      attk_rolls.push(dieRoller(key))
    }
  }
  return [JSON.stringify(attk_dice), attk_rolls, attk_rolls.filter(x => x >= defense)]
}

document.getElementById('groundCombatSubmit').addEventListener('click', () => {
  let [attk_dice, attk_rolls, hits] = conductGroundAttack();
  document.getElementById('resultArea').innerText = `The following dice ${attk_dice} were rolled (${attk_rolls}), resulting in ${hits.length = 1 ? 'one hit' : `${hits.length} hits (${hits}).` }`;
}, false);