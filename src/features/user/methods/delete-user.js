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
 * @apiDescription Delete User
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/user/595b6a53f7909c41f0e2897b
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
        ctx.body = await User.delete(id);
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = {message: 'Delete user error'};
    }
}

module.exports = deleteUser;