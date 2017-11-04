'use strict';

const Router = require('koa-router');
const router = new Router({
    prefix: '/user'
});

router.all('*', require('../auth/methods/is-authenticated'));
router.get('/', require('./methods/get-users'));
router.get('/:id', require('./methods/get-user'));
router.post('/', require('../auth/methods/is-admin'), require('./methods/create-user'));
router.patch('/:id', require('../auth/methods/is-admin'), require('./methods/update-user'));
router.delete('/:id', require('../auth/methods/is-admin'), require('./methods/delete-user'));

module.exports = router;