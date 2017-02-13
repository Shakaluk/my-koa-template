'use strict';

const User = {

    create: function (data) {
        // save to db
        return {_id: '23434234234', name: data.name, email: data.email};
    },

    getAll: function () {
        // get from db
        return [{_id: '34566753535546', name: 'Mark', email: 'mark@mail.com'}];
    },

    get: function (id) {
        // get from db
        return {_id: '34566753535546', name: 'Mark', email: 'mark@mail.com'};
    },

    update: function (id, body) {
        // update in db
        return Object.assign({_id: id}, body);
    },

    delete: function (id) {
        // delete from db
        return {status: 'ok'};
    }
};

module.exports = User;