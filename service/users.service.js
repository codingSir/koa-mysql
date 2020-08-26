const userDao = require('../dao/users.dao');

class usersService {
    static async findAll(){
        return await userDao.findAll();
    }
    static async findOne({ username }){
        return await userDao.findOne(username)
    }
    static async save(user){
        return await userDao.insertData(user)
    }
}

module.exports = usersService;