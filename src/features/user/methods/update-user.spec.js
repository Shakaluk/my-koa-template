'use strict';

const Faker = require('faker');
const sinon = require('sinon');

const User = require('../model');
const updateUser = require('./update-user');

describe('update user method', function () {
    let defaultUser;
    let notValidUser;
    let userId;

    before(function () {
        defaultUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        notValidUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.name.firstName()
        };

        userId = '4238';
    });

    it('should update user', function *() {
        const stub = this.sandbox.stub(User, 'update').returnsWithResolve({});

        const ctx = {
            request: {
                body: defaultUser
            },
            params: {
                id: userId
            }
        };

        yield updateUser.call(ctx);

        sinon.assert.calledOnce(stub);
    });

    it('should not update user', function *() {
        const spy = this.sandbox.spy(User, 'update');

        const ctx = {
            request: {
                body: notValidUser
            },
            params: {
                id: userId
            }
        };

        yield updateUser.call(ctx);

        sinon.assert.notCalled(spy);
    });
});