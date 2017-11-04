'use strict';

const clearDatabase = require('./helpers/clear-database');

before(async function () {
    require('../src/worker');

    try {
        await clearDatabase();
    } catch (err) {
        console.log(err);
    }
});

after(function () {
    // console.log('after');
});

beforeEach(function () {
    // console.log('before each');
});

afterEach(function () {
    // console.log('after each');
});