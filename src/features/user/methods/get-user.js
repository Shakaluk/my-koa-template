'use strict';

const User = require('../model.js');

async function getUser () {
    const id = this.params.id;

    try {
        this.body = await User.get(id);
    } catch (err) {
        console.log(err);
        this.status = 500;
        this.body = {message: 'Get user error'};
    }
}

module.exports = getUser;