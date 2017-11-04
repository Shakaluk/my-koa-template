'use strict';

const Router = require('koa-router');
const router = new Router();

const userRouter = require('./user');
const authRouter = require('./auth');

router.use(userRouter.routes());
router.use(authRouter.routes());

module.exports = router;