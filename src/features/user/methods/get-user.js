'use strict';

const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');

/**
 * @apiDefine apiSuccessExample_get_user
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id"      : "595b6a53f7909c41f0e2897b",
 *      "email"    : "some@user.com",
 *      "name"     : "Some user",
 *      "role"     : "user",
 *      "status"   : "active",
 *      "updatedAt": "2017-07-04T10:13:39.797Z",
 *      "createdAt": "2017-07-04T10:13:39.797Z"
 *    }
 */

/**
 * @api {get} /user/:id Get User
 * @apiName getUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission user, admin
 * @apiDescription Get user
 *
 * @apiHeader {String} Authorization User unique access-token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjM4MzQzLCJleHAiOjE1MDk2MzkyNDN9.wccECiky5KFyPcuDs7ATPC68r4SnOagxVwtgYgenc-E"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/api/user/595b6a53f7909c41f0e2897b
 *
 * @apiUse apiSuccessExample_get_user
 */

async function getUser (ctx, next) {
    const id = ctx.params.id;

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
        ctx.body = await User.get(id);
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = {message: 'Get user error'};
    }
}

module.exports = getUser;