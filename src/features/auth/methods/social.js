'use strict';

const passport = require('koa-passport');

async function socialAuth (ctx, next) {
    const name = ctx.params.name;

    await passport.authenticate(name, {scope: 'email'})(ctx, next);
}

module.exports = socialAuth;