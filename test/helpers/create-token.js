'use strict';

const jwt = require('jsonwebtoken');

const config = require('../../config');

module.exports = function (role) {
    const payload = {
        id  : '595b6a53f7909c41f0e2897b',
        role: role
    };

    const token = jwt.sign(payload, config.jwt.secret, {expiresIn: config.jwt.expiresIn});

    return `Bearer ${token}`;
};
