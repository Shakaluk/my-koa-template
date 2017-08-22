'use strict';

process.env.PORT = 3000;
process.env.HOST = 'localhost';

const numCPUs = require('os').cpus().length;

const workers = 1;

const numWorkers = workers || numCPUs;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/my-template';

const user = {
    defaultPassword: '12345678'
};

module.exports = {
    numWorkers,
    mongoUri,
    user
};