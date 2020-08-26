const users = require('./users');
const login = require('./login');

const loaderRouter = function(app){

    app.use(users.routes(), users.allowedMethods());
    app.use(login.routes(), login.allowedMethods());
};

module.exports = loaderRouter;
