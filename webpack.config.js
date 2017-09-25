const webpack = require('webpack');
const card = require('./webpack.config.card.js');
const hate_crime = require('./webpack.config.hatecrime.js');

module.exports = [
  card,
  hate_crime
];
