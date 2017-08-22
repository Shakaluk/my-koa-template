'use strict';

const User = require('../model.js');

async function deleteUser () {
    const id = this.params.id;

    try {
        this.body = await User.delete(id);
    } catch (err) {
        console.log(err);
        this.status = 500;
        this.body = {message: 'Delete user error'};
    }
}

module.exports = deleteUser;