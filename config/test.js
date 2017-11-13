'use strict';

process.env.PORT = 3000;
process.env.HOST = 'localhost';

const numWorkers = 1;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test-my-template';

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

const facebookOptions = {
    clientID     : '268098283614841',
    clientSecret : '559c4a31781983a05ed0844f98197b4a',
    callbackURL  : 'http://localhost:3000/api/auth/facebook/callback',
    profileFields: ['first_name', 'last_name', 'email']
};

const googleOptions = {
    clientID     : '51589288052-o12j96k0g6b90542s4q3alk3riojka37.apps.googleusercontent.com',
    clientSecret : '35gcsIRs0qa1oEj-V2ER5MUv',
    callbackURL  : 'http://localhost:3000/api/auth/google/callback',
};

module.exports = {
    facebookOptions,
    googleOptions,
    cryptoSecret,
    defaultAdmin,
    numWorkers,
    mongoUri,
    user,
    jwt
};