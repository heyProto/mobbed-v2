const webpack = require('webpack');
const card = require('./webpack.config.card.js');
const about = require('./webpack.config.about.js');
const home = require('./webpack.config.home.js');


module.exports = [
  card, about, home
];
