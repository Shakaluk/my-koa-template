'use strict';

before(function () {
    console.log('before');
});

after(function () {
    console.log('after');
});

beforeEach(function () {
    console.log('before each');
});

afterEach(function () {
    console.log('after each');
});