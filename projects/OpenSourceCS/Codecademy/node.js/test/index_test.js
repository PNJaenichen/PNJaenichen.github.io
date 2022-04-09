var assert = require("assert");
var Calculate =  require('../index.js')

describe('Calculate', () => {
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
});