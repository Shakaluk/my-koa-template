'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Faker = require('faker');

const refresh = require('./refresh');
const passport = require('../passport');
const User = require('../../user/model');
const CONSTANTS = require('../../../../constants');

describe('refresh method', function () {
    let defaultUserToken;
    let notValidUserToken;
    let defaultUser;

    before(function () {
        defaultUserToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjQyODE4LCJleHAiOjE1MDk2NDM3MTh9.yMXkuLOpHJkKy514gJbrU6eHQDFDL4hxEy8goDdf-9U';
        notValidUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjQyODE4LCJleHAiOjE1MDk2NDM3MTh9.yMXkuLOpHJkKy514gJbrU6eHQDFDL4hxEy8goDdf-9U';

        defaultUser = {
            id  : '595b6a53f7909c41f0e2897b',
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            role: CONSTANTS.USER_ROLES.USER
        };
    });

    it('should refresh token', async function () {
        const getStub = this.sandbox.stub(User, 'get').returnsWithResolve({});

        const ctx = {
            header: {
                authorization: defaultUserToken
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
            await refresh(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        expect(ctx.body.token).to.exist;
        expect(ctx.body.token).to.be.an('string');
        sinon.assert.calledOnce(getStub);
    });

    it('should return unauthorized for user with no token provided', async function (done) {
        const getSpy = this.sandbox.spy(User, 'get');
        const nextStub = this.sandbox.stub().returnsWithResolve(done());

        const ctx = {
            header: {}
        };

        try {
            await refresh(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        expect(ctx.body.message).to.exist;
        expect(ctx.body.message).eql('No token');
        sinon.assert.notCalled(getSpy);
    });

    it('should return unauthorized for invalid token', async function () {
        const ctx = {
            header: {
                authorization: notValidUserToken
            }
        };

        passport.authenticate = function (strategy, callback) {
            return async function () {
                try {
                    await callback();
                } catch (err) {
                    console.log(err);
                }
            };
        };

        try {
            await refresh(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body.message).to.exist;
        expect(ctx.body.message).eql('Invalid token');
    });

    it('should not refresh token for blocked user', async function () {
        const getStub = this.sandbox.stub(User, 'get').returnsWithResolve({status: CONSTANTS.STATUS.DISABLED});

        const ctx = {
            header: {
                authorization: defaultUserToken
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
            await refresh(ctx);
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
        sinon.assert.calledOnce(getStub);
    });

    it('should not refresh token for removed user', async function () {
        const getStub = this.sandbox.stub(User, 'get').returnsWithResolve();

        const ctx = {
            header: {
                authorization: defaultUserToken
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
            await refresh(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        expect(ctx.body.token).to.not.exist;
        expect(ctx.body.message).to.exist;
        expect(ctx.body.message).eql('User does not exist');
        sinon.assert.calledOnce(getStub);
    });

    it('should log verify jwt error', async function () {
        const getSpy = this.sandbox.spy(User, 'get');
        const error = new Error('Invalid data');

        const ctx = {
            header: {
                authorization: defaultUserToken
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
            await refresh(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).eql(error);
        sinon.assert.notCalled(getSpy);
    });

    it('should log get model error', async function () {
        const getStub = this.sandbox.stub(User, 'get').returnsWithReject(new Error('fatal'));

        const ctx = {
            header: {
                authorization: defaultUserToken
            },
            throw (err) {
                throw err;
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
            await refresh(ctx);
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).equal('fatal');
        }

        sinon.assert.calledOnce(getStub);
    });
});