'use strict';

const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');
const config = require('../../../../config');

async function createUser () {
    const body = this.request.body;
    let data;

    try {
        data = await Joi.attempt(body, schema.create);
    } catch (err) {
        this.app && this.app.env !== 'test' ? console.log(err) : null;
        this.status = 400;
        this.body = {
            message: 'Validate user error',
            err    : err.details
        };
        return err;
    }

    data.password = config.user.defaultPassword;

    try {
        this.body = await User.create(data);
    } catch (err) {
        if (err.code === 11000) { // duplicate email
            this.status = 409;
            this.body = {
                message: 'Email already exists'
            };
        } else {
            console.log(err);
            this.status = 500;
            this.body = {
                message: 'Create user error'
            };
        }
    }
}

module.exports = createUser;