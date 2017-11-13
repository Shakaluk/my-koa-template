'use strict';

const Router = require('koa-router');
const router = new Router({
    prefix: 'api/auth'
});

router.get('/refresh', require('./methods/refresh'));
router.get('/:name', require('./methods/social'));
router.get('/:name/callback', require('./methods/social-callback'));
router.post('/login', require('./methods/login'));

module.exports = router;