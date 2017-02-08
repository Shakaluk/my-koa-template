'use strict';

const User = require('../model.js');

function *getUsers () {
    let result;

    try {
        result = yield User.getAll();
    } catch (error) {
        console.error(error);
        this.status = 500;
        this.body = {message: 'Get users error'};
    }

    this.body = result;
}

module.exports = getUsers;