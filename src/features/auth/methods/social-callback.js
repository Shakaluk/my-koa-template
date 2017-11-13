'use strict';

const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const config = require('../../../../config');

/**
 * @apiDefine apiSuccessExample_social_callback
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 */

/**
 * @api {get} /auth/:name/callback Facebook callback
 * @apiName socialCallback
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiDescription Social callback should return redirect with token parameter
 *
 * @apiParam {String} code Social <code>code</code>.
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://www.example.com/api/auth/facebook/callback?code=AQBArY-dcTPBjxbMW_kOYeDZ2lAZs93zd8hdySFdVgPrWrvxQi6vXBKWDkidS6SX8qQ0P-8gRad4pdpxrf3VRt95XN5w4ai2ph_WC4s4_YrUOpBgU_Q89pkmt6Vdbzmq1D0_a5XIAmbGNm5jTPq988fMaVPDWjPNrll7AJE7_0CYsJuNIqJcuz-0pJnPFxyDwla_nn0FQtWHPqgayaa3dLMSEhh6MIJDQ4H7FQPQqJPEIO7Ig2Hks5X5ce59SBog6Ammz-gdxH3alN0kqEnc8I3tubnFYU8VQTYJl8jUFXrW9Jy4jtl6nSkM7cfJn081RV6PemZbsJd_i--JrYHieHi9
 *
 * @apiUse apiSuccessExample_social_callback
 */

async function socialCallback (ctx, next) {
    const name = ctx.params.name;
    let token;

    await passport.authenticate(name, {session: false}, async function (err, user, data) {
        if (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err;
            return;
        }

        if (user === false) {
            ctx.redirect(`/auth/social?message=${data.message}`);
            return;
        }

        token = jwt.sign(user, config.jwt.secret, {expiresIn: config.jwt.expiresIn});

        ctx.redirect(`/auth/social?token=${token}`);
    })(ctx, next);
}

module.exports = socialCallback;