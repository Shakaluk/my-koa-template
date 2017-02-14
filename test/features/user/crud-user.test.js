'use strict';

const expect = require('chai').expect;
const request = require('koa-request');
const Faker = require('faker');

describe('C.R.U.D user', function () {
    let defaultUser;
    let updateParams;
    let userId;
    let url;

    before(function () {
        defaultUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        updateParams = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName()
        };
    });

    describe('user', function () {
    it('should get users', function *() {
        url = 'http://' + process.env.HOST + ':' + process.env.PORT + '/user';

        let options = {
            url: url
        };
        let response = yield request(options);

        let body = JSON.parse(response.body);

        expect(body).to.exist;
        expect(body).to.be.an('array');
        expect(body).to.be.empty;
    });

    it('should create user', function *() {
        let options = {
            method: 'POST',
            url: url,
            form: defaultUser
        };
        let response = yield request(options);

        let body = JSON.parse(response.body);

        userId = body._id;

        expect(body).to.exist;
        expect(body).to.be.an('object');
        expect(body.name).to.exist;
        expect(body.name).to.equal(defaultUser.name);
    });

    it('should update user', function *() {
        let options = {
            method: 'PATCH',
            url: url + '/' + userId,
            form: updateParams
        };
        let response = yield request(options);

        let body = JSON.parse(response.body);

        expect(body).to.exist;
        expect(body).to.be.an('object');
        expect(body.name).to.exist;
        expect(body.name).to.equal(updateParams.name);
    });

    it('should get user', function *() {
        let options = {
            url: url + '/' + userId
        };
        let response = yield request(options);

        let body = JSON.parse(response.body);

        expect(body).to.exist;
        expect(body).to.be.an('object');
        expect(body.name).to.exist;
        expect(body.name).to.equal(updateParams.name);
    });

    it('should delete user', function *() {
        let options = {
            method: 'DELETE',
            url: url + '/' + userId
        };
        let response = yield request(options);

        let body = JSON.parse(response.body);

        expect(body).to.exist;
        expect(body).to.be.an('object');
        expect(body.status).to.exist;
        expect(body.status).to.equal('ok');
    });

    it('should get users', function *() {
        let options = {
            url: url
        };
        let response = yield request(options);

        let body = JSON.parse(response.body);

        expect(body).to.exist;
        expect(body).to.be.an('array');
        expect(body).to.be.empty;
    });
});
});