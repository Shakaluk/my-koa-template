'use strict';

const crypto = require('crypto');
const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');
const config = require('../../../../config');

/**
 * @apiDefine apiSuccessExample_create_user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "_id"      : "59da7daf1754fa02800c9f1b",
 *      "name"     : "Example",
 *      "email"    : "example@example.mail",
 *      "password" : "12345678",
 *      "role"     : "user",
 *      "status"   : "active",
 *      "updatedAt": "2017-10-08T19:34:07.640Z",
 *      "createdAt": "2017-10-08T19:34:07.640Z"
 *    }
 */

/**
 * @api {post} /user Create User
 * @apiName createUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Create user
 *
 * @apiParam {String} name User <code>name</code>.
 * @apiParam {String} email User <code>email</code>.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name" : "Example"
 *       "email": "example@example.mail"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/user
 *
 * @apiUse apiSuccessExample_create_user
 */

async function createUser (ctx, next) {
    const body = ctx.request.body;
    let data;

    try {
        data = await Joi.attempt(body, schema.create); // TODO: add role
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            message: 'Validate user error',
            err    : err.details
        };
        return err;
    }

    data.password = crypto.createHmac('sha256', config.cryptoSecret).update(config.user.defaultPassword).digest('hex');

    try {
        ctx.body = await User.create(data);
    } catch (err) {
        if (err.code === 11000) { // duplicate email
            ctx.status = 409;
            ctx.body = {
                message: 'Email already exists'
            };
        } else {
            console.log(err);
            ctx.status = 500;
            ctx.body = {
                message: 'Create user error'
            };
        }
    }
}

module.exports = createUser;