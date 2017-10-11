'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../model');
const deleteUser = require('./delete-user');

describe('delete user method', function () {
    let defaultUser;

    before(function () {
        defaultUser = {
            id: '595b6a53f7909c41f0e2897b'
        };
    });

    it('should delete user', async function () {
        const stub = this.sandbox.stub(User, 'delete').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        try {
            await deleteUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(stub);
    });
});