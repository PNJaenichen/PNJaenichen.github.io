
function dieRoller(sides) {
  return Math.ceil(Math.random() * sides)
}

function promoteAll(dice) {
  if (dice['16']) {
    dice['20'] ? dice['20'] += dice['16'] : dice['20'] = dice['16'];
    delete dice['16']
  }
  if (dice['12']) {
    dice['16'] ? dice['16'] += dice['12'] : dice['16'] = dice['12'];
    delete dice['12']
  }
  if (dice['10']) {
    dice['12'] ? dice['12'] += dice['10'] : dice['12'] = dice['10'];
    delete dice['10']
  }
  if (dice['8']) {
    dice['10'] ? dice['10'] += dice['8'] : dice['10'] = dice['8'];
    delete dice['8']
  }
  if (dice['6']) {
    dice['8'] ? dice['8'] += dice['6'] : dice['8'] = dice['6'];
    delete dice['6']
  }
  if (dice['4']) {
    dice['20'] ? dice['20'] += dice['16'] : dice['20'] = dice['16'];
    delete dice['16']
  }
  return dice
}

function promoteOne(dice) {
  let temp_20 = 0;
  if (dice['20']) {
    temp_20 = dice['20']
    delete dice['20']
  } 
  const high_die = Math.max(...Object.keys(dice).map(x => parseInt(x)));
  if (high_die === 16) {
    dice['20'] = temp_20 + 1;
    dice['16'] === 1 ? delete dice['16'] : dice['16'] -= 1;
  } else {
    let step = 0;
    high_die === 12 ? step = 4 : step = 2;
    dice[(high_die + step).toString()] = 1;
    dice[high_die.toString()] === 1 ? delete dice[high_die.toString()] : dice[high_die.toString()] -= 1;
  }
  return dice
}

function demoteAll(dice) {
  if (dice['4']) {
    delete dice['4']
  }
  if (dice['6']) {
    dice['4'] = dice['6'];
    delete dice['6']
  }
  if (dice['8']) {
    dice['6'] = dice['8'];
    delete dice['8']
  }
  if (dice['10']) {
    dice['8'] = dice['10'];
    delete dice['10']
  }
  if (dice['12']) {
    dice['10'] = dice['12'];
    delete dice['12']
  }
  if (dice['16']) {
    dice['12'] = dice['16'];
    delete dice['16']
  }
  if (dice['20']) {
    dice['16'] = dice['20'];
    delete dice['20']
  }
  return dice
}

function demoteOne(dice) {
  const high_die = Math.max(...Object.keys(dice).map(x => parseInt(x)));
  if (high_die === 4) {
    dice['4'] === 1 ? delete dice['4'] : dice['4'] -= 1;
  } else {
    let step = 0;
    high_die === 16 || high_die === 20 ? step = 4 : step = 2;
    dice[(high_die - step).toString()] ? dice[(high_die - step).toString()] += 1 : dice[(high_die - step).toString()] = 1;
    dice[(high_die).toString()] === 1 ? delete dice[(high_die).toString()] : dice[(high_die).toString()] -= 1;
  }
  return dice
}

function allForOne(dice) {
  return dice
}
module.exports = { dieRoller, promoteAll, promoteOne, demoteAll, demoteOne, allForOne };


  /*
  Missile Strikes

  Hypersonic - no CAP no defensive missiles
  Ballistic - no CAP, if beat grey shield roll against red shield

  Hyper and Ballistic roll d4 to determine hits

  SIGINT/EMSO promotes attacks

  Active/Passive CMs demotes attacks

  Long Rnage attacks with Disrupted PNT demotes attacks

  SOF TA promotes against a single target, this can be used with SOF SR on the
  same target

  Need target unit steps, base defense, and defensive missiles
  Need inbound offensive capability

  Critical Hit ... if value rolled is double the defense value then 2 hits are done
  if max value rolled on d12 and above, then 3 hits are done

  unengaged CAP demote at 1:1 ratio
  excess defensive missiles demote at 1:1 ratio

  US E-2D CEC capability is double demotion

  Against Fuel Points or ASPs each hit does D6 damage

  */

  /*
  ISR Detections

  Number of units being detected, may want to break them out for OIE tokens

  SOF SR promotes against a single target

  Active/Passive CMs demote detections
  SIGINT/EMSO promotes detections

  Combine assets
  */

  /*
  ASW 

  Defense and Detection together
  Littoral Waters, Running Silent, Caviation, Multiple Assets
  Promotions/Demotions
  */

  /*
  Torpedo Attack

  Similar to ASW but add Target Steps, and Target Defense, Torp Strength
  and remove Running Silent

  */

  // 

  /*
  Ground Combat

  Tactical map: Crowded hex (8+ steps) promote attacks into hex
                Over Crowded (10+ steps) double promote attacks into hex

  Fires Effects Table

  Target     Open           Forest        Mountain        Urban
            1 hit Supp    2 hits supp   1 hit supp      2 hits supp
  Armor     2 hits dmg    3 hits dmg    2 hits dmg      3 hits dmg
            3 hits kill   4 hits kill   Air PGM Promo   Air PGM Promo

            1 hit supp    2 hits supp   2 hits supp     2 hits supp
  Inf       2 hits dmg    3 hits dmg    3 hits dmg      3 hits dmg
            3 hits kill   4 hits kill   4 hits kill     5 hits kill
                                                        Hardened Tgt

            1 hit dmg     1 hit supp    1 hit supp      1 hit supp
  arty/     & suppress    2 hits dmg    2 hits dmg      2 hits dmg
    miss                  3 hits kill   3 hits kill     3 hits kill
                                        Air PGM Promo   Air PGM Promo
  
       Actioning Unit                  Target Unit Is
  Defender              +2        IDF Supp              -1/each
  3 Axis Att            +2        CAS Supp              -1/each
  2 Axis Att            +1        Defense               -1
  ME                    +1        Fortified             -2
  SIGINT/EMSO           +1        Act/Pass CM           -1
  IDF Supp              +1/each   Suppressed            +1
  CAS                   +1/each   Crowded Hex           +1
  Tnk v lInf in Open    +1        Over Crowded Hex      +2
  lInf v Tank not Open  +1        RSO&I                 +1
  SOF Enabled           +1        River/Abn/Amphib Aslt +2
  Troop Quality         +/-1
  Disrupted C2/PNT      -1/each
  Suppressed            -1
  In RSO&I              -1
  Extended Supply       -1
  Wx=Lt Rain/Snow       -1
  Wx=Storm              -2
  Isolated              -3
  River/Abn/Amphib Aslt -2
  Crowded Atk           -1
  Over Crowded Atk      -2

  const grnd_abacus = {
  '7': {'open': 3, 'forest/mtn': 3, 'urban': 3, 'durban': 2},
  '6': {'open': 3, 'forest/mtn': 2, 'urban': 2, 'durban': 2},
  '5': {'open': 2, 'forest/mtn': 2, 'urban': 2, 'durban': 1},
  '4': {'open': 2, 'forest/mtn': 2, 'urban': 1, 'durban': 0},
  '3': {'open': 1, 'forest/mtn': 1, 'urban': 1, 'durban': 0},
  '2': {'open': 1, 'forest/mtn': 0, 'urban': 0, 'durban': -1},
  '1': {'open': 0, 'forest/mtn': 0, 'urban': -1, 'durban': -1},
  '0': {'open': -1, 'forest/mtn': -1, 'urban': -1, 'durban': -2},
  '-1': {'open': -1, 'forest/mtn': -1, 'urban': -2, 'durban': -3},
  '-2': {'open': -2, 'forest/mtn': -2, 'urban': -3, 'durban': -3},
  '-3': {'open': -3, 'forest/mtn': -3, 'urban': -3, 'durban': -3},
  '-4': {'open': -3, 'forest/mtn': -3, 'urban': -4, 'durban': -4},
}                
 
  */ 