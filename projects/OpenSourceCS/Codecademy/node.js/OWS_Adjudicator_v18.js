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
    return {'6': 1};
  }
};

module.exports = Adjudicate;