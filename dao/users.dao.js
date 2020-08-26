const query = require('../config/mysql');

const sql = {
    selectALl:'SELECT * FROM user_info'
};


class UsersDao {


    findAll(){
        return query(sql.selectALl)
    }
    findOne(userName){

        let sql = `select * from user_info where user_name = "${userName}"`;

        return query(sql)
    }
    insertData(v) {
        // let _sql = `insert into user set user_name=?,password=?;`;
        let  _sql = `insert into user_info set user_name = "${v.username}",password = "${v.password}";`;
        return query(_sql)
    }
    deleteData(name) {
        let _sql = `delete from user_info where user_name="${name}";`
        return query(_sql)
    }
    updateData(data) {
        let _sql = `update user_info set user_age=? where user_name=?;`
        return query(_sql, data)
    }
}

module.exports = new UsersDao();