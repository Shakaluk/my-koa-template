'use strict';

const User = require('../model.js');

function *createUser () {
    let result;

    // some validation need

    try {
        result = yield User.create(this.request.body);
    } catch (error) {
        console.error(error);
        this.status = 500;
        this.body = {message: 'Create user error'};
    }

    this.body = result;
}

module.exports = createUser;