'use strict';

const User = {

    create: function (data) {
        // save to db
        return {name: data.name, email: data.email};
    },

    getAll: function () {
        return [{name: 'Mark', email: 'mark@mail.com'}];
    }
};

module.exports = User;