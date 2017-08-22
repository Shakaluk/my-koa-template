'use strict';

const expect = require('chai').expect;
const Faker = require('faker');

const User = require('./model');

describe('User model', function () {
    let defaultUser;
    let updateParams;
    let notValidUser;
    let notValidUpdateParams;
    let userId;

    before(function () {
        defaultUser = {
            name : Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email()
        };

        updateParams = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName()
        };

        notValidUser = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName()
        };

        notValidUpdateParams = {
            role: Faker.name.firstName()
        };
    });

    after(function () {

    });

    it('should create user', async function () {
        let user;

        try {
            user = await User.create(defaultUser);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(user).to.exist;
        expect(user).to.be.an('object');
        expect(user._id).to.exist;
        expect(user.name).eql(defaultUser.name);

        userId = user._id;
    });

    it('should return validation error on creating user', async function () {
        let user;

        try {
            user = await User.create(notValidUser);
        } catch (err) {
            expect(err).to.exist;
            expect(err.name).eql('ValidationError');
        }

        expect(user).to.not.exist;
    });

    it('should return all users', async function () {
        let users;

        try {
            users = await User.getAll();
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(users).to.exist;
        expect(users).to.be.an('array');
        expect(users[0]).to.exist;
        expect(users[0]).to.be.an('object');
        expect(users[0]._id).to.exist;
        expect(users[0]._id).eql(userId);
    });

    it('should return one user by id', async function () {
        let user;

        try {
            user = await User.get(userId);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(user).to.exist;
        expect(user).to.be.an('object');
        expect(user._id).to.exist;
        expect(user.name).eql(defaultUser.name);
    });

    it('should update user model', async function () {
        let user;

        try {
            user = await User.update({_id: userId}, updateParams);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(user).to.exist;
        expect(user).to.be.an('object');
        expect(user._id).to.exist;
        expect(user._id).eql(userId);
        expect(user.name).eql(updateParams.name);
    });

    it('should return validation error on updating user', async function () {
        let user;

        try {
            user = await User.update(userId, notValidUpdateParams);
        } catch (err) {
            expect(err).to.exist;
            expect(err.name).eql('ValidationError');
        }

        expect(user).to.not.exist;
    });

    it('should delete user', async function () {
        let result;

        try {
            result = await User.delete(userId);
        } catch (err) {
            expect(err).to.not.exist;
        }

        expect(result).to.exist;
        expect(result._id).to.exist;
        expect(result._id).eql(userId);
    });
});