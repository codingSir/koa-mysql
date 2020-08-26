const userService = require('../service/users.service');

class usersController {

    static async findAllUser(ctx){
         ctx.body = await userService.findAll();
    }

    static async findOne(ctx){

    }
}

module.exports = usersController;