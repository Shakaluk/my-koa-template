'use strict';

const cluster = require('cluster');

const config = require('../config');
const init = require('./init');

const numWorkers = config.numWorkers;

module.exports = (function () {
    // setup initial data
    (async function () {
        try {
            await init();
        } catch (err) {
            console.log(err);
        }
    })();

    console.info('Master cluster setting up ' + numWorkers + ' workers...');

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.info('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.info('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.info('Starting a new worker');
        cluster.fork();
    });
})();