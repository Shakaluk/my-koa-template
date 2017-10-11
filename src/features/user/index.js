'use strict';

const Router = require('koa-router');
const router = new Router({
    prefix: '/user'
});

router.get('/', require('./methods/get-users'));
router.get('/:id', require('./methods/get-user'));
router.post('/', require('./methods/create-user'));
router.patch('/:id', require('./methods/update-user'));
router.delete('/:id', require('./methods/delete-user'));

module.exports = router;