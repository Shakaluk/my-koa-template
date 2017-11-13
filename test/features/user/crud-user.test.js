'use strict';

const expect = require('chai').expect;
const request = require('koa2-request');
const Faker = require('faker');

const createToken = require('../../helpers/create-token');
const CONSTANTS = require('../../../constants');

describe('C.R.U.D user', function () {
    let defaultUser;
    let updateParams;
    let userId;
    let token;
    let url;

    before(async function () {
        url = `http://${process.env.HOST}:${process.env.PORT}/api/user`;

        defaultUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        updateParams = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName()
        };

        token = createToken(CONSTANTS.USER_ROLES.ADMIN);
    });

    it('should get empty users array', async function () {
        let response;
        let options = {
            url    : url,
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.exist;
        expect(response.body.data).to.be.an('array');
        expect(response.body.data).to.be.empty;
    });

    it('should create user', async function () {
        let response;
        let options = {
            url    : url,
            method : 'post',
            body   : defaultUser,
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.exist;
        expect(response.body.name).to.equal(defaultUser.name);

        userId = response.body._id;
    });

    it('should get users', async function () {
        let response;
        let options = {
            url    : url,
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.exist;
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.exist;
        expect(response.body.data[0]).to.be.an('object');
        expect(response.body.data[0].name).to.exist;
        expect(response.body.data[0].name).to.equal(defaultUser.name);
    });

    it('should get user', async function () {
        let response;
        let options = {
            url    : `${url}/${userId}`,
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.exist;
        expect(response.body.name).to.equal(defaultUser.name);
    });

    it('should update user', async function () {
        let response;
        let options = {
            url    : `${url}/${userId}`,
            method : 'patch',
            body   : updateParams,
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.exist;
        expect(response.body.name).to.equal(updateParams.name);
    });

    it('should get updated user', async function () {
        let response;
        let options = {
            url    : `${url}/${userId}`,
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.exist;
        expect(response.body.name).to.equal(updateParams.name);
    });

    it('should delete user', async function () {
        let response;
        let options = {
            url    : `${url}/${userId}`,
            method : 'delete',
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.empty;
    });

    it('should get empty users array', async function () {
        let response;
        let options = {
            url    : url,
            json   : true,
            headers: {
                authorization: token
            }
        };

        try {
            response = await request(options);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(response).to.exist;
        expect(response).to.be.an('object');
        expect(response.body).to.exist;
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.exist;
        expect(response.body.data).to.be.an('array');
        expect(response.body.data).to.be.empty;
    });
});