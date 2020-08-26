const router = require('koa-router')();
const loginController = require('../controller/login.controller')

const loginUrl = '/login',
      registerUrl = '/register';

router.post(loginUrl,  loginController.login);

router.post(registerUrl, loginController.register);

module.exports = router;

