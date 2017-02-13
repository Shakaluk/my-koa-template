'use strict';

const sinon = require('sinon');

before(function () {
    sinon.stub.returnsWithResolve = function (data) {
        return this.returns(Promise.resolve(data));
    };

    sinon.stub.returnsWithReject = function (err) {
        return this.returns(Promise.reject(err));
    };
});

after(function () {

});

beforeEach(function () {
    this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
    this.sandbox.restore();
});