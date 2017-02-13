'use strict';

const expect = require('chai').expect;
const Faker = require('faker');

const User = require('./model');

describe('User model', function () {
    let defaultUser;
    let updateParams;
    let notValidUser;
    let userId;

    before(function () {
        defaultUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        updateParams = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName()
        };

        notValidUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: {}
        };
    });

    after(function () {

    });

    it('should create user', function *() {
        const user = yield User.create(defaultUser);

        expect(user).to.exist;
        expect(user).to.be.an('object');
        expect(user._id).to.exist;
        expect(user.name).eql(defaultUser.name);

        userId = user._id;
    });

    it('should return validation error on creating user', function *() {
        let user;

        try {
            user = yield User.create(notValidUser);
        } catch (err) {
            expect(err).to.exist;
            expect(err.message).eql('Validate user error');
        }

        expect(user).to.not.exist;
    });

    it('should return all users', function *() {
        const users = yield User.getAll();

        expect(users).to.exist;
        expect(users).to.be.an('array');
        expect(users[0]).to.exist;
        expect(users[0]).to.be.an('object');
        expect(users[0]._id).to.exist;
        expect(users[0]._id).eql(userId);
    });

    it('should return one user by id', function *() {
        const user = yield User.get(userId);

        expect(user).to.exist;
        expect(user).to.be.an('object');
        expect(user._id).to.exist;
        expect(user.name).eql(defaultUser.name);
    });

    it('should update user model', function *() {
        const user = yield User.update({_id: userId}, updateParams);

        expect(user).to.exist;
        expect(user).to.be.an('object');
        expect(user._id).to.exist;
        expect(user._id).eql(userId);
        expect(user.name).eql(updateParams.name);
    });

    it('should return validation error on updating user', function *() {
        let user;

        try {
            user = yield User.update(notValidUser);
        } catch (err) {
            expect(err).to.exist;
            expect(err.message).eql('Validate user error');
        }

        expect(user).to.not.exist;
    });

    it('should delete user', function *() {
        const result = yield User.delete(userId);

        expect(result).to.exist;
        expect(result.status).to.exist;
        expect(result.status).eql('ok');
    });
});