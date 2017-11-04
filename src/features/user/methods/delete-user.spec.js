'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

const User = require('../model');
const deleteUser = require('./delete-user');

describe('delete user method', function () {
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

    it('should delete user', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const deleteStub = this.sandbox.stub(User, 'delete').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        try {
            await deleteUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.calledOnce(deleteStub);
    });

    it('should not delete user with invalid id', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const deleteStub = this.sandbox.spy(User, 'delete');

        const ctx = {
            params: notValidUser
        };

        try {
            await deleteUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.notCalled(deleteStub);
    });

    it('should log delete model error', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const deleteStub = this.sandbox.stub(User, 'delete').returnsWithReject(new Error('fatal'));
        const ctx = {
            params: defaultUser,
            throw (err) {
                throw err;
            }
        };

        try {
            await deleteUser(ctx);
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).equal('fatal');
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.calledOnce(deleteStub);
    });
});