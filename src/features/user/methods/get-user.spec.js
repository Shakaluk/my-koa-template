'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../model');
const getUser = require('./get-user');

describe('get user method', function () {
    let defaultUser;

    before(function () {
        defaultUser = {
            id: '595b6a53f7909c41f0e2897b'
        };
    });

    it('should get user', async function () {
        const stub = this.sandbox.stub(User, 'get').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        try {
            await getUser(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(stub);
    });
});