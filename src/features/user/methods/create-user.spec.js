'use strict';

const Faker = require('faker');
const sinon = require('sinon');

const User = require('../model');
const createUser = require('./create-user');

describe('create user method', function () {
    let defaultUser;
    let notValidUser;

    before(function () {
        defaultUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        notValidUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.name.firstName()
        };
    });

    it('should create user', function *() {
        const stub = this.sandbox.stub(User, 'create').returnsWithResolve({});

        const ctx = {
            request: {
                body: defaultUser
            }
        };

        yield createUser.call(ctx);

        sinon.assert.calledOnce(stub);
    });

    it('should not create user', function *() {
        const spy = this.sandbox.spy(User, 'create');

        const ctx = {
            request: {
                body: notValidUser
            }
        };

        yield createUser.call(ctx);

        sinon.assert.notCalled(spy);
    });
});