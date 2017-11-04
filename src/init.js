'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = require('./features/user/mongoose-schema');
const UserModel = mongoose.model('User', UserSchema);
const CONSTANTS = require('../constants');
const config = require('../config');

mongoose.Promise = Promise;
mongoose.connect(config.mongoUri, {
    useMongoClient: true
});

async function init () {
    try {
        await checkAdmin();
    } catch (err) {
        console.log('Creating admin error', err);
        return err;
    }
}

async function checkAdmin () {
    let defaultAdmin = config.defaultAdmin;
    let admin;

    defaultAdmin.role = CONSTANTS.USER_ROLES.ADMIN;

    try {
        admin = await UserModel.findOne({role: CONSTANTS.USER_ROLES.ADMIN});
    } catch (err) {
        console.log(err);
    }

    defaultAdmin.password = crypto.createHmac('sha256', config.cryptoSecret).update(config.user.defaultPassword).digest('hex');

    if (!admin) {
        try {
            UserModel.create(defaultAdmin);
        } catch (err) {
            console.log(err);
        }

        console.log('Default admin created');
    }
}

module.exports = init;