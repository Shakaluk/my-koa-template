'use strict';

const router = require('koa-router')({
    prefix: '/user'
});

router.get('/', require('./methods/get-users'));
router.get('/:id', require('./methods/get-user'));
router.post('/', require('./methods/create-user'));
router.patch('/:id', require('./methods/update-user'));
router.delete('/:id', require('./methods/delete-user'));

module.exports = router;