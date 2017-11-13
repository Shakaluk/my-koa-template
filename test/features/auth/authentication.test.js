'use strict';

const expect = require('chai').expect;
const request = require('koa2-request');
const Faker = require('faker');

const init = require('../../../src/init');
const clearDatabase = require('../../helpers/clear-database');
const createToken = require('../../helpers/create-token');
const config = require('../../../config');
const CONSTANTS = require('../../../constants');

describe('Authentication', function () {
    let defaultUser;
    let updateParams;
    let token;
    let url;

    before(async function () {
        url = `http://${process.env.HOST}:${process.env.PORT}/api/auth`;

        defaultUser = {
            email   : Faker.internet.email(),
            password: Faker.internet.password()
        };

        updateParams = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName()
        };

        try {
            await init();
        } catch (err) {
            console.log(err);
        }
    });

    after(async function () {
        try {
            await clearDatabase();
        } catch (err) {
            console.log(err);
        }
    });

    it('should get token', async function () {
        let response;
        let options = {
            url   : `${url}/login`,
            method: 'post',
            json  : true,
            body  : {
                email   : config.defaultAdmin.email,
                password: config.user.defaultPassword
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
        expect(response.body.token).to.exist;
        expect(response.body.token).to.be.an('string');

        token = `Bearer ${response.body.token}`;
    });

    it('should refresh token', async function () {
        let response;
        let options = {
            url    : `${url}/refresh`,
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
        expect(response.body.token).to.exist;
        expect(response.body.token).to.be.an('string');

        token = `Bearer ${response.body.token}`;
    });

    it('should not get data from protected routes without token', async function () {
        let response;
        let options = {
            url   : `http://${process.env.HOST}:${process.env.PORT}/api/user`,
            json  : true
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
        expect(response.body.message).to.exist;
        expect(response.body.message).eql('No auth token');
    });

    it('should not get data from protected routes for admins', async function () {
        let response;
        let options = {
            url    : `http://${process.env.HOST}:${process.env.PORT}/api/user`,
            method : 'post',
            json   : true,
            headers: {
                authorization: createToken(CONSTANTS.USER_ROLES.USER)
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
        expect(response.body.message).to.exist;
        expect(response.body.message).eql('Permission denied');
    });
});