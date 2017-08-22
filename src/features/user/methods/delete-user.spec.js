'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../model');
const deleteUser = require('./delete-user');

describe('delete user method', function () {
    let defaultUser;

    before(function () {
        defaultUser = {
            id: '4238'
        };
    });

    it('should delete user', async function () {
        const stub = this.sandbox.stub(User, 'delete').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        try {
            await deleteUser.call(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(stub);
    });
});