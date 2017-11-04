'use strict';

const passport = require('../passport');

async function isAuthenticated (ctx, next) {
    const authorization = ctx.header.authorization;

    if (!authorization) {
        ctx.status = 401;
        ctx.body = {message: 'No auth token'};
        return;
    }

    await passport.authenticate('jwt', async function (err, user, data) {
        if (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err;
            return;
        }

        if (!user) {
            ctx.status = 401;
            ctx.body = {message: 'Invalid token'};
            return;
        }

        if (data) {
            ctx.status = 401;
            ctx.body = data;
            return;
        }

        ctx.state = {user};

        return next();
    })(ctx, next);
}

module.exports = isAuthenticated;