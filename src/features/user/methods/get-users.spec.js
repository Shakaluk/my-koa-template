'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../model');
const getUsers = require('./get-users');

describe('get users method', function () {
    it('should get users', async function () {
        const stub = this.sandbox.stub(User, 'getAll').returnsWithResolve({});

        const ctx = {
            request: {}
        };

        try {
            await getUsers(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(stub);
    });
});