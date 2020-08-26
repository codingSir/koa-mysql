const router = require('koa-router')()
const usesController = require('../controller/users.controller');

router.prefix('/api');

router.get('/findAllUser', usesController.findAllUser);


module.exports = router
