'use strict';

const mongoose = require('mongoose');

const Schema = require('./mongoose-schema');

const Model = mongoose.model('User', Schema);

const User = {
    Origin: Model,

    create (data) {
        return new Model(data).save();
    },

    count () {
        return Model.count();
    },

    getAll (options) {
        let sort = {};

        if (options.sort) {
            sort[options.sort] = options.order;
        } else {
            sort.createdAt = options.order;
        }

        return Model.find().sort(sort).skip(options.skip).limit(options.limit);
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