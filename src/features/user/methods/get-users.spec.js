'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Faker = require('faker');
const Joi = require('joi');

const User = require('../model');
const getUsers = require('./get-users');

describe('get users method', function () {
    let notValidParams;

    before(function () {
        notValidParams = {
            skip: Faker.lorem.word()
        };
    });

    it('should get users', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const getStub = this.sandbox.stub(User, 'getAll').returnsWithResolve({});

        const ctx = {
            request: {}
        };

        try {
            await getUsers(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.calledOnce(getStub);
    });

    it('should not get users with invalid params', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const getStub = this.sandbox.spy(User, 'getAll');

        const ctx = {
            request: {
                query: notValidParams
            }
        };

        try {
            await getUsers(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.notCalled(getStub);
    });

    it('should log get all model error', async function () {
        const validateSpy = this.sandbox.spy(Joi, 'attempt');
        const getStub = this.sandbox.stub(User, 'getAll').returnsWithReject(new Error('fatal'));
        const ctx = {
            request: {},
            throw (err) {
                throw err;
            }
        };

        try {
            await getUsers(ctx);
        } catch (err) {
            expect(err).to.be.an('error');
            expect(err.message).equal('fatal');
        }

        sinon.assert.calledOnce(validateSpy);
        sinon.assert.calledOnce(getStub);
    });
});