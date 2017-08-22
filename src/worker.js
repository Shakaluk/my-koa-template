'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = koa();

const router = require('./features');
const mongoUri = require('../config').mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
    useMongoClient: true
});

app.use(bodyParser({
    jsonLimit: '10mb',
    onerror  : function (err, ctx) {
        console.log(err);
        ctx.throw('body parse error', 422);
    }
}));
app.use(router.routes());

app.listen(process.env.PORT);