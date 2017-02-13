'use strict';

const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');

function *createUser () {
    const body = this.request.body;
    let data;

    try {
        data = yield Joi.attempt(body, schema.create);
    } catch (err) {
        this.app && this.app.env !== 'test' ? console.log(err) : null;
        this.status = 400;
        this.body = {
            message: 'Validate user error',
            err: err.details
        };
        return;
    }

    try {
        this.body = yield User.create(data);
    } catch (err) {
        console.log(err);
        this.status = 500;
        this.body = {
            message: 'Create user error'
        };
    }
}

module.exports = createUser;