'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Faker = require('faker');

const User = require('../model');
const updateUser = require('./update-user');

describe('update user method', function () {
    let defaultUser;
    let notValidUser;
    let userId;

    before(function () {
        defaultUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        notValidUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.name.firstName()
        };

        userId = '595b6a53f7909c41f0e2897b';
    });

    it('should update user', async function () {
        const stub = this.sandbox.stub(User, 'update').returnsWithResolve({});

        const ctx = {
            request: {
                body: defaultUser
            },
            params: {
                id: userId
            }
        };

        try {
            await updateUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(stub);
    });

    it('should not update user', async function () {
        const spy = this.sandbox.spy(User, 'update');

        const ctx = {
            request: {
                body: notValidUser
            },
            params: {
                id: userId
            }
        };

        try {
            await updateUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.notCalled(spy);
    });
});