'use strict';

const Joi = require('joi');

const User = require('../model.js');
const schema = require('../validate-schema');

/**
 * @apiDefine apiSuccessExample_get_users
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      count: 1,
 *      data : [
 *        {
 *          "_id"      : "595b6a53f7909c41f0e2897b",
 *          "email"    : "some@user.com",
 *          "name"     : "Some user",
 *          "role"     : "user",
 *          "status"   : "active",
 *          "updatedAt": "2017-07-04T10:13:39.797Z",
 *          "createdAt": "2017-07-04T10:13:39.797Z"
 *        }
 *      ]
 *    }
 */

/**
 * @api {get} /user Get Users
 * @apiName getUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Get all users
 *
 * @apiParam {String} [sort] The users list <code>sort</code> (default "createdAt").
 * @apiParam {Number} [order] The users list <code>order</code> (1, -1).
 * @apiParam {Number} [skip] The users list <code>skip</code> (default 0).
 * @apiParam {Number} [limit] The users list <code>limit</code> (default 15).
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/user
 *
 * @apiUse apiSuccessExample_get_users
 */

async function getUsers (ctx, next) {
    const options = ctx.request.query;
    let getQuery;

    try {
        getQuery = await Joi.attempt(options, schema.getAll);
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            message: 'Validation error',
            err    : err.details
        };
        return err;
    }

    ctx.body = {};

    try {
        ctx.body.count = await User.count();
        ctx.body.data = await User.getAll(getQuery);
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = {message: 'Get users error'};
    }
}

module.exports = getUsers;