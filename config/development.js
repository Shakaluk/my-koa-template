'use strict';

process.env.PORT = 3000;

const numCPUs = require('os').cpus().length;

const workers = 1;

const numWorkers = workers || numCPUs;

module.exports = {
    numWorkers
};