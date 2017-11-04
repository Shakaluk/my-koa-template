'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

const User = require('../model');
const getUser = require('./get-user');

describe('get user method', function () {
    let defaultUser;
    let notValidUser;

    before(function () {
        defaultUser = {
            id: '595b6a53f7909c41f0e2897b'
        };

        notValidUser = {
            id: '595b6a53f7909c41f0e289'
        };
    });

    it('should get user', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const getStub = this.sandbox.stub(User, 'get').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        try {
            await getUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.calledOnce(getStub);
    });

    it('should not get user with invalid id', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const getSpy = this.sandbox.spy(User, 'get');

        const ctx = {
            params: notValidUser
        };

        try {
            await getUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.notCalled(getSpy);
    });

    it('should log get model error', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const getStub = this.sandbox.stub(User, 'get').returnsWithReject(new Error('fatal'));
        const ctx = {
            params: defaultUser,
            throw (err) {
                throw err;
            }
        };

        try {
            await getUser(ctx);
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).equal('fatal');
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.calledOnce(getStub);
    });
});