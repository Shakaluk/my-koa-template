'use strict';

const crypto = require('crypto');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../../../config');
const User = require('../user/model');

const localOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session      : false
};
const jwtOptions = {
    ignoreExpiration: true,
    jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey     : config.jwt.secret
};

const localStrategy = new LocalStrategy(localOptions, async function (email, password, done) {
    let user;
    let passwordHash;

    try {
        user = await User.getOne({email});
    } catch (err) {
        return done(err);
    }

    passwordHash = crypto.createHmac('sha256', config.cryptoSecret).update(password).digest('hex');

    if (!user) {
        return done(null, false, {message: 'Email does not exist'});
    }

    if (!passwordHash || user.password !== passwordHash) {
        return done(null, false, {message: 'Wrong password'});
    }

    if (user.status === 'blocked') {
        return done(null, false, {message: 'User blocked'});
    }

    return done(null, {
        _id : user._id,
        name: user.name,
        role: user.role
    });
});

const jwtStrategy = new JwtStrategy(jwtOptions, async function (payload, done) {
    if (payload.exp > Math.floor(Date.now() / 1000)) {
        return done(null, payload);
    } else {
        return done(null, payload, {message: 'Token expired'});
    }
});

passport.use(localStrategy);

passport.use(jwtStrategy);

module.exports = passport;