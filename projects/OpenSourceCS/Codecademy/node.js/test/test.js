var assert = require("assert");
var Adjudicate = require('..\\OWS_Adjudicator_v18');

describe('Dice Roller', () => {
  const minValue = 1;
  const dieSides = [4, 6, 8, 10, 12, 16, 20];
  const testArray = (dice) => {
    const resultArray = [];
    for (let i = 0; i < 5; i++) {
      resultArray.push(Adjudicate.dieRoller(dice));
    }
    return resultArray;
  };
  describe('only allows specific sided dice', () => {
    it('returns error if outside paramaters', () => {
      assert.throws(() => testArray(0), TypeError)
    });
  });
  for (let i = 0; i < dieSides.length; i++) {
    describe(`on a d${dieSides[i]}`, () => {
      const maxValue = dieSides[i];
      const results1 = testArray(maxValue);
      const results2 = testArray(maxValue);
      it('returns random results', () => {
        assert.notDeepStrictEqual(results1, results2);
      });
      it(`returns values between 1 and ${dieSides[i]}`, () => {
        const results1_check = results1.filter(x => x < 1 || x > maxValue);
        const results2_check = results2.filter(x => x < 1 || x > maxValue);
        assert.ok((results1_check.length === 0) && (results2_check.length === 0), 'Values were out of range.');
      })
    });
  }; 
});

describe('Dice Promotion', () => {
  describe('of all dice', () => {
    it('that are the same and not a d20', () => {
      const startPool = {'4': 3};
      const promoPool = Adjudicate.promoteAll(startPool);
      const expectPool = {'6': 3};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('and does not promote d20s', () => {
      const startPool = {'20': 3};
      const promoPool = Adjudicate.promoteAll(startPool);
      const expectPool = {'20': 3}
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('that are different and not a d20', () => {
      const startPool = {'4': 2, '8': 3, '16': 1};
      const promoPool = Adjudicate.promoteAll(startPool);
      const expectPool = {'6': 2, '10': 3, '20': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('that are different and includes a d20', () => {
      const startPool = {'8': 2, '12': 3, '20': 1};
      const promoPool = Adjudicate.promoteAll(startPool);
      const expectPool = {'10': 2, '16': 3, '20': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    })
  });
  describe('of one die', () => {
    it('and promotes a single die pool properly', () => {
      const startPool = {'4': 1};
      const promoPool = Adjudicate.promoteOne(startPool);
      const expectPool = {'6': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('and promotes a multiple dice pool properly', () => {
      const startPool = {'10': 2, '12': 1};
      const promoPool = Adjudicate.promoteOne(startPool);
      const expectPool = {'10': 1, '12': 2};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('and it does not promote a d20', () => {
      const startPool = {'20': 1};
      const promoPool = Adjudicate.promoteOne(startPool);
      const expectPool = {'20': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    })
  });
  describe('combines all dice', () => {
    it('into one of the next highest die', () => {
      const startPool = {'8': 1, '10': 2};
      const promoPool = Adjudicate.allForOne(startPool);
      const expectPool = {'12': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('into a single die but ignores d20s', () => {
      const startPool = {'8': 1, '10': 2, '20': 1};
      const promoPool = Adjudicate.allForOne(startPool);
      const expectPool = {'20': 2};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('but only if more than one die is in the pool', () => {
      const startPool = {'6': 1};
      const promoPool = Adjudicate.allForOne(startPool);
      const expectPool = {'6': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('but never returns more than a d16 for ASW', () => {
      const startPool = {'8': 1, '10': 2, '16': 1};
      const promoPool = Adjudicate.allForOne(startPool, true);
      const expectPool = {'16': 2}
      assert.deepStrictEqual(promoPool, expectPool);
    })
  })
});

describe('Dice Demotion', () => {
  describe('of all dice', () => {
    it('that are the same and not a d4', () => {
      const startPool = {'8': 3};
      const promoPool = Adjudicate.demoteAll(startPool);
      const expectPool = {'6': 3};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('and removes d4s', () => {
      const startPool = {'4': 3};
      const promoPool = Adjudicate.demoteAll(startPool);
      const expectPool = {};
      assert.deepStrictEqual(promoPool, expectPool)
    });
    it('that are different and not a d4', () => {
      const startPool = {'8': 3, '10': 1, '20': 2};
      const promoPool = Adjudicate.demoteAll(startPool);
      const expectPool = {'6': 3, '8': 1, '16': 2};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('that are dfifferent and removes d4s', () => {
      const startPool = {'4': 3, '10': 1, '20': 2};
      const promoPool = Adjudicate.demoteAll(startPool);
      const expectPool = {'8': 1, '16': 2};
      assert.deepStrictEqual(promoPool, expectPool);
    });
  });
  describe('of one die', () => {
    it('and demotes a single die pool properly', () => {
      const startPool = {'8': 1};
      const promoPool = Adjudicate.demoteOne(startPool);
      const expectPool = {'6': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('and demotes a multiple dice pool properly', () => {
      const startPool = {'10': 2, '12': 1};
      const promoPool = Adjudicate.demoteOne(startPool);
      const expectPool = {'10': 3};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('and it removes a d4 if it is the only one', () => {
      const startPool = {'4': 1};
      const promoPool = Adjudicate.demoteOne(startPool);
      const expectPool = {};
      assert.deepStrictEqual(promoPool, expectPool);
    });
    it('and it removes only a single d4 if more than one', () => {
      const startPool = {'4': 2};
      const promoPool = Adjudicate.demoteOne(startPool);
      const expectPool = {'4': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    })
  });
})