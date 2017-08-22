'use strict';

const mongoose = require('mongoose');

const Schema = require('./mongoose-schema');

const Model = mongoose.model('User', Schema);

const User = {
    Origin: Model,

    create (data) {
        return new Model(data).save();
    },

    getAll () {
        return Model.find();
    },

    get (id) {
        return Model.findById(id);
    },

    update (id, data) {
        return Model.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    },

    delete (id) {
        return Model.findByIdAndRemove(id);
    }
};

module.exports = User;