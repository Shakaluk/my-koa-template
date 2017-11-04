'use strict';

const CONSTANTS = require('../../../../constants');

async function isAdmin (ctx, next) {
    if (ctx && ctx.state && ctx.state.user && ctx.state.user.role === CONSTANTS.USER_ROLES.ADMIN) {
        return next();
    }

    ctx.status = 401;
    ctx.body = {message: 'Permission denied'};
}

module.exports = isAdmin;