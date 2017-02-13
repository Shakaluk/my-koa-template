'use strict';

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : process.env.NODE_ENV = 'development';

const config = require('./' + env);

module.exports = config;