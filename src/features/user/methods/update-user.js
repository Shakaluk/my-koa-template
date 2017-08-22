'use strict';

const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');

async function updateUser () {
    const id = this.params.id;
    const body = this.request.body;
    let data;

    try {
        data = await Joi.attempt(body, schema.update);
    } catch (err) {
        this.app && this.app.env !== 'test' ? console.log(err) : null;
        this.status = 400;
        this.body = {
            message: 'Validate user error',
            err    : err.details
        };
        return err;
    }

    try {
        this.body = await User.update(id, data);
    } catch (err) {
        console.log(err);
        this.status = 500;
        this.body = {message: 'Update user error'};
    }
}

module.exports = updateUser;