'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../model');
const getUser = require('./get-user');

describe('get user method', function () {
    let defaultUser;

    before(function () {
        defaultUser = {
            id: '4238'
        };
    });

    it('should get user', async function () {
        const stub = this.sandbox.stub(User, 'get').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        try {
            await getUser.call(ctx);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(stub);
    });
});