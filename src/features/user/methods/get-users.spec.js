'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../model');
const getUsers = require('./get-users');

describe('get users method', function () {
    it('should get users', async function () {
        const stub = this.sandbox.stub(User, 'getAll').returnsWithResolve({});

        const ctx = {
            body: null
        };

        try {
            await getUsers.call(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(stub);
    });
});