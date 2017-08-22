'use strict';

process.env.PORT = 3000;
process.env.HOST = 'localhost';

const numWorkers = 1;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test-my-template';

const user = {
    defaultPassword: '12345678'
};

module.exports = {
    numWorkers,
    mongoUri,
    user
};