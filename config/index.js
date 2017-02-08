'use strict';

const environment = process.env.NODE_ENV || 'development';

const env = require('./' + environment);
const constants = require('./constants');

module.exports = Object.assign({}, env, constants);