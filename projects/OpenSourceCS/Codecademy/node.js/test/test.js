var assert = require("assert");
var { dieRoller, promoteAll, demoteAll, promoteOne, demoteOne, allForOne, poolAdjust, surfaceStrike } = require('..\\OWS_Adjudicator_v18');

describe('Dice Roller creates random numbers', () => {
  describe('that stay within 1', () => {
    const tests = [4, 6, 8, 10, 12, 16, 20];
    tests.forEach(sides => {
      const dieResults = [];
      for (let i = 0; i < 10; i++) {
        dieResults.push(dieRoller(sides));
      }
      it(`and a ${sides} on a d${sides}`, () => {
        assert.ok(dieResults.filter(x => x > sides).length === 0);
      })
    })
  })
});
 
describe('Dice Pool Adjustments', () => {
  describe('promotes all dice appropriately', () => {
    it('when the dice are all the same value', () => {
      const startPool = {'6': 2};
      const adjPool = promoteAll(startPool)
      const expectedPool = {'8': 2};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('when the dice are all different values', () => {
      const startPool = {'6': 2, '8': 3, '10': 1};
      const adjPool = promoteAll(startPool)
      const expectedPool = {'8': 2, '10': 3, '12': 1};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
    it('when a d20 in the pool', () => {
      const startPool = {'6': 2, '10': 3, '16': 1, '20': 1};
      const adjPool = promoteAll(startPool)
      const expectedPool = {'8': 2, '12': 3, '20': 2};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
  });
  describe('promotes a single die appropriately', () => {
    it('when the dice are all the same value', () => {
      const startPool = {'6': 2};
      const adjPool = promoteOne(startPool);
      const expectedPool = {'6': 1, '8': 1};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('when the dice are all different values', () => {
      const startPool = {'6': 2, '8': 3, '10': 1};
      const adjPool = promoteOne(startPool)
      const expectedPool = {'6': 2, '8': 3, '12': 1};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
    it('when a d20 in the pool', () => {
      const startPool = {'6': 2, '10': 3, '16': 1, '20': 1};
      const adjPool = promoteOne(startPool)
      const expectedPool = {'6': 2, '10': 3, '20': 2};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
  });
  describe('demotes all dice appropriately', () => {
    it('when the dice are all the same value', () => {
      const startPool = {'6': 2};
      const adjPool = demoteAll(startPool)
      const expectedPool = {'4': 2};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('when the dice are all different values', () => {
      const startPool = {'6': 2, '8': 3, '10': 1};
      const adjPool = demoteAll(startPool)
      const expectedPool = {'4': 2, '6': 3, '8': 1};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
    it('removes any d4s from the pool', () => {
      const startPool = {'4': 2, '8': 3, '12': 1};
      const adjPool = demoteAll(startPool)
      const expectedPool = {'6': 3, '10': 1};
      assert.deepStrictEqual(adjPool, expectedPool)
    })
  });
  describe('demotes a single die appropriately', () => {
    it('when the dice are all the same value', () => {
      const startPool = {'6': 2};
      const adjPool = demoteOne(startPool);
      const expectedPool = {'4': 1, '6': 1};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('when the dice are all different values', () => {
      const startPool = {'6': 2, '8': 3, '10': 1};
      const adjPool = demoteOne(startPool)
      const expectedPool = {'6': 2, '8': 4};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
    it('removes a d4 from the pool', () => {
      const startPool = {'4': 2};
      const adjPool = demoteOne(startPool)
      const expectedPool = {'4': 1};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
  });
  describe('promotes multiple dice into a single higher die', () => {
    it('when the dice are all the same value', () => {
      const startPool = {'6': 2};
      const adjPool = allForOne(startPool);
      const expectedPool = {'8': 1};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('when the dice are all different valuees', () => {
      const startPool = {'6': 2, '8': 3, '10': 1};
      const adjPool = allForOne(startPool);
      const expectedPool  = {'12': 1};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('when a d20 present in the dice pool', () => {
      const startPool = {'6': 2, '10': 3, '16': 1, '20': 1};
      const adjPool = allForOne(startPool)
      const expectedPool = {'20': 2};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
    it('when only one other die in the pool with a d20', () => {
      const startPool = {'16': 1, '20': 1};
      const adjPool = allForOne(startPool);
      const expectedPool = {'16': 1, '20': 1};
      assert.deepStrictEqual(adjPool, expectedPool);
    })
  });
  describe('adjusts based on different combinations of promos/demos', () => {
    it('outputs properly with only promotions', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 0;
      const promotions = 2;
      const demotions = 0;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'12': 2, '16': 3, '20': 2};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
    it('outputs properly with only demotions', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 0;
      const promotions = 0;
      const demotions = 2;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'4': 2, '6': 3, '8': 2};
      assert.deepStrictEqual(adjPool, expectedPool)
    });
    it('outputs properly with demotions but more promotions', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 0;
      const promotions = 2;
      const demotions = 1;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'10': 2, '12': 3, '16': 2};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('outputs properly with promotions but more demotions', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 0;
      const promotions = 1;
      const demotions = 2;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'6': 2, '8': 3, '10': 2};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('outputs properly if same number of promotions and demotions', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 0;
      const promotions = 2;
      const demotions = 2;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'8': 2, '10': 3, '12': 2};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('outputs properly if only single demotions', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = -2;
      const promotions = 0;
      const demotions = 0;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'8': 2, '10': 5};
      assert.deepStrictEqual(adjPool, expectedPool); 
    });
    it('outputs properly if only single promotions', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 2;
      const promotions = 0;
      const demotions = 0;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'8': 2, '10': 3, '12': 1, '20': 1};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('outputs properly if positive promo/demo and singles', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 2;
      const promotions = 2;
      const demotions = 0;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'12': 2, '16': 1, '20': 4};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('outputs properly if positive promo/demo and negative singles', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = -2;
      const promotions = 2;
      const demotions = 0;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'12': 2, '16': 5};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('outputs properly if negative promo/demo and singles', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = -2;
      const promotions = 0;
      const demotions = 2;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'4': 2, '6': 5};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
    it('outputs properly if negative promo/demo and positive singles', () => {
      const inbound_missiles = {'8': 2, '10': 3, '12': 2};
      const singles = 2;
      const promotions = 0;
      const demotions = 2;
      const adjPool = poolAdjust(inbound_missiles, singles, promotions, demotions)
      const expectedPool = {'4': 2, '6': 3, '8': 1, '12': 1};
      assert.deepStrictEqual(adjPool, expectedPool);
    });
  });
});

describe('surfaceStrike creates results results', () => {
  describe('that are correct for,', () => {
    const inbound_missiles = [12, 12, 10, 10, 10, 8, 8];
    it('more inbound missiles than defensive missiles', () => {
      const defensive_missiles = [6, 6, 6, 5]
      const results = surfaceStrike(inbound_missiles, 4, defensive_missiles);
      assert.ok(results.length === 7);
    });
    it('equal number of inbound missiles and defensive missiles', () => {
      const defensive_missiles = [6, 6, 6, 6, 5, 5, 5];
      const results = surfaceStrike(inbound_missiles, 4, defensive_missiles);
      assert.ok(results.length === 7);
    });
    it('less inbound missiles than defensive missiles', () => {
      const defensive_missiles = [6, 6, 6, 6, 6, 5, 5, 5, 5];
      const results = surfaceStrike(inbound_missiles, 4, defensive_missiles);
      assert.ok(results.length === 7);
    });
    it('with no inbound missiles', () => {
      const defensive_missiles = [];
      const results = surfaceStrike(inbound_missiles, 4, defensive_missiles);
      assert.ok(results.length === 7);
    })
  })
});