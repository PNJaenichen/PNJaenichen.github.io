const Adjudicate = {
  dieRoller(sides) {
    if ([4, 6, 8, 10, 12, 16, 20].includes(sides)) {
      return Math.floor(Math.random() * sides) + 1;
    } else {
      throw new TypeError('No die with that number of sides');
    }
  },
  
  promoteAll(dice) {
    if (dice['16']) {
      if(dice['20']) {
        dice['20'] += dice['16'];
      } else {
        dice['20'] = dice['16'];
      }
      delete dice['16'];
    } 
    if (dice['12']) {
      dice['16'] = dice['12'];
      delete dice['12'];
    }
    if (dice['10']) {
      dice['12'] = dice['10'];
      delete dice['12'];
    }
    if (dice['8']) {
      dice['10'] = dice['8'];
      delete dice['8'];
    }
    if (dice['6']) {
      dice['8'] = dice['6'];
      delete dice['6'];
    }
    if (dice['4']) {
      dice['6'] = dice['4'];
      delete dice['4'];
    }
    return dice;
  },

  promoteOne(dice) {
    if (dice['4']) {
      dice['6'] ? dice['6'] += 1 : dice['6'] = 1;
      dice['4'] > 1 ? dice['4'] -= 1 : delete dice['4'];
    } else if (dice['6']) {
      dice['8'] ? dice['8'] += 1 : dice['8'] = 1;
      dice['6'] > 1 ? dice['6'] -= 1 : delete dice['6'];
    } else if (dice['8']) {
      dice['10'] ? dice['10'] += 1 : dice['10'] = 1;
      dice['8'] > 1 ? dice['8'] -= 1 : delete dice['8'];
    } else if (dice['10']) {
      dice['12'] ? dice['12'] += 1 : dice['12'] = 1;
      dice['10'] > 1 ? dice['10'] -= 1 : delete dice['10'];
    } else if (dice['12']) {
      dice['16'] ? dice['16'] += 1 : dice['16'] = 1;
      dice['12'] > 1 ? dice['12'] -= 1 : delete dice['12'];
    } else if (dice['16']) {
      dice['20'] ? dice['20'] += 1 : dice['20'] = 1;
      dice['16'] > 1 ? dice['16'] -= 1 : delete dice['16'];
    }
    return dice;
  },

  demoteAll(dice) {
    if (dice['4']) {
      delete dice['4'];
    }
    if (dice['6']) {
      dice['4'] = dice['6'];
      delete dice['6'];
    }
    if (dice['8']) {
      dice['6'] = dice['8'];
      delete dice['8'];
    }
    if (dice['10']) {
      dice['8'] = dice['10'];
      delete dice['10'];
    }
    if (dice['12']) {
      dice['10'] = dice['12'];
      delete dice['12'];
    }
    if (dice['16']) {
      dice['12'] = dice['16'];
      delete dice['16'];
    }
    if (dice['20']) {
      dice['16'] = dice['20'];
      delete dice['20'];
    }
    return dice;
  },

  demoteOne(dice) {
    if (dice['20']) {
      dice['16'] ? dice['16'] += 1 : dice['16'] = 1;
      dice['20'] > 1 ? dice['20'] -= 1 : delete dice['20'];
    } else if (dice['16']) {
      dice['12'] ? dice['12'] += 1 : dice['12'] = 1;
      dice['16'] > 1 ? dice['16'] -= 1 : delete dice['16'];
    } else if (dice['12']) {
      dice['10'] ? dice['10'] += 1 : dice['10'] = 1;
      dice['12'] > 1 ? dice['12'] -= 1 : delete dice['12'];
    } else if (dice['10']) {
      dice['8'] ? dice['8'] += 1 : dice['8'] = 1;
      dice['10'] > 1 ? dice['10'] -= 1 : delete dice['10'];
    } else if (dice['8']) {
      dice['6'] ? dice['6'] += 1 : dice['6'] = 1;
      dice['8'] > 1 ? dice['8'] -= 1 : delete dice['8'];
    } else if (dice['6']) {
      dice['4'] ? dice['4'] += 1 : dice['4'] = 1;
      dice['6'] > 1 ? dice['6'] -= 1 : delete dice['6'];
    } else if (dice['4']) {
      dice['4'] > 1 ? dice['4'] -= 1 : delete dice['4'];
    }
    return dice;
  },

  allForOne(dice, ASW = false) {
    const total_dice = Object.values(dice).reduce((prev, curr) => prev + curr, 0);
    const die_sides = Object.keys(dice).map(die => parseInt(die));
    const high_side = Math.max(...die_sides);
    let new_dice = {};
    if (total_dice > 1) {
      if (high_side === 20 && total_dice > 2) {
        new_dice['20'] = dice['20'] + 1;
      } else {
        switch (high_side) {
          case 16:
            if (ASW) {
              new_dice['16'] = dice['16'] + 1;
            } else {
              new_dice['20'] = 1;
            }
            break;
          case 12:
            new_dice['16'] = 1;
            break;
          default:
            new_dice[(high_side + 2).toString()] = 1;
            break;
        }
      }
    } else {
      new_dice = dice;
    }
    return new_dice;
  }

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


  Lvl of Supp    Open    Forest/Mtn    Urban     Dense Urban
     >= +7       3 P        3 P         3 P           2 P
       +6        3 P        2 P         2 P           2 P
       +5        2 P        2 P         2 P           1 P
       +4        2 P        2 P         1 P            -
       +3        1 P        1 P         1 P            -
       +2        1 P         -           -            1 D
       +1         -          -          1 D           1 D
       0         1 D        1 D         1 D           2 D
       -1        1 D        1 D         2 D           3 D
       -2        2 D        2 D         3 D           3 D
       -3        3 D        3 D         3 D           3 D<
     <= -4       3 D        3 D         4 D           4 D
     
  */        
};

module.exports = Adjudicate;