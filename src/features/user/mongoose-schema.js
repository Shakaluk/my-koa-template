'use strict';

const mongoose = require('mongoose');

const CONSTANTS = require('../../../constants');

const Schema = new mongoose.Schema({

    name: {
        type    : String,
        required: true,
        trim    : true
    },

    email: {
        type     : String,
        required : true,
        unique   : true,
        trim     : true,
        lowercase: true
    },

    password: {
        type  : String,
        trim  : true,
        select: false
    },

    role: {
        type   : String,
        enum   : [CONSTANTS.USER_ROLES.ADMIN, CONSTANTS.USER_ROLES.USER],
        default: CONSTANTS.USER_ROLES.USER
    },

    status: {
        type   : String,
        enum   : [CONSTANTS.STATUS.ACTIVE, CONSTANTS.STATUS.DISABLED],
        default: CONSTANTS.STATUS.ACTIVE
    },

    createdAt: {
        type   : Date,
        default: Date.now
    },

    updatedAt: {
        type   : Date,
        default: Date.now
    }
}, {
    versionKey: false,
    collection: 'Users'
});

module.exports = Schema;