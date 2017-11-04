'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Faker = require('faker');
const Joi = require('joi');

const User = require('../model');
const updateUser = require('./update-user');

describe('update user method', function () {
    let defaultUser;
    let notValidUser;
    let defaultUserId;
    let notValidUserId;

    before(function () {
        defaultUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        notValidUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.name.firstName()
        };

        defaultUserId = '595b6a53f7909c41f0e2897b';

        notValidUserId = '595b6a53f7909c41f0e289';
    });

    it('should update user', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const updateStub = this.sandbox.stub(User, 'update').returnsWithResolve({});

        const ctx = {
            request: {
                body: defaultUser
            },
            params: {
                id: defaultUserId
            }
        };

        try {
            await updateUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledTwice(validateSpy);
        sinon.assert.calledOnce(updateStub);
    });

    it('should not update user with invalid data', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const updateStub = this.sandbox.spy(User, 'update');

        const ctx = {
            request: {
                body: notValidUser
            },
            params: {
                id: defaultUserId
            }
        };

        try {
            await updateUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledTwice(validateSpy);
        sinon.assert.notCalled(updateStub);
    });

    it('should not update user with invalid id', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const updateStub = this.sandbox.spy(User, 'update');

        const ctx = {
            request: {
                body: defaultUser
            },
            params: {
                id: notValidUserId
            }
        };

        try {
            await updateUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.notCalled(updateStub);
    });

    it('should log update model error', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const updateStub = this.sandbox.stub(User, 'update').returnsWithReject(new Error('fatal'));
        const ctx = {
            request: {
                body: defaultUser
            },
            params: {
                id: defaultUserId
            },
            throw (err) {
                throw err;
            }
        };

        try {
            await updateUser(ctx);
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).equal('fatal');
        }

        sinon.assert.calledTwice(validateSpy);
        sinon.assert.calledOnce(updateStub);
    });
});