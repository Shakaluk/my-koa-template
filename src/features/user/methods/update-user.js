'use strict';

const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');

/**
 * @apiDefine apiSuccessExample_update_user
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id"      : "595b6a53f7909c41f0e2897b",
 *      "email"    : "some@user.com",
 *      "name"     : "Some advanced user",
 *      "role"     : "user",
 *      "status"   : "active",
 *      "updatedAt": "2017-07-04T10:13:39.797Z",
 *      "createdAt": "2017-07-04T10:13:39.797Z"
 *    }
 */

/**
 * @api {patch} /user/:id Update User
 * @apiName updateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiDescription Update user
 *
 * @apiHeader {String} Authorization User unique access-token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjM4MzQzLCJleHAiOjE1MDk2MzkyNDN9.wccECiky5KFyPcuDs7ATPC68r4SnOagxVwtgYgenc-E"
 *     }
 *
 * @apiParam {String} [name] User <code>name</code>.
 * @apiParam {String} [email] User <code>email</code>.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "name": "Some advanced user"
 *    }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/api/user/:id
 *
 * @apiUse apiSuccessExample_update_user
 */

async function updateUser (ctx, next) {
    const id = ctx.params.id;
    const body = ctx.request.body;
    let data;

    try {
        await Joi.attempt(id, schema.id);
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            message: 'Validate user error',
            err    : err.details
        };
        return err;
    }

    try {
        data = await Joi.attempt(body, schema.update);
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            message: 'Validate user error',
            err    : err.details
        };
        return err;
    }

    try {
        ctx.body = await User.update(id, data);
    } catch (err) {
        if (err.code === 11000) { // duplicate email
            ctx.status = 409;
            ctx.body = {message: 'Email already exists'};
        } else {
            console.log(err);
            ctx.status = 500;
            ctx.body = {message: 'Update user error'};
        }
    }
}

module.exports = updateUser;