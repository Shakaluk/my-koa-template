'use strict';

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

    it('should get user', function *() {
        const stub = this.sandbox.stub(User, 'get').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        yield getUser.call(ctx);

        sinon.assert.calledOnce(stub);
    });
});