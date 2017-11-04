'use strict';

const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const User = require('../../user/model.js');
const config = require('../../../../config');
const CONSTANTS = require('../../../../constants');

/**
 * @apiDefine apiSuccessExample_refresh_token
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjM4MzQzLCJleHAiOjE1MDk2MzkyNDN9.wccECiky5KFyPcuDs7ATPC68r4SnOagxVwtgYgenc-E"
 *    }
 */

/**
 * @api {get} /auth/refresh Refresh Token
 * @apiName refreshToken
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiDescription Refresh token
 *
 * @apiHeader {String} Authorization User unique access-token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Zjk5ODYwMjIyZTMyMzAyYzFjZTQ1NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTA5NjM4MzQzLCJleHAiOjE1MDk2MzkyNDN9.wccECiky5KFyPcuDs7ATPC68r4SnOagxVwtgYgenc-E"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/auth/refresh
 *
 * @apiUse apiSuccessExample_refresh_token
 */

async function refreshToken (ctx, next) {
    const authorization = ctx.header.authorization;

    if (!authorization) {
        ctx.status = 401;
        ctx.body = {message: 'No token'};
        return;
    }

    await passport.authenticate('jwt', async function (err, user, data) {
        let userData;
        let payload;
        let token;

        if (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err;
            return;
        }

        if (!user) {
            ctx.status = 401;
            ctx.body = {message: 'Invalid token'};
            return;
        }

        try {
            userData = await User.get(user.id);
        } catch (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = {message: 'Get user error'};
            return;
        }

        if (!userData) {
            ctx.status = 401;
            ctx.body = {message: 'User does not exist'};
            return;
        }

        if (userData.status === CONSTANTS.STATUS.DISABLED) {
            ctx.status = 401;
            ctx.body = {message: 'User blocked'};
            return;
        }

        payload = {
            id  : userData._id,
            role: userData.role
        };

        token = jwt.sign(payload, config.jwt.secret, {expiresIn: config.jwt.expiresIn});

        ctx.body = {token};
    })(ctx, next);
}

module.exports = refreshToken;