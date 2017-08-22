'use strict';

const User = require('../model.js');

async function getUsers () {
    try {
        this.body = await User.getAll();
    } catch (err) {
        console.log(err);
        this.status = 500;
        this.body = {message: 'Get users error'};
    }
}

module.exports = getUsers;