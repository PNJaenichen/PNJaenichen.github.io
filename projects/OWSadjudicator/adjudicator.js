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

function createDefResult(dieSides, dieResult, defValue, hitRes, d4_hits, typeDef='base') {
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
  if (d4_hits > 0) {
    const d4result = document.createElement('div');
    d4result.classList.add('def-result');
    d4result.appendChild(createDie(4, d4_hits));
    finalResult.appendChild(d4result);
  }
  return finalResult;
}

// General Dice Roller

document.getElementById('generalSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
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
  document.getElementById('resultWords').innerText = `General Roll: ${die_total === 1 ? `One ${die_value}-sided die was` : `${die_total} ${die_value}-sided dice were`} rolled, with the following results: ${die_results}`;
  document.getElementById('result_log').innerHTML += `General Roll: ${die_total === 1 ? `One ${die_value}-sided die was` : `${die_total} ${die_value}-sided dice were`} rolled, with the following results: ${die_results}<br>`;
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
  const promos = document.getElementById('promo_input').value ? parseInt(document.getElementById('promo_input').value) : 0;
  let demos = document.getElementById('demo_input').value ? parseInt(document.getElementById('demo_input').value) : 0;
  const hyper_inbound = document.getElementById('hyper').checked;
  const bm_inbound = document.getElementById('ballistic').checked;
  let cap = 0;
  if (!hyper_inbound && !bm_inbound) {
    cap = document.getElementById('cap_input').value ? parseInt(document.getElementById('cap_input').value) : 0;
  }
  const base_def = document.getElementById('target_def').value ? parseInt(document.getElementById('target_def').value) : 0;
  const inbound = {};
  const defense = {};
  for (let user_input of ['inbound_one', 'inbound_two', 'inbound_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total').value) {
      const weaponValue = parseInt(document.getElementById(user_input).value);
      const weaponTotal = parseInt(document.getElementById(user_input + '_total').value);
      if (weaponTotal === 0) {
        continue;
      } else if (weaponValue in inbound) {
        inbound[weaponValue] += weaponTotal
      } else {;
        inbound[weaponValue] = weaponTotal;
      }
    }
  }
  for (let user_input of ['def_one', 'def_two', 'def_three']) {
    if (document.getElementById(user_input).value && document.getElementById(user_input + '_total')) {
      const defenseValue = parseInt(document.getElementById(user_input).value);
      const defenseTotal = parseInt(document.getElementById(user_input + '_total').value);
      if ((!hyper_inbound && !bm_inbound) || (bm_inbound && document.getElementById(user_input + '_bmd').checked)) {
        if (defenseValue === 0 || defenseTotal === 0) {
          continue;
        } else if (defenseValue in defense) {
          defense[defenseValue] += defenseTotal;
        } else {
          defense[defenseValue] = defenseTotal;
        }
      }
    }
  }
  if (Object.keys(defense).length > 0) {
    demos += document.getElementById("aew_input").checked ? 2 : 0;
  }
  return {inbound, defense, base_def, cap, promos, demos, hyper_inbound, bm_inbound};
}

function strikeBaseAttack(inbound, base_def, d4_hits) {
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
      results.push([x, dieRolls[x][i], base_def, result, (d4_hits && result === 'HIT') ? dieRoller(4) : 0]);
    }
  }
  let hit_count = 0;
  for (const result of results) {
    if (result[4] === 0) {
      if (result[1] >= (base_def * 2)) {
        hit_count += 2;
      } else if (result[1] >= base_def) {
        hit_count += 1;
      }
      if (result[1] === parseInt(result[0]) && parseInt(result[0]) >= 12) {
      hit_count += 1;
      }
    } else {
      hit_count += result[4]
    }
    
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

function inboundAdjustments(inbound, defSalvoDelta, cap, totPromDemo) {
  const adjInbound = {...inbound}
  if (defSalvoDelta > 0) {
    for (let i = 0; i < defSalvoDelta; i++) {
      demoteOne(adjInbound)
    }
  }
  for (let i = 0; i < cap; i++) {
    demoteOne(adjInbound)
  }
  if (totPromDemo > 0) {
    for (let i = 0; i < totPromDemo; i++) {
      promoteAll(adjInbound)
    }
  } else if (totPromDemo < 0) {
    for (let i = 0; i > totPromDemo; i--) {
      demoteAll(adjInbound)
    }
  }
  return adjInbound
}

document.getElementById('strikeSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
    document.getElementById('resultWords').innerText = '';
  }
  const { inbound, defense, base_def, cap, promos, demos, hyper_inbound, bm_inbound } = getStrikeInputs();
  let finalResult;
  let salvoResult;
  const totalInbound = Object.values(inbound).reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  const totalDefense = Object.values(defense).reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  const salvoDelta = totalInbound - totalDefense;
  const adjInbound = inboundAdjustments(inbound, salvoDelta, cap, promos - demos)
  if (totalDefense === 0) {
    finalResult = strikeBaseAttack(adjInbound, base_def, hyper_inbound || bm_inbound);
  } else if (totalInbound <= totalDefense) {
    salvoResult = strikeDefSalvoAttack(adjInbound, defense);
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
    finalResult = strikeBaseAttack(closeInbound, base_def, bm_inbound);
  } else {
    const allOffensiveSalvos = [];
    for (const x of Object.keys(adjInbound)) {
      for (let i = 0; i < adjInbound[x]; i++) 
      allOffensiveSalvos.push(x);
    }
    const defendedSalvoList = allOffensiveSalvos.reverse().slice(0, salvoDelta);
    const undefendedSalvoList = allOffensiveSalvos.reverse().slice(salvoDelta);
    const defendedSalvoObj = {};
    const undefendedSalvoObj = {};
    defendedSalvoList.forEach(x => {
      if (x in defendedSalvoObj) {
        defendedSalvoObj[x] += 1;
      } else {
        defendedSalvoObj[x] = 1;
      }
    })
    undefendedSalvoList.forEach(x => {
      if (x in undefendedSalvoObj) {
        undefendedSalvoObj[x] += 1;
      } else {
        undefendedSalvoObj[x] = 1;
      }
    })
    salvoResult = strikeDefSalvoAttack(defendedSalvoObj, defense);
    for (const salvo of salvoResult) {
      if (salvo[3] === 'HIT') {
        if (salvo[0] in undefendedSalvoObj) {
          undefendedSalvoObj[salvo[0]] += 1;
        } else {
          undefendedSalvoObj[salvo[0]] = 1;
        }
      }
    } 
    finalResult = strikeBaseAttack(undefendedSalvoObj, base_def, bm_inbound);
  }
  let successfulSalvo = 0;
  if (salvoResult) {
    const salvoHeader = document.createElement('p');
    salvoHeader.innerText = 'Defensive Salvo Results:';
    document.getElementById('resultArea').appendChild(salvoHeader);
    for (const result of salvoResult) {
      document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', 0, 'salvo'));
      result[3] === 'HIT' ? successfulSalvo += 1 : successfulSalvo += 0;
    }
  }
  const baseHeader = document.createElement('p');
  baseHeader.innerText = 'Final Results:';
  document.getElementById('resultArea').appendChild(baseHeader);
  let successfulFinal = 0;
  for (const result of finalResult.results) {
    document.getElementById('resultArea').appendChild(createDefResult(result[0], result[1], result[2], result[3]==='HIT', result[4]));
    result[3] === 'HIT' ? successfulFinal += 1 : successfulFinal += 0;
  }
  document.getElementById('result_log').innerHTML += 'Missile Strike: ';
  if (salvoResult) {
    const salvoText = `${successfulSalvo} inbound salvo${successfulSalvo !== 1 ? 's' : ''} (${salvoResult.map(x => x[1])}) got through the defensive salvos (${salvoResult.map(x => x[2])}). `;
    document.getElementById('resultWords').innerText = salvoText;
    document.getElementById('result_log').innerHTML += salvoText; 
  }
  const finalText = ` ${finalResult.results.length} inbound salvo${finalResult.results.length !== 1 ? 's' : ''} scored a total of ${successfulFinal} hit${successfulFinal !== 1 ? 's' : ''} (${finalResult.results.map(x => x[1])}), resulting in ${finalResult.hit_count} step${finalResult.hit_count !== 1 ? 's' : ''} lost.`;
  document.getElementById('resultWords').innerText += finalText;
  document.getElementById('result_log').innerHTML += finalText;
  document.getElementById('result_log').innerHTML += '<br>';
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
  const torp_results = torp_rolls.filter(x => x >= targDef)
  let torp_hits = torp_results.length
  console.log(torp_hits);
  for (const hit of torp_rolls) {
    if (hit >= (targDef * 2)) {
      console.log("double def");
      torp_hits += 1;
    }
    if (hit === parseInt(Object.keys(sub_torps)[0]) && parseInt(Object.keys(sub_torps)[0]) >= 12) {
      console.log("rolled max");
      torp_hits += 1;
    }     
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
  resultArea.appendChild(createResults(sub_torps, torp_rolls, 'Torpedo Results'));
  const ASW_result = `The following assets ${JSON.stringify(ASW_assets)} went looking. ${subFound ? `The sub was found (${ASW_rolls}) and ${asw_hits.length > 0 ? 'was destroyed' : 'survived'} (${ASW_attacks})` : `The sub was undetected (${ASW_rolls}).`}`
  const torp_result = `${torp_hits === 0 ? 'The target survived.' : torp_hits === 1 ? 'The target took one hit' : `The target took ${torp_hits} hits`} (${torp_rolls}).`
  document.getElementById('resultWords').innerText = `Torpedo Attack: ${torp_result} ${ASW_result}`;
  document.getElementById('result_log').innerHTML += `Torpedo Attack: ${torp_result} ${ASW_result}<br>`;
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
      blue_victories.push([0, ...attacker, 0]);
    } else {
      const attk_roll = dieRoller(attacker[1]);
      // return side (0 = Blue, 1 = Red), a/c number, attack value, def value, target, attack result
      blue_victories.push([0, ...attacker, attk_roll]);
    }
  }
  for (const attacker of red_aircraft) {
    if (attacker[1] === "0") {
      red_victories.push([1, ...attacker, 0]);
    } else {
      const attk_roll = dieRoller(attacker[1]);
      // return side (0 = Blue, 1 = Red), a/c number, attack value, def value, target, attack result
      red_victories.push([1, ...attacker, attk_roll]);
    }
  }
  return [blue_victories, red_victories]
}

document.getElementById('airToAirSubmit').addEventListener('click', () => {
  const air_results = furball()
  document.getElementById('resultWords').innerHTML = '';
  document.getElementById('resultArea').innerHTML = '';
  document.getElementById('result_log').innerHTML += 'Air-to-Air: '
  // side, a/c #, att val, def val, target, att res
  // let first_one = [0,1,8,5,1,7];
  // object = diceTotal, array = diceResults, dice_title=''
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < air_results[i].length; j++) {
      if (air_results[i][j][5] !== 0) {
        let asset_obj = {};
        asset_obj[air_results[i][j][2].toString()] = 1;
        let shooter = `${air_results[i][j][0] === 0 ? 'Blue' : 'Red'} A/C ${air_results[i][j][1]}`;
        let defender = `${air_results[i][j][0] === 0 ? 'Red' : 'Blue'} A/C ${air_results[i][j][4]}`;
        const theMergeDiv = document.createElement('div');
        const shootDefDiv = document.createElement('div');
        const shooterP = document.createElement('p');
        const versesP = document.createElement('p');
        const defenderP = document.createElement('p');
        const mergeResult = document.createElement('p');
        shooterP.innerText = shooter;
        defenderP.innerText = defender;
        versesP.innerText = 'vs';
        let targ_def = 0;
        if (i === 0) {
          for (let k = 0; k < air_results[1].length; k++) {
            if (air_results[1][k][1] === air_results[0][j][4]) {
              targ_def = air_results[1][k][3];
            } 
          }
        } else {
          for (let k = 0; k < air_results[0].length; k++) {
            if (air_results[0][k][1] === air_results[0][j][4]) {
              targ_def = air_results[0][k][3];
            }
          }
        }
        mergeResult.innerText = air_results[i][j][5] >= targ_def ? 'HIT' : 'MISS';
        shootDefDiv.appendChild(shooterP);
        shootDefDiv.appendChild(versesP);
        shootDefDiv.appendChild(defenderP);
        theMergeDiv.appendChild(shootDefDiv);
        theMergeDiv.appendChild(createResults(asset_obj, [air_results[i][j][5]]));
        theMergeDiv.appendChild(mergeResult);
        shootDefDiv.classList.add('AAFighters');
        theMergeDiv.classList.add('mergeResult');
        document.getElementById('resultArea').appendChild(theMergeDiv);
        document.getElementById('resultWords').innerHTML += `${shooter} rolled ${air_results[i][j][5]} on ${JSON.stringify(asset_obj)} against ${defender} resulting in a ${air_results[i][j][5] >= air_results[i][j][3] ? 'HIT' : 'MISS'}.<br>`
        document.getElementById('result_log').innerHTML += `${shooter} rolled ${air_results[i][j][5]} on ${JSON.stringify(asset_obj)} against ${defender} resulting in a ${air_results[i][j][5] >= air_results[i][j][3] ? 'HIT' : 'MISS'}. `
      }
    }      
  }
    document.getElementById('result_log').innerHTML += '<br>';
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
    attack_roll = dieRoller(parseInt(attack_die))
    directAction[attack_die] = 1;
    message =  "The attack was unsuccessful.";
    if (attack_roll >= parseInt(document.getElementById('sofDA_def').value)) {
      message =  "One hit was scored.";
      if (attack_roll === parseInt(attack_die)) {
        message =  "Two hits were scored!";
      } 
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
  att_modi = document.getElementById('grndCom_troop_quality').value ? att_modi += parseInt(document.getElementById('grndCom_troop_quality').value) : att_modi;
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
  def_modi = document.getElementById('grndCom_def_CAS').value ? def_modi -= parseInt(document.getElementById('grndCom_def_CAS').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_FS').value ? def_modi -= parseInt(document.getElementById('grndCom_def_FS').value) : def_modi;
  def_modi = document.getElementById('grndCom_def_fortified').checked ? def_modi -= 1 : def_modi;
  def_modi = document.getElementById('grndCom_def_suppress').checked ? def_modi += 1 : def_modi;
  def_modi = document.getElementById('grndCom_def_rsoi').checked ? def_modi += 1 : def_modi;
  def_modi = document.getElementById('grndCom_def_airAslt').checked ? def_modi += 2 : def_modi;
  def_modi = document.getElementById('grndCom_def_ampAslt').checked ? def_modi += 2 : def_modi;
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
  const advantage = att_mod + def_mod;
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
  return [attk_dice, attk_rolls, attk_rolls.filter(x => x >= defense)]
}

document.getElementById('groundCombatSubmit').addEventListener('click', () => {
  const resultArea = document.getElementById('resultArea');
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }
  let [attk_dice, attk_rolls, hits] = conductGroundAttack();
  resultArea.appendChild(createResults(attk_dice, attk_rolls))
  if (JSON.stringify(attk_dice).search("null") !== -1 || JSON.stringify(attk_dice) === "{}") {
    document.getElementById('resultWords').innerHTML = 'Ground: No dice were rolled.';
    document.getElementById('result_log').innerHTML += 'Ground: No dice were rolled.<br>';
  } else {
    document.getElementById('resultWords').innerHTML = `Ground: The following dice ${JSON.stringify(attk_dice)} were rolled (${attk_rolls}), resulting in ${hits.length === 1 ? 'one hit' : `${hits.length} hits (${hits}).` }`;
    document.getElementById('result_log').innerHTML += `Ground: The following dice ${JSON.stringify(attk_dice)} were rolled (${attk_rolls}), resulting in ${hits.length === 1 ? 'one hit' : `${hits.length} hits (${hits}).` }<br>`;
  }
}, false);