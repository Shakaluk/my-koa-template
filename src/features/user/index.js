'use strict';

const router = require('koa-router')({
    prefix: '/users'
});

router.get('/', require('./methods/getUsers'));
router.post('/', require('./methods/createUser'));

module.exports = router;