'use strict';

const sinon = require('sinon');

const User = require('../model');
const getUsers = require('./get-users');

describe('get users method', function () {
    it('should get users', function *() {
        const stub = this.sandbox.stub(User, 'getAll').returnsWithResolve({});

        const ctx = {
            body: null
        };

        yield getUsers.call(ctx);

        sinon.assert.calledOnce(stub);
    });
});