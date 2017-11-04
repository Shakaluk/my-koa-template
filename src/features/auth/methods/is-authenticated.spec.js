'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const isAuthenticated = require('./is-authenticated');
const passport = require('../passport');

describe('is authenticated method', () => {
    let defaultUserToken;
    let notValidUserToken;

    before(function () {
        defaultUserToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjQyODE4LCJleHAiOjE1MDk2NDM3MTh9.yMXkuLOpHJkKy514gJbrU6eHQDFDL4hxEy8goDdf-9U';
        notValidUserToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    });

    it('should check if user is authenticated and call next', async function (done) {
        const nextStub = this.sandbox.stub().returnsWithResolve(done());

        const ctx = {
            header: {
                authorization: defaultUserToken
            }
        };

        try {
            await isAuthenticated(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(nextStub);
    });

    it('should return unauthorized for user with no token provided', async function (done) {
        const nextStub = this.sandbox.stub().returnsWithResolve(done());

        const ctx = {
            header: {}
        };

        try {
            await isAuthenticated(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.notCalled(nextStub);
    });

    it('should return unauthorized for expired token', async function (done) {
        const nextStub = this.sandbox.stub().returnsWithResolve(done());

        const ctx = {
            header: {
                authorization: defaultUserToken
            }
        };

        passport.authenticate = function (strategy, callback) {
            return async function () {
                try {
                    await callback(null, {}, {message: 'Token expired'});
                } catch (err) {
                    console.log(err);
                }
            };
        };

        try {
            await isAuthenticated(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        sinon.assert.notCalled(nextStub);
    });

    it('should return unauthorized for invalid token', async function (done) {
        const nextStub = this.sandbox.stub().returnsWithResolve(done());

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
            await isAuthenticated(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).to.be.an('object');
        expect(ctx.body.message).to.exist;
        expect(ctx.body.message).eql('Invalid token');
        sinon.assert.notCalled(nextStub);
    });

    it('should log verify jwt error', async function (done) {
        const nextStub = this.sandbox.stub().returnsWithResolve(done());
        const error = new Error('Invalid token');

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
            await isAuthenticated(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(ctx).to.exist;
        expect(ctx).to.be.an('object');
        expect(ctx.body).to.exist;
        expect(ctx.body).eql(error);
        sinon.assert.notCalled(nextStub);
    });
});