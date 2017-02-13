'use strict';

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

    it('should delete user', function *() {
        const stub = this.sandbox.stub(User, 'delete').returnsWithResolve({});

        const ctx = {
            params: defaultUser
        };

        yield deleteUser.call(ctx);

        sinon.assert.calledOnce(stub);
    });
});