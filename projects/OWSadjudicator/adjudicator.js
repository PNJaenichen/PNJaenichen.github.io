// Tabbing, code from https://www.w3schools.com/howto/howto_js_tabs.asp

// eslint-disable-next-line no-unused-vars
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

function promoteAll(missiles, ASW=false) {
  if (missiles['16']) {
    if (!ASW) {
      missiles['20'] = missiles['16'];
    delete missiles['16'];
    }
    
  }
  if (missiles['12']) {
    if (missiles.hasOwnProperty('16')) {
      missiles['16'] += missiles['12'];
    } else {
      missiles['16'] = missiles['12'];
    }    
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

function allForOne(missiles, ASW = true) {
  let dice = Object.keys(missiles).map(x => parseInt(x)).reverse();
  let high_missile = dice[0];
  if ((dice.length === 1) && (missiles[high_missile.toString()] === 1)) {
    return missiles;
  }
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

function createResults(diceTotal, diceResults, dice_title='') {
  let dice = Object.keys(diceTotal).map(x => x);
  const allDice = document.createElement('div');
  allDice.classList.add('dice_area');
  const title_para = document.createElement('p');
  title_para.innerHTML = dice_title;
  allDice.appendChild(title_para);
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

function createDie(dieSides, dieResult) {
  const newDiv = document.createElement("div");
  const resultP = document.createElement("p");
  resultP.innerText = dieResult;
  newDiv.classList.add('die');
  newDiv.classList.add(`dice${dieSides}`);
  newDiv.appendChild(resultP);
  return newDiv;
}

function createDefResult(dieSides, dieResult, defValue, hitRes, typeDef='base') {
  const finalResult = document.createElement('div');
  finalResult.classList.add('def-result');
  finalResult.appendChild(createDie(dieSides, dieResult));
  
  const hit_result = document.createElement('div');
  hit_result.classList.add('hit_result');

  const salvoValue = document.createElement('div');
  salvoValue.classList.add('gg-shield');
  if (typeDef === 'base') {
    salvoValue.classList.add('defbase');
  } else {
    salvoValue.classList.add('defsalvo');
  }
  const salvoPara = document.createElement('p');
  salvoPara.innerText = defValue;
  salvoValue.appendChild(salvoPara);

  const hitResult = document.createElement('div');
  hitResult.classList.add('hit_or_miss');
  const checkX = document.createElement('p');
  if (hitRes) {
    hitResult.classList.add('hit');
    checkX.innerText = `${String.fromCodePoint(10004)}`;
  } else {
    hitResult.classList.add('miss');
    checkX.innerText = `${String.fromCodePoint(10006)}`;
  }
  hitResult.appendChild(checkX);
  hit_result.appendChild(salvoValue);
  hit_result.appendChild(hitResult);
  finalResult.appendChild(hit_result);
  return finalResult;
}

function checkForHits(roll_result, base_def) {
  const hits = Math.floor(roll_result / base_def)
  const capped_hits = hits > 4 ? 4 : hits
  return roll_result < base_def ? 0 : capped_hits
}


// General Dice Roller

document.getElementById('generalSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  const dice_to_roll = {};
  for (let user_input of ['one', 'two', 'three']) {
    let die_value = document.getElementById(`general_value_${user_input}`).value ? document.getElementById(`general_value_${user_input}`).value : '4';
    let die_amount = document.getElementById(`gen_total_${user_input}`).value ? parseInt(document.getElementById(`gen_total_${user_input}`).value) : 0;
    if (die_amount) {
      if (dice_to_roll.hasOwnProperty(die_value)) {
        dice_to_roll[die_value] += die_amount
      } else {
        dice_to_roll[die_value] = die_amount;
      }
    }
  }
  const die_results = [];
  for (let [key,value] of Object.entries(dice_to_roll)) {
    for (let i = 0; i < value; i++) {
      let roll_result = dieRoller(key);
      die_results.push(roll_result)
    }
  }
  resultArea.appendChild(createResults(dice_to_roll, die_results));
  let final_textResult = '';
  let last_index = 0;
  if (!die_results) {
    for (let [key, value] of Object.entries(dice_to_roll)) {
      final_textResult += `${value === 1 ? `One ${key}-sided die was` : `${value} ${key}-sided dice were`} rolled, with the following results: ${die_results.slice(last_index,last_index+value)}. `;
      last_index += value;
    }
    document.getElementById('resultWords').innerText = `General Roll: ${final_textResult}`;
    document.getElementById('result_log').innerHTML += `General Roll: ${final_textResult}<br>`;
  }
  
}, false)

// Theater and Local ISR Tool

function getISRUserInput() {
  let ISR_assets = {};
  ISR_assets[document.getElementById('isr_value').value] = parseInt(document.getElementById('isr_value_num').value);
  const detect_value = parseInt(document.getElementById('isr_detect').value) ? parseInt(document.getElementById('isr_detect').value) : 0;
  const promo_demo_diff = (document.getElementById('isr_SIGINT_EMSO').checked ? 1 : 0) - (document.getElementById('isr_countermeasures').checked ? 1 : 0);
  if (promo_demo_diff > 0) {
    for (let i = 0; i < promo_demo_diff; i++) {
      promoteAll(ISR_assets);
    }
  } else if (promo_demo_diff < 0) {
    for (let i = 0; i > promo_demo_diff; i--) {
      demoteAll(ISR_assets);
    }
  }
  if (document.getElementById('isr_combined').checked) {
    ISR_assets = allForOne(ISR_assets, false);
  }
  if (document.getElementById('isr_silent').checked) {
    promoteAll(ISR_assets)
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
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  const [ISR_assets, ISR_rolls, targFound] = getISRresults();
  const resultString = `ISR: The following ISR assets ${JSON.stringify(ISR_assets)} ${targFound ? 'found the target' : 'found nothing'} (${ISR_rolls}).<br>`;
  document.getElementById('resultArea').appendChild(createResults(ISR_assets, ISR_rolls))
  document.getElementById('resultWords').innerText = `ISR: The following ISR assets ${JSON.stringify(ISR_assets)} ${targFound ? 'found the target' : 'found nothing'} (${ISR_rolls}).`;
  document.getElementById('result_log').innerHTML += resultString;
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
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  let [ASW_assets, ASW_rolls, subFound] = singlePing();
  document.getElementById('resultArea').appendChild(createResults(ASW_assets, ASW_rolls))
  const ASW_result = `ASW: The following assets ${JSON.stringify(ASW_assets)} ${subFound ? 'found a submarine' : 'found nothing'} (${ASW_rolls}).<br>`;
  document.getElementById('resultWords').innerText = `ASW: The following assets ${JSON.stringify(ASW_assets)} ${subFound ? 'found a submarine' : 'found nothing'} (${ASW_rolls}).`;
  document.getElementById('result_log').innerHTML += ASW_result;
}, false)

// Surface to Surface and Air to Surface Strikes

function getStrikeInputs() {
  const hyper_inbound = {};
  const bm_inbound = {}; 
  const cruise_inbound = {};
  for (let user_input of ['inbound_one', 'inbound_two', 'inbound_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total').value) {
      const weaponValue = parseInt(document.getElementById(user_input).value);
      const weaponTotal = parseInt(document.getElementById(user_input + '_total').value);
      const weaponType = document.querySelector(`input[name="${user_input}_type"]:checked`).value
      if (weaponType === 'hyper') {
        if (weaponTotal === 0) {
          continue;
        } else if (weaponValue in hyper_inbound) {
          hyper_inbound[weaponValue] += weaponTotal
        } else {;
          hyper_inbound[weaponValue] = weaponTotal;
        }
      } else if (weaponType === 'ballistic') {
        if (weaponTotal === 0) {
          continue;
        } else if (weaponValue in bm_inbound) {
          bm_inbound[weaponValue] += weaponTotal
        } else {;
          bm_inbound[weaponValue] = weaponTotal;
        }
      } else {
        if (weaponTotal === 0) {
          continue;
        } else if (weaponValue in cruise_inbound) {
          cruise_inbound[weaponValue] += weaponTotal
        } else {;
          cruise_inbound[weaponValue] = weaponTotal;
        }
      }
    }
  }
  const bm_defense = {};
  const cruise_defense = {};
  for (let user_input of ['def_one', 'def_two', 'def_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total')) {
      const defenseValue = parseInt(document.getElementById(user_input).value);
      const defenseTotal = parseInt(document.getElementById(user_input + '_total').value);
      if (document.getElementById(user_input + '_bmd').checked && Object.keys(bm_inbound).length !== 0) {
        if (defenseValue === 0 || defenseTotal === 0) {
          continue;
        } else if (defenseValue in bm_defense) {
          bm_defense[defenseValue] += defenseTotal;
        } else {
          bm_defense[defenseValue] = defenseTotal;
        }
      } else {
        if (defenseValue === 0 || defenseTotal === 0) {
          continue;
        } else if (defenseValue in cruise_defense) {
          cruise_defense[defenseValue] += defenseTotal;
        } else {
          cruise_defense[defenseValue] = defenseTotal;
        }
      }
    }
  }
  const base_def = document.getElementById('target_def').value ? parseInt(document.getElementById('target_def').value) : 0;
  const cap = document.getElementById('cap_input').value ? parseInt(document.getElementById('cap_input').value) : 0;
  const promos = document.getElementById('promo_input').value ? parseInt(document.getElementById('promo_input').value) : 0;
  const demos = document.getElementById('demo_input').value ? parseInt(document.getElementById('demo_input').value) : 0;
  const us_cec = document.getElementById("aew_input").checked;

  return {hyper_inbound, bm_inbound, cruise_inbound, bm_defense, cruise_defense, base_def, cap, promos, demos, us_cec};
}

function strikeBaseAttack(inbound, base_def) {
  const dieRolls = {};
  for (const x of Object.keys(inbound)) {
    for (let i = 0; i < inbound[x]; i++) {
      if (x.toString() in dieRolls) {
        dieRolls[x].push(dieRoller(x));
      } else {
        dieRolls[x] = [dieRoller(x)];
      }  
    }
  }
  let results = [];
  for (const x of Object.keys(inbound).reverse()) {
    for (let i = 0; i < inbound[x]; i++) {
      const result = dieRolls[x][i] >= base_def ? 'HIT' : 'MISS';
      results.push([x, dieRolls[x][i], base_def, result, checkForHits(dieRolls[x][i], base_def)]);
    }
  }
  let hit_count = 0;
  for (const result of results) {
    hit_count += result[4]
  }
  return {results, hit_count}
}

function strikeDefSalvoAttack(inbound, defense) {
  const defSalvos = [];
  const inboundStr = Object.keys(inbound).reverse().map(x => parseInt(x));
  const dieRolls = {};
  for (const x of Object.keys(defense).reverse()) {
    for (let i = 0; i < defense[x]; i++) {
      defSalvos.push(x);
    }
  }
  for (const x of inboundStr) {
    for (let i = 0; i < inbound[x]; i++) {
      if (x.toString() in dieRolls) {
        dieRolls[x].push(dieRoller(x));
      } else {
        dieRolls[x] = [dieRoller(x)];
      }  
    }
  }
  let defIndex = 0;
  let results = [];
  for (const x of inboundStr) {
    for (let i = 0; i < inbound[x]; i++) {
      const result = dieRolls[x][i] >= defSalvos[defIndex] ? 'HIT' : 'MISS'
      results.push([x, dieRolls[x][i], defSalvos[defIndex], result]);
      defIndex += 1;
    }
  }
  return results;
}

document.getElementById('strikeSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
    document.getElementById('resultWords').innerText = '';
  }
  document.getElementById('result_log').innerHTML += 'Surface Strike: ';
  const { hyper_inbound, bm_inbound, cruise_inbound, bm_defense, cruise_defense, base_def, cap, promos, demos, us_cec } = getStrikeInputs();
  let modifier_adjust = promos - demos;
  if (modifier_adjust < 0) {
    for (let i = 0; i > modifier_adjust; i--) {
      demoteAll(hyper_inbound);
      demoteAll(bm_inbound);
      demoteAll(cruise_inbound);
    } 
  } else {
    for (let i = 0; i < modifier_adjust; i++) {
      promoteAll(hyper_inbound);
      promoteAll(bm_inbound);
      promoteAll(cruise_inbound);
    } 
  }
  const total_hyper = Object.values(hyper_inbound).reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  const total_bm = Object.values(bm_inbound).reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  const total_cruise = Object.values(cruise_inbound).reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  const total_defense = Object.values(cruise_defense).reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  const total_bmDefense = Object.values(bm_defense).reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  if (us_cec && (total_bmDefense > 0 || total_defense > 0)) {
    for (let i = 0; i < 2; i++) {
      demoteAll(bm_inbound)
      demoteAll(cruise_inbound)
    }
  }
  let finalResult;
  let salvoResult;
  let total_stepsLost = 0;
  if (total_hyper > 0) {
    finalResult = strikeBaseAttack(hyper_inbound, base_def);
    const baseHeader = document.createElement('p');
    baseHeader.innerText = 'Hypersonic Results:';
    document.getElementById('resultArea').appendChild(baseHeader);
    let successfulFinal = 0;
    for (const result of finalResult.results) {
      document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
      result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
    }
    total_stepsLost += finalResult.hit_count
    const finalText = `Hypersonic Results: ${finalResult.results.length} inbound salvo${finalResult.results.length !== 1 ? 's' : ''} scored a total of ${successfulFinal} hit${successfulFinal !== 1 ? 's' : ''} (${finalResult.results.map(x => x[1])}), resulting in ${finalResult.hit_count} step${finalResult.hit_count !== 1 ? 's' : ''} lost. `;
    document.getElementById('resultWords').innerText += `${finalText}\n`;
    document.getElementById('result_log').innerHTML += finalText;
  }
  if (total_bm > 0) {
    if (total_bmDefense === 0) {
      finalResult = strikeBaseAttack(bm_inbound, base_def);
      const baseHeader = document.createElement('p');
      baseHeader.innerText = 'Ballistic Missile Results:';
      document.getElementById('resultArea').appendChild(baseHeader);
      let successfulFinal = 0;
      for (const result of finalResult.results) {
        document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
        result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
      }
      total_stepsLost += finalResult.hit_count
      const finalText = `Ballistic Results: ${finalResult.results.length} inbound salvo${finalResult.results.length !== 1 ? 's' : ''} scored a total of ${successfulFinal} hit${successfulFinal !== 1 ? 's' : ''} (${finalResult.results.map(x => x[1])}), resulting in ${finalResult.hit_count} step${finalResult.hit_count !== 1 ? 's' : ''} lost. `;
      document.getElementById('resultWords').innerText += `${finalText}\n`;
      document.getElementById('result_log').innerHTML += finalText;
    } else if (total_bmDefense >= total_bm) {
      for (let i = 0; i < (total_bmDefense - total_bm); i++) {
        demoteOne(bm_inbound);
      }
      salvoResult = strikeDefSalvoAttack(bm_inbound, bm_defense);
      if (salvoResult) {
        const salvoHeader = document.createElement('p');
        salvoHeader.innerText = 'BMD Salvo Results:';
        document.getElementById('resultArea').appendChild(salvoHeader);
        let successfulSalvo = 0;
        for (const result of salvoResult) {
          document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', 0, 'salvo'));
          result[3] === 'HIT' ? successfulSalvo += 1 : successfulSalvo += 0;
        }
        if (salvoResult) {
          const salvoText = `Ballistic Results: ${successfulSalvo} inbound salvo${successfulSalvo !== 1 ? 's' : ''} (${salvoResult.map(x => x[1])}) got through the defensive salvos (${salvoResult.map(x => x[2])}). `;
          document.getElementById('resultWords').innerText += salvoText;
          document.getElementById('result_log').innerHTML += salvoText; 
        }
      }
      const closeInbound = {};
      for (const salvo of salvoResult) {
        if (salvo[3] === 'HIT') {
          if (salvo[0] in closeInbound) {
            closeInbound[salvo[0]] += 1;
          } else {
            closeInbound[salvo[0]] = 1;
          }
        }
      }
      finalResult = strikeBaseAttack(closeInbound, base_def);
      const baseHeader = document.createElement('p');
      baseHeader.innerText = 'Ballistic Missile Results:';
      document.getElementById('resultArea').appendChild(baseHeader);
      let successfulFinal = 0;
      for (const result of finalResult.results) {
        document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
        result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
      }
      total_stepsLost += finalResult.hit_count
      const finalText = ` ${finalResult.results.length} inbound salvo${finalResult.results.length !== 1 ? 's' : ''} scored a total of ${successfulFinal} hit${successfulFinal !== 1 ? 's' : ''} (${finalResult.results.map(x => x[1])}), resulting in ${finalResult.hit_count} step${finalResult.hit_count !== 1 ? 's' : ''} lost. `;
      document.getElementById('resultWords').innerText += `${finalText}\n`;
      document.getElementById('result_log').innerHTML += finalText;
    } else {
      const allSalvos = [];
      for (const x of Object.keys(bm_inbound)) {
        for (let i = 0; i < bm_inbound[x]; i++) {
          allSalvos.push(x);
        }
      }
      const defendedSalvos = allSalvos.reverse().slice(0, total_bmDefense);
      const undefendedSalvos = allSalvos.slice(total_bmDefense);
      const defendedSalvoObj = {};
      const undefendedSalvoObj = {};
      defendedSalvos.forEach(x => {
        if (x in defendedSalvoObj) {
          defendedSalvoObj[x] += 1;
        } else {
          defendedSalvoObj[x] = 1;
        }
      });
      undefendedSalvos.forEach(x => {
        if (x in undefendedSalvoObj) {
          undefendedSalvoObj[x] += 1;
        } else {
          undefendedSalvoObj[x] = 1;
        }
      });
      salvoResult = strikeDefSalvoAttack(defendedSalvoObj, total_bmDefense);
      if (salvoResult) {
        const salvoHeader = document.createElement('p');
        salvoHeader.innerText = 'BMD Salvo Results:';
        document.getElementById('resultArea').appendChild(salvoHeader);
        let successfulSalvo = 0;
        for (const result of salvoResult) {
          document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', 0, 'salvo'));
          result[3] === 'HIT' ? successfulSalvo += 1 : successfulSalvo += 0;
        }
        if (salvoResult) {
          const salvoText = `Ballistic Results: ${successfulSalvo} inbound salvo${successfulSalvo !== 1 ? 's' : ''} (${salvoResult.map(x => x[1])}) got through the defensive salvos (${salvoResult.map(x => x[2])}). `;
          document.getElementById('resultWords').innerText += salvoText;
          document.getElementById('result_log').innerHTML += salvoText; 
        }
      }
      for (const salvo of salvoResult) {
        if (salvo[3] === 'HIT') {
          if (salvo[0] in undefendedSalvoObj) {
            undefendedSalvoObj[salvo[0]] += 1;
          } else {
            undefendedSalvoObj[salvo[0]] = 1;
          }
        }
      }
      finalResult = strikeBaseAttack(undefendedSalvoObj, base_def);
      const baseHeader = document.createElement('p');
      baseHeader.innerText = 'Ballistic Missile Results:';
      document.getElementById('resultArea').appendChild(baseHeader);
      let successfulFinal = 0;
      for (const result of finalResult.results) {
        document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
        result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
      }
      total_stepsLost += finalResult.hit_count
      const finalText = ` ${finalResult.results.length} inbound salvo${finalResult.results.length !== 1 ? 's' : ''} scored a total of ${successfulFinal} hit${successfulFinal !== 1 ? 's' : ''} (${finalResult.results.map(x => x[1])}), resulting in ${finalResult.hit_count} step${finalResult.hit_count !== 1 ? 's' : ''} lost. `;
      document.getElementById('resultWords').innerText += `${finalText}\n`;
      document.getElementById('result_log').innerHTML += finalText;
    }
  }
  if (total_cruise > 0) {
    console.log(cruise_inbound, cruise_defense);
    if (cap > 0) {
      for (let i = 0; i < cap; i++) {
        demoteOne(cruise_inbound);
      }
    }
    if (total_defense === 0) {
      finalResult = strikeBaseAttack(cruise_inbound, base_def);
      const baseHeader = document.createElement('p');
      baseHeader.innerText = 'Cruise Missile Results:';
      document.getElementById('resultArea').appendChild(baseHeader);
      let successfulFinal = 0;
      for (const result of finalResult.results) {
        document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
        result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
      }
      total_stepsLost += finalResult.hit_count
    } else if (total_defense >= total_cruise) {
      for (let i = 0; i < (total_defense - total_cruise); i++) {
        demoteOne(cruise_inbound);
      }
      salvoResult = strikeDefSalvoAttack(cruise_inbound, cruise_defense);
      if (salvoResult) {
        const salvoHeader = document.createElement('p');
        salvoHeader.innerText = 'Defensive Salvo Results:';
        document.getElementById('resultArea').appendChild(salvoHeader);
        let successfulSalvo = 0;
        for (const result of salvoResult) {
          document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', 0, 'salvo'));
          result[3] === 'HIT' ? successfulSalvo += 1 : successfulSalvo += 0;
        }
        if (salvoResult) {
          const salvoText = `Other Results: ${successfulSalvo} inbound salvo${successfulSalvo !== 1 ? 's' : ''} (${salvoResult.map(x => x[1])}) got through the defensive salvos (${salvoResult.map(x => x[2])}). `;
          document.getElementById('resultWords').innerText += salvoText;
          document.getElementById('result_log').innerHTML += salvoText; 
        }
      }
      const closeInbound = {};
      for (const salvo of salvoResult) {
        if (salvo[3] === 'HIT') {
          if (salvo[0] in closeInbound) {
            closeInbound[salvo[0]] += 1;
          } else {
            closeInbound[salvo[0]] = 1;
          }
        }
      }
      finalResult = strikeBaseAttack(closeInbound, base_def);
      const baseHeader = document.createElement('p');
      baseHeader.innerText = 'Other Results:';
      document.getElementById('resultArea').appendChild(baseHeader);
      let successfulFinal = 0;
      for (const result of finalResult.results) {
        document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
        result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
      }
      total_stepsLost += finalResult.hit_count
      const finalText = ` ${finalResult.results.length} inbound salvo${finalResult.results.length !== 1 ? 's' : ''} scored a total of ${successfulFinal} hit${successfulFinal !== 1 ? 's' : ''} (${finalResult.results.map(x => x[1])}), resulting in ${finalResult.hit_count} step${finalResult.hit_count !== 1 ? 's' : ''} lost. `;
      document.getElementById('resultWords').innerText += `${finalText}\n`;
      document.getElementById('result_log').innerHTML += finalText;
    } else {
      const allSalvos = [];
      for (const x of Object.keys(cruise_inbound)) {
        for (let i = 0; i < cruise_inbound[x]; i++) {
          allSalvos.push(x);
        }
      }
      const defendedSalvos = allSalvos.reverse().slice(0, total_defense);
      const undefendedSalvos = allSalvos.slice(total_defense);
      const defendedSalvoObj = {};
      const undefendedSalvoObj = {};
      defendedSalvos.forEach(x => {
        if (x in defendedSalvoObj) {
          defendedSalvoObj[x] += 1;
        } else {
          defendedSalvoObj[x] = 1;
        }
      });
      undefendedSalvos.forEach(x => {
        if (x in undefendedSalvoObj) {
          undefendedSalvoObj[x] += 1;
        } else {
          undefendedSalvoObj[x] = 1;
        }
      });
      salvoResult = strikeDefSalvoAttack(defendedSalvoObj, cruise_defense);
      console.log(salvoResult);
      if (salvoResult) {
        const salvoHeader = document.createElement('p');
        salvoHeader.innerText = 'Defensive Salvo Results:';
        document.getElementById('resultArea').appendChild(salvoHeader);
        let successfulSalvo = 0;
        for (const result of salvoResult) {
          document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', 0, 'salvo'));
          result[3] === 'HIT' ? successfulSalvo += 1 : successfulSalvo += 0;
        }
        if (salvoResult) {
          const salvoText = `Other Results: ${successfulSalvo} inbound salvo${successfulSalvo !== 1 ? 's' : ''} (${salvoResult.map(x => x[1])}) got through the defensive salvos (${salvoResult.map(x => x[2])}). `;
          document.getElementById('resultWords').innerText += salvoText;
          document.getElementById('result_log').innerHTML += salvoText; 
        }
      }
      for (const salvo of salvoResult) {
        if (salvo[3] === 'HIT') {
          if (salvo[0] in undefendedSalvoObj) {
            undefendedSalvoObj[salvo[0]] += 1;
          } else {
            undefendedSalvoObj[salvo[0]] = 1;
          }
        }
      }
      finalResult = strikeBaseAttack(undefendedSalvoObj, base_def);
      const baseHeader = document.createElement('p');
      baseHeader.innerText = 'Cruise Missile Results:';
      document.getElementById('resultArea').appendChild(baseHeader);
      let successfulFinal = 0;
      for (const result of finalResult.results) {
        document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
        result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
      }
      total_stepsLost += finalResult.hit_count
      const finalText = ` ${finalResult.results.length} inbound salvo${finalResult.results.length !== 1 ? 's' : ''} scored a total of ${successfulFinal} hit${successfulFinal !== 1 ? 's' : ''} (${finalResult.results.map(x => x[1])}), resulting in ${finalResult.hit_count} step${finalResult.hit_count !== 1 ? 's' : ''} lost. `;
      document.getElementById('resultWords').innerText += `${finalText}\n`;
      document.getElementById('result_log').innerHTML += finalText;
    }
  }
  document.getElementById('resultWords').innerText += `Total Steps Lost: ${total_stepsLost}.`
  document.getElementById('result_log').innerHTML += `Total Steps Lost: ${total_stepsLost}<br>`;
}, false);

// Torpedo Attack Tool

function findSub(subDetect, ASW=[0, 0, 0, false, {}]) {
  let ASW_assets = ASW[4];
  let promo_demo = ASW.slice(0,-2).reduce((acc, a) => acc + a, 0);
  if (promo_demo > 0) {
    for (let i = 0; i < promo_demo; i++) {
      ASW_assets = promoteAll(ASW_assets, true)
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

function subAttack(targStep, targDef, subDetect, torpStr, subDef, ASW=[0, 0, 0, false, {}]) {
  let [ASW_assets, ASW_rolls, subFound] = findSub(subDetect, ASW);
  const ASW_attacks = []
  if (subFound) {
    let ASW_asset_attacks = ASW[4];
    if (ASW[3]) {
      ASW_asset_attacks = allForOne(ASW[4]);
    }
    for (const [key, value] of Object.entries(ASW_asset_attacks)) {
      for (let i = 0; i < value; i++) {
        ASW_attacks.push(dieRoller(key))
      }
    }
  }
  let sub_torps = {}
  sub_torps[torpStr] = targStep;
  let torp_rolls =  [];
  for (let i = 0; i < targStep; i++) {
    torp_rolls.push(dieRoller(torpStr))
  }
  return [ASW_assets, ASW_rolls, subFound, ASW_attacks, sub_torps, torp_rolls, targDef, subDef]
}

function subAttackResults() {
  const asw = [];
  asw.push(0); //This used to be a run silent check, but that doesn't happen for a torpedo attack so in order to maintain other code, this is just a 0. It has no affect.
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
  let [ASW_assets, ASW_rolls, subFound, ASW_attacks, sub_torps, torp_rolls, targDef, subDef] = subAttackResults();
  const asw_screen = document.getElementById('torp_ASW_screen').checked;
  let torp_hits = 0
  for (const hit of torp_rolls) {
    torp_hits += checkForHits(hit, targDef)   
  }
  const asw_hits = ASW_attacks.filter(x => x >= subDef)
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  resultArea.appendChild(createResults(ASW_assets, ASW_rolls, 'ASW Search'));
  if (ASW_attacks.length !== 0) {
    resultArea.appendChild(createResults(ASW_assets, ASW_attacks, 'ASW Attack'));
  }
  if ((asw_screen && asw_hits.length === 0) || (!asw_screen)) {
    resultArea.appendChild(createResults(sub_torps, torp_rolls, 'Torpedo Results'));
  }
  if (asw_screen) {
    if (asw_hits.length > 0) {
      const ASW_result = `The following assets ${JSON.stringify(ASW_assets)} went looking. The sub was found by the ASW Screen (${ASW_rolls}) and destroyed (${ASW_attacks}).`
      document.getElementById('resultWords').innerText = `Torpedo Attack: ${ASW_result}`;
      document.getElementById('result_log').innerHTML += `Torpedo Attack: ${ASW_result}<br>`;
    } else {
      const ASW_result = `The following assets ${JSON.stringify(ASW_assets)} went looking. ${subFound ? `The sub was found (${ASW_rolls}) and survived (${ASW_attacks}).` : `The sub was undetected (${ASW_rolls}).`}`
      const torp_result = `${torp_hits === 0 ? 'The target survived.' : torp_hits === 1 ? 'The target took one hit' : `The target took ${torp_hits} hits`} (${torp_rolls}).`
      document.getElementById('resultWords').innerText = `Torpedo Attack: ${torp_result} ${ASW_result}`;
      document.getElementById('result_log').innerHTML += `Torpedo Attack: ${torp_result} ${ASW_result}<br>`;
    }
  } else {
    const ASW_result = `The following assets ${JSON.stringify(ASW_assets)} went looking. ${subFound ? `The sub was found (${ASW_rolls}) and ${asw_hits.length > 0 ? 'was destroyed' : 'survived'} (${ASW_attacks})` : `The sub was undetected (${ASW_rolls}).`}`
    const torp_result = `${torp_hits === 0 ? 'The target survived.' : torp_hits === 1 ? 'The target took one hit' : `The target took ${torp_hits} hits`} (${torp_rolls}).`
    document.getElementById('resultWords').innerText = `Torpedo Attack: ${torp_result} ${ASW_result}`;
    document.getElementById('result_log').innerHTML += `Torpedo Attack: ${torp_result} ${ASW_result}<br>`;
  }
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
  return [sam_assets, all_rolls, sam_results];
}

document.getElementById('samStrikeSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  let [sam_assets, all_rolls, sam_results] = samAttackResults();
  resultArea.appendChild(createResults(sam_assets, all_rolls))
  document.getElementById('resultWords').innerText = `Surface-to-Air: The following weapons ${JSON.stringify(sam_assets)} were fired at the aircraft resulting in ${sam_results.length === 1 ? '1 hit' : sam_results.length + ' hits.'}`;
  document.getElementById('result_log').innerHTML += `Surface-to-Air: The following weapons ${JSON.stringify(sam_assets)} were fired at the aircraft resulting in ${sam_results.length === 1 ? '1 hit' : sam_results.length + ' hits.'}<br>`;
}, false);

// Air to Air Combat Tool

const dash_number = [['one', 1], ['two', 2], ['three', 3], ['four', 4], ['five', 5]];

function getAircraft(side) {
  let flight = []
  for (const dash_pair of dash_number) {
    const [word_number, number] = dash_pair;
    const atk_value = document.getElementById(`${side}_aaw_${word_number}_atk`).value;
    const def_value = parseInt(document.getElementById(`${side}_aaw_${word_number}_def`).value);
    const target = parseInt(document.getElementById(`${side}_aaw_${word_number}_targ`).value);
    if (atk_value) {
      flight.push([number, atk_value, def_value, target])
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
    if (attacker[1] === "0") {
      blue_victories.push(['blue', ...attacker, 0]);
    } else {
      const attk_roll = dieRoller(attacker[1]);
      // return side, a/c number, attack value, def value, target, attack result
      blue_victories.push(['blue', ...attacker, attk_roll]);
    }
  }
  for (const attacker of red_aircraft) {
    if (attacker[1] === "0") {
      red_victories.push(['red', ...attacker, 0]);
    } else {
      const attk_roll = dieRoller(attacker[1]);
      // return side, a/c number, attack value, def value, target, attack result
      red_victories.push(['red', ...attacker, attk_roll]);
    }
  }
  return {blue_victories, red_victories}
}

document.getElementById('airToAirSubmit').addEventListener('click', () => {
  const {blue_victories, red_victories} = furball();
  const blue_death = new Set();
  const red_death = new Set();
  let word_result = '';
  document.getElementById('resultWords').innerHTML = '';
  document.getElementById('resultArea').innerHTML = '';
  for (let shooter of blue_victories) {
    const theMergeDiv = document.createElement('div')
    theMergeDiv.classList.add('mergeResult');
    const shooterP = document.createElement('p');
    shooterP.classList.add('AAFighters');
    const defenderP = document.createElement('p');
    defenderP.classList.add('AAFighters');
    try {
      const hit_or_miss = shooter[5] >= red_victories[shooter[4] - 1][3];
      if (hit_or_miss) {
        red_death.add(shooter[4])
      }
      shooterP.innerHTML = `Blue A/C ${shooter[1]}`
      defenderP.innerHTML = `Red A/C ${shooter[4]}`
      theMergeDiv.appendChild(createDefResult(shooter[2], shooter[5], red_victories[shooter[4] - 1][3], hit_or_miss, 0))
      word_result += `Blue A/C ${shooter[1]} rolled ${shooter[5]} on d${shooter[2]} against Red A/C ${shooter[4]} resulting in a ${hit_or_miss ? 'hit' : 'miss'}. `;
    }
    catch(e) {
      shooterP.innerHTML = `Blue A/C ${shooter[1]} had no target.`
    }
    theMergeDiv.insertBefore(shooterP, theMergeDiv.lastChild);
    theMergeDiv.appendChild(defenderP);
    document.getElementById('resultArea').appendChild(theMergeDiv);
    
  }
  for (let shooter of red_victories) {
    const theMergeDiv = document.createElement('div')
    theMergeDiv.classList.add('mergeResult');
    const shooterP = document.createElement('p');
    shooterP.classList.add('AAFighters');
    const defenderP = document.createElement('p');
    defenderP.classList.add('AAFighters');
    try {
      const hit_or_miss = shooter[5] >= blue_victories[shooter[4] - 1][3];
      if (hit_or_miss) {
        blue_death.add(shooter[4])
      }
      shooterP.innerHTML = `Red A/C ${shooter[1]}`
      defenderP.innerHTML = `Blue A/C ${shooter[4]}`
      theMergeDiv.appendChild(createDefResult(shooter[2], shooter[5], blue_victories[shooter[4] - 1][3], hit_or_miss, 0))
      word_result += ` Red A/C ${shooter[1]} rolled ${shooter[5]} on d${shooter[2]} against Blue A/C ${shooter[4]} resulting in a ${hit_or_miss ? 'hit' : 'miss'}. `;
    } 
    catch(e) {
      shooterP.innerHTML = `Red A/C ${shooter[1]} had no target.`
    }
    theMergeDiv.insertBefore(shooterP, theMergeDiv.lastChild);
    theMergeDiv.appendChild(defenderP);
    document.getElementById('resultArea').appendChild(theMergeDiv);
  }
  let death_result = (blue_death.size === 0 && red_death.size === 0) ? 'BLUF: No aircraft destroyed' : 'BLUF - The following aircraft were destroyed: ';
  let blueDeath_result = '';
  let redDeath_result = '';
  if (blue_death.size > 0) {
    const set_array = Array.from(blue_death);
    if (set_array.length === 1) {
      blueDeath_result += `Blue ${set_array}`;
    } else if (set_array.length === 2) {
      blueDeath_result += `Blue ${set_array.join(' and ')}`
    } else {
      blueDeath_result += `Blue ${set_array.slice(0,-1).join(', ')} and ${set_array[-1]}`
    }
  }
  if (red_death.size > 0) {
    const set_array = Array.from(red_death);
    if (set_array.length === 1) {
      redDeath_result += `Red ${set_array}`;
    } else if (set_array.length === 2) {
      redDeath_result += `Red ${set_array.join(' and ')}`
    } else {
      redDeath_result += `Red ${set_array.slice(0,-1).join(', ')} and ${set_array[-1]}`
    }
  }
  document.getElementById('resultWords').innerHTML = `${death_result}${blueDeath_result ? blueDeath_result : ''}${(blue_death.size > 0 && red_death.size > 0) ? ' and ' : ''}${redDeath_result ? redDeath_result : ''}.<br><br>${word_result}`;
  document.getElementById('result_log').innerHTML += `Air-to-Air: ${word_result} <br>`;
}, false);

// SOF Direct Action Tool

function SOFDirectAction() {
  const detection = {};
  const directAction = {};
  let attack_roll = 0;
  const detection_die = document.getElementById('sofDA_detect_roll').value;
  const detection_roll = dieRoller(parseInt(detection_die))
  detection[detection_die] = 1;
  let message = '';
  if (detection_roll >= parseInt(document.getElementById('sofDA_ISR_value').value)) {
    message = `The unit was discovered.`;
  } else {
    const attack_die = document.getElementById('sofDA_att').value;
    const target_def = parseInt(document.getElementById('sofDA_def').value)
    attack_roll = dieRoller(parseInt(attack_die))
    directAction[attack_die] = 1;
    message = "The attack was unsuccessful."; 
    const total_hits = checkForHits(attack_roll, target_def)
    if (total_hits === 1) {
      message = "One hit was scored.";
    }
    if (total_hits > 1) {
      message = `${total_hits} hits scored!`;
    } 
  }
  return [detection, detection_roll, directAction, attack_roll, message]
}

document.getElementById('sofDirectActionSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  let [detection, detection_roll, directAction, attack_roll, message] = SOFDirectAction();
  let disp_message = '';
  resultArea.appendChild(createResults(detection, [detection_roll], 'Detection'));
  if (Object.keys(directAction).length === 0) {
    disp_message = `SOF DA: The detection roll was ${detection_roll}. ${message}<br>`;
  } else {
    resultArea.appendChild(createResults(directAction, [attack_roll], 'Attack'));
    disp_message = `SOF DA: The detection roll was ${detection_roll}. The attack roll was ${attack_roll}. ${message}<br>`;
  }
  document.getElementById('resultWords').innerHTML = disp_message;
  document.getElementById('result_log').innerHTML += disp_message;
}, false);

// Ground Combat

function getAttackerModifiers() {
  let att_modi = 0
  const att_axis = Array.from(document.getElementsByName('att_ax')).find(radio => radio.checked);
  if (att_axis.value !== 'ax1') {
    att_axis.value === 'ax2' ? att_modi += 1 : att_modi += 2;
  }
  const terrain_type = document.getElementById('grndCom_weather').value;
  if (terrain_type !== 'clear') {
    terrain_type === 'light' ? att_modi -= 1 : att_modi -= 2;
  }
  att_modi = document.getElementById('grndCom_att_CAS').value ? att_modi += parseInt(document.getElementById('grndCom_att_CAS').value) : att_modi;
  att_modi = document.getElementById('grndCom_att_FS').value ? att_modi += parseInt(document.getElementById('grndCom_att_FS').value) : att_modi;
  att_modi = document.getElementById('grndCom_troop_quality').value ? att_modi += parseInt(document.getElementById('grndCom_troop_quality').value) : att_modi;
  att_modi = document.getElementById('grndCom_att_main_effort').checked ? att_modi += 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_SIGINTEMSO').checked ? att_modi += 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_tankvsinfOpen').checked ? att_modi += 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_SOFenabled').checked ? att_modi += 1 : att_modi;
  att_modi = document.getElementById('grndCom_eng_enabled').checked ? att_modi += 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_disrupted').checked ? att_modi -= 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_suppress').checked ? att_modi -= 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_extended').checked ? att_modi -= 1 : att_modi;
  att_modi = document.getElementById('grndCom_att_iso').checked ? att_modi -= 3 : att_modi;
  att_modi = document.getElementById('grndCom_att_assault').checked ? att_modi -= 2 : att_modi;
  return att_modi
}

function getDefenderModifiers() {
  let def_modi = 0
  const est_def = Array.from(document.getElementsByName('def_amt')).find(radio => radio.checked);
  if (est_def.value !== 'def1') {
    est_def.value === 'def2' ? def_modi -= 1 : def_modi -= 2;
  }
  const sup_arr = Array.from(document.getElementsByName('def_sup')).find(radio => radio.checked);
  if (sup_arr.value !== 'sup1') {
    sup_arr.value === 'sup2' ? def_modi += 1 : def_modi += 2;
  }
  def_modi = document.getElementById('grndCom_def_CAS').value ? def_modi -= parseInt(document.getElementById('grndCom_def_CAS').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_FS').value ? def_modi -= parseInt(document.getElementById('grndCom_def_FS').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_atgm').value ? def_modi -= parseInt(document.getElementById('grndCom_def_atgm').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_obstacles').value ? def_modi -= parseInt(document.getElementById('grndCom_def_obstacles').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_actPassCM').checked ? def_modi -= 1 : def_modi;
  def_modi = document.getElementById('grndCom_def_unsupported').checked ? def_modi += 2 : def_modi;
  def_modi = document.getElementById('grndCom_def_suppress').checked ? def_modi += 1 : def_modi;
  def_modi = document.getElementById('grndCom_def_crowded').checked ? def_modi += 1 : def_modi;
  def_modi = document.getElementById('grndCom_def_overcrowd').checked ? def_modi += 2 : def_modi;
  def_modi = document.getElementById('grndCom_def_rsoi').checked ? def_modi += 1 : def_modi;
  return def_modi
}

const grnd_abacus = {
  '7': {'open': 3, 'for/mtn': 3, 'urban': 3, 'durban': 2},
  '6': {'open': 3, 'for/mtn': 2, 'urban': 2, 'durban': 2},
  '5': {'open': 2, 'for/mtn': 2, 'urban': 2, 'durban': 1},
  '4': {'open': 2, 'for/mtn': 2, 'urban': 1, 'durban': 0},
  '3': {'open': 1, 'for/mtn': 1, 'urban': 0, 'durban': -1},
  '2': {'open': 1, 'for/mtn': 0, 'urban': 0, 'durban': -1},
  '1': {'open': 0, 'for/mtn': 0, 'urban': -1, 'durban': -2},
  '0': {'open': -1, 'for/mtn': -1, 'urban': -1, 'durban': -2},
  '-1': {'open': -1, 'for/mtn': -1, 'urban': -2, 'durban': -3},
  '-2': {'open': -2, 'for/mtn': -2, 'urban': -3, 'durban': -3},
  '-3': {'open': -3, 'for/mtn': -3, 'urban': -3, 'durban': -3},
  '-4': {'open': -3, 'for/mtn': -3, 'urban': -4, 'durban': -4}
}

function g_cat(die_roll, red_shield) {
  switch(die_roll) {
    case 1:
      return "Attacker loses 2 steps and all surviving attacking units take a d8 Morale Check."
    case 16:
    case 17:
    case 18:
    case 19:
      return "Defender loses 2 steps, survivors must retreat 2 hexes and are suppressed. The attacker may advance 1 more hex and attack again."
    case 20:
      return "Defender loses 3 steps, attackers may exploit."
    default:
      if (die_roll <= Math.floor(red_shield / 2)) {
        return "Attacker loses 1 step and all surviving attacking units take a d8 Morale Check."
      }
      if (die_roll < red_shield) {
        return "Attacker loses 1 step and all surviving attacking units take a d6 Morale Check."
      }
      if (die_roll === red_shield) {
        return "Both sides lose 1 step and all surviving units take a d6 Morale Check."
      }
      if (die_roll > (red_shield * 4)) {
        return "Defender loses 3 steps, attackers may exploit."
      }
      if (die_roll > (red_shield * 3)) {
        return "Defender loses 2 steps, survivors must retreat 2 hexes and are suppressed. The attacker may advance 1 more hex and attack again."
      }
      if (die_roll > (red_shield * 2)) {
        return "Defender loses 2 steps and surviving defenders must make a d8 Morale Check."
      }
      return "Both sides lose 1 step, all surviving defending units take a d6 Morale Check."
  }
}

function groundPromoDemo() {
  const terrain_type = document.getElementById('grndCom_terr').value;
  const att_mod = getAttackerModifiers();
  const def_mod = getDefenderModifiers();
  const att_battalions = parseInt(document.getElementById('grndCom_att_bn_tot').value)
  const def_battalions = parseInt(document.getElementById('grndCom_def_bn_tot').value)
  let advantage = att_mod + def_mod;
  let odds = 0;
  if (att_battalions === def_battalions) {
    odds = 1
  } else {
    odds = att_battalions / def_battalions
  }
  if (odds >= 5) {
    advantage += 4
  } else if (odds >= 4) {
    advantage += 3
  } else if (odds >= 3) {
    advantage += 2 
  } else if (odds >= 2) {
    advantage += 1
  } else if (odds <= 0.33) {
    advantage -= 2
  } else if (odds <= 0.5) {
    advantage -= 1
  }
  let adjustments = 0;
  if (advantage >= 7) {
    adjustments = grnd_abacus['7'][terrain_type]
  } else if (advantage <= -4) {
    adjustments = grnd_abacus['-4'][terrain_type]
  } else {
    switch (advantage) {
      case 6:
        adjustments = grnd_abacus['6'][terrain_type]
        break;
      case 5:
        adjustments = grnd_abacus['5'][terrain_type]
        break;
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
        adjustments = grnd_abacus['-1'][terrain_type]
        break;
      case -2:
        adjustments = grnd_abacus['-2'][terrain_type]
        break;
      case -3:
        adjustments = grnd_abacus['-3'][terrain_type]
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
  const defense = document.getElementById('grndCom_def_val').value ? parseInt(document.getElementById('grndCom_def_val').value) : 0;
  const attk_val = document.getElementById('lead_attack_dice').value;
  attk_dice[attk_val] = 1
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
  const result_message = g_cat(attk_rolls[0], defense)
  return [attk_dice, attk_rolls, defense, result_message]
}

document.getElementById('groundCombatSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  let [attk_dice, attk_rolls, defense, result_message] = conductGroundAttack();
  resultArea.appendChild(createDefResult(Object.keys(attk_dice), attk_rolls, defense, attk_rolls[0] >= defense, false))
  if (JSON.stringify(attk_dice).search("null") !== -1 || JSON.stringify(attk_dice) === "{}") {
    document.getElementById('resultWords').innerHTML = 'Ground: No dice were rolled.';
    document.getElementById('result_log').innerHTML += 'Ground: No dice were rolled.<br>';
  } else {
    document.getElementById('resultWords').innerHTML = `Ground: The following dice ${JSON.stringify(attk_dice)} were rolled (${attk_rolls}): ${result_message}`;
    document.getElementById('result_log').innerHTML += `Ground: The following dice ${JSON.stringify(attk_dice)} were rolled (${attk_rolls}): ${result_message}<br>`;
  }
}, false);