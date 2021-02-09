const path = require('path');

module.exports = {
  entry: ['./src/index.js','./src/tabOne.js','./src/tabTwo.js','./src/tabThree.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};