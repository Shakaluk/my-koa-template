'use strict';

const config = require('../../config/test');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
const connection = mongoose.createConnection(config.mongoUri);

module.exports = async function () {
    try {
        data = await connection.db.dropDatabase();
    } catch (err) {
        return err;
    }

    connection.close();
};
