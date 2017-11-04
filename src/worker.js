'use strict';

const path = require('path');
const Koa = require('koa');
const cors = require('kcors');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();

const router = require('./features');
const mongoUri = require('../config').mongoUri;
const passport = require('./features/auth/passport');

mongoose.Promise = Promise;
mongoose.connect(mongoUri, {
    useMongoClient: true
});

app.use(bodyParser({
    jsonLimit: '10mb',
    onerror  : function (err, ctx) {
        console.log(err);
        ctx.throw('body parse error');
    }
}));

app.use(cors());

app.use(serve(path.join(__dirname, '../public')));

app.use(passport.initialize());

app.use(router.routes());

app.listen(process.env.PORT);