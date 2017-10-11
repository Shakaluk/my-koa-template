'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Faker = require('faker');

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
        const stub = this.sandbox.stub(User, 'create').returnsWithResolve({});

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

        sinon.assert.calledOnce(stub);
    });

    it('should not create user', async function () {
        const spy = this.sandbox.spy(User, 'create');

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

        sinon.assert.notCalled(spy);
    });
});