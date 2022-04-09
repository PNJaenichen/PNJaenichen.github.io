var assert = require("assert");
var Adjudicate = require('..\\OWS_Adjudicator_v18');

describe('Dice Roller', () => {
  const minValue = 1;
  const testArray = (dice) => {
    const resultArray = [];
    for (let i = 0; i < 5; i++) {
      resultArray.push(Adjudicate.dieRoller(dice));
    }
    return resultArray;
  };
  describe('on a d4', () => {
    const maxValue = 4;
    const results1 = testArray(maxValue);
    const results2 = testArray(maxValue);
    it('returns random results', () => {
      assert.notDeepStrictEqual(results1, results2);
    });
    it('returns values between 1 and 4', () => {
      const results1_check = results1.filter(x => x < 1 || x > maxValue);
      const results2_check = results2.filter(x => x < 1 || x > maxValue);
      assert.ok((results1_check.length === 0) && (results2_check.length === 0), 'Values were out of range.');
    })
  });
})

/* describe('Calculate', () => {
  describe('.factorial', () => {
    it('returns 120 with input of 5', () => {
      const expectedResult = 120;
      const inputValue = 5;

      const result = Calculate.factorial(inputValue);

      assert.strictEqual(result, expectedResult);
    });
    it('returns 6 with input of 3', () => {
      const expectedResult = 6;
      const inputValue = 3;

      const result = Calculate.factorial(inputValue);
      
      assert.strictEqual(result, expectedResult);
    });
    it('results 1 with input of 0', () => {
      const expectedResult = 1;
      const inputValue = 0;

      const result = Calculate.factorial(inputValue);

      assert.strictEqual(result, expectedResult);
    });
  });
}); */