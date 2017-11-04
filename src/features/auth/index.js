'use strict';

const Router = require('koa-router');
const router = new Router({
    prefix: '/auth'
});

router.get('/refresh', require('./methods/refresh'));
router.post('/login', require('./methods/login'));

module.exports = router;