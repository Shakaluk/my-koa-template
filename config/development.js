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

const cryptoSecret = '1hPfST35lvX4GvcDWbp3BormE1vFyoc9';

const jwt = {
    secret   : 'somesecretkey',
    expiresIn: '15m'
};

const defaultAdmin = {
    name : 'Super Admin',
    email: 'firstadmin@mail.com'
};

module.exports = {
    cryptoSecret,
    defaultAdmin,
    numWorkers,
    mongoUri,
    user,
    jwt
};