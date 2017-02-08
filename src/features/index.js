'use strict';

const router = require('koa-router')();

const userRouter = require('./user');

router.use(userRouter.routes());

module.exports = router;