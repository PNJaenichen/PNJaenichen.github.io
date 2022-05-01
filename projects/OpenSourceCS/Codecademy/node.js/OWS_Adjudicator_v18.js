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
    const total_dice = Object.values(dice).reduce()
    return dice;
  }
};

module.exports = Adjudicate;