'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const schema = require('../../user/validate-schema');
const config = require('../../../../config');

/**
 * @apiDefine apiSuccessExample_login
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *        "_id" : "595b6a53f7909c41f0e2897b",
 *        "name": "Some user",
 *        "role": "user"
 *      },
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjI3ODMyLCJleHAiOjE1MDk2Mjc4OTJ9.5jKCvZnCbwcToYiNP3hy7d5_443_HGURpFPX_3QckWc"
 *    }
 */

/**
 * @api {post} /auth/login Login
 * @apiName login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiDescription Login
 *
 * @apiParam {String} email User <code>email</code>.
 * @apiParam {String} password User <code>password</code>.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email"    : "example@example.mail"
 *       "password" : "Some_password"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/auth/login
 *
 * @apiUse apiSuccessExample_login
 */

async function loginUser (ctx, next) {
    const body = ctx.request.body;
    let payload;
    let token;

    try {
        await Joi.attempt(body, schema.login);
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            message: 'Validate data error',
            err    : err.details
        };
        return err;
    }

    await passport.authenticate('local', async function (err, user, data) {
        if (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err;
            return;
        }

        if (user === false) {
            ctx.status = 401;
            ctx.body = data;
            return;
        }

        payload = {
            id  : user._id,
            role: user.role
        };

        token = jwt.sign(payload, config.jwt.secret, {expiresIn: config.jwt.expiresIn});

        ctx.body = {user, token};
    })(ctx, next);
}

module.exports = loginUser;