'use strict';

const crypto = require('crypto');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
        const data = {
            type   : 'email',
            message: 'Email does not exist'
        };

        return done(null, false, data);
    }

    if (!passwordHash || user.password !== passwordHash) {
        const data = {
            type   : 'password',
            message: 'Wrong password'
        };

        return done(null, false, data);
    }

    if (user.status === 'blocked') {
        const data = {
            type   : 'status',
            message: 'User blocked'
        };

        return done(null, false, data);
    }

    return done(null, {
        id  : user._id,
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

const facebookStrategy = new FacebookStrategy(config.facebookOptions, async function (req, token, refreshToken, profile, done) {
    let user;

    try {
        user = await User.getOne({email: profile.emails[0].value});
    } catch (err) {
        return done(err);
    }

    if (!user) {
        return done(null, null, {message: 'Email does not exist'});
    } else {
        return done(null, {
            _id : user._id,
            name: user.name,
            role: user.role
        });
    }
});

const googleStrategy = new GoogleStrategy(config.googleOptions, async function (token, refreshToken, profile, done) {
    let user;

    try {
        user = await User.getOne({email: profile.emails[0].value});
    } catch (err) {
        return done(err);
    }

    if (!user) {
        return done(null, null, {message: 'Email does not exist'});
    } else {
        return done(null, {
            _id : user._id,
            name: user.name,
            role: user.role
        });
    }
});

passport.use(localStrategy);

passport.use(jwtStrategy);

passport.use(facebookStrategy);

passport.use(googleStrategy);

module.exports = passport;