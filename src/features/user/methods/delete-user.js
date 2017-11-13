'use strict';

const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');

/**
 * @apiDefine apiSuccessExample_delete_user
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
 * @api {delete} /user/:id Delete User
 * @apiName deleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiDescription Delete User
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
 * @apiUse apiSuccessExample_delete_user
 */

async function deleteUser (ctx, next) {
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
        await User.delete(id);
        ctx.status = 200;
        ctx.body = {};
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = {message: 'Delete user error'};
    }
}

module.exports = deleteUser;