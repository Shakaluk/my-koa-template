'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = koa();

require('../config');

const router = require('./features');

app.use(bodyParser({
    jsonLimit: '10mb',
    onerror: function (err, ctx) {
        console.error(err);
        ctx.throw('body parse error', 422);
    }
}));
app.use(router.routes());

app.listen(process.env.PORT);