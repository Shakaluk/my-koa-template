'use strict';

const expect = require('chai').expect;
const Faker = require('faker');

const login = require('./login');
const passport = require('../passport');
const CONSTANTS = require('../../../../constants');

describe('login method', function () {
    let defaultUserLogin;
    let defaultUser;
    let notValidUserLogin;

    before(function () {
        defaultUserLogin = {
            email   : Faker.internet.email(),
            password: Faker.internet.password()
        };

        defaultUser = {
            id  : '595b6a53f7909c41f0e2897b',
            role: CONSTANTS.USER_ROLES.USER
        };

        notValidUserLogin = {
            email   : Faker.name.firstName(),
            password: Faker.internet.password()
        };
    });

    it('should create token', async function () {
        const ctx = {
            request: {
                body: defaultUserLogin
            }
        };

        passport.authenticate = function (strategy, callback) {
            return async function () {
                try {
                    await callback(null, defaultUser);
                } catch (err) {
                    console.log(err);
                }
            };
        };

        try {
            await login(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        expect(ctx.body.token).to.exist;
        expect(ctx.body.token).to.be.an('string');
        expect(ctx.body.user).to.exist;
        expect(ctx.body.user).to.be.an('object');
        expect(ctx.body.user.id).to.exist;
        expect(ctx.body.user.id).eql(defaultUser.id);
    });

    it('should not create token with invalid login data', async function () {
        const ctx = {
            request: {
                body: notValidUserLogin
            }
        };

        try {
            await login(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        expect(ctx.body.token).to.not.exist;
        expect(ctx.body.message).to.exist;
        expect(ctx.body.message).eql('Validate data error');
    });

    it('should not create token for blocked user', async function () {
        const ctx = {
            request: {
                body: defaultUserLogin
            }
        };

        passport.authenticate = function (strategy, callback) {
            return async function () {
                try {
                    await callback(null, false, {message: 'User blocked'});
                } catch (err) {
                    console.log(err);
                }
            };
        };

        try {
            await login(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        expect(ctx.body.token).to.not.exist;
        expect(ctx.body.message).to.exist;
        expect(ctx.body.message).eql('User blocked');
    });

    it('should log authentication error', async function () {
        const error = new Error('Invalid data');
        const ctx = {
            request: {
                body: defaultUserLogin
            }
        };

        passport.authenticate = function (strategy, callback) {
            return async function () {
                try {
                    await callback(error);
                } catch (err) {
                    console.log(err);
                }
            };
        };

        try {
            await login(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).eql(error);
    });
});