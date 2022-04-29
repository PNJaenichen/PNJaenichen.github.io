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
    it('and promotes properly', () => {
      const startPool = {'4': 1};
      const promoPool = Adjudicate.promoteOne(startPool);
      const expectPool = {'6': 1};
      assert.deepStrictEqual(promoPool, expectPool);
    })
  });
});
