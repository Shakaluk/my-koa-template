'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Faker = require('faker');
const Joi = require('joi');

const User = require('../model');
const createUser = require('./create-user');

describe('create user method', function () {
    let defaultUser;
    let notValidUser;

    before(function () {
        defaultUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        notValidUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.name.firstName()
        };
    });

    it('should create user', async function () {
        const validateStub = this.sandbox.stub(Joi, 'attempt').returnsWithResolve({});
        const createSpy = this.sandbox.spy(User, 'create');

        const ctx = {
            request: {
                body: defaultUser
            }
        };

        try {
            await createUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateStub);
        sinon.assert.calledOnce(createSpy);
    });

    it('should not create user with invalid data', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const createSpy = this.sandbox.spy(User, 'create');

        const ctx = {
            request: {
                body: notValidUser
            }
        };

        try {
            await createUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.notCalled(createSpy);
    });

    it('should log create model error', async function () {
        const validateStub = this.sandbox.stub(Joi, 'attempt').returnsWithResolve({});
        const createStub = this.sandbox.stub(User, 'create').returnsWithReject(new Error('fatal'));
        const ctx = {
            request: defaultUser,
            throw (err) {
                throw err;
            }
        };

        try {
            await createUser(ctx);
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).equal('fatal');
        }

        sinon.assert.calledOnce(validateStub);
        sinon.assert.calledOnce(createStub);
    });
});