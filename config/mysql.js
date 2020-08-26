const mysql = require('mysql');
const  sqlConfig  = require('./sql.config.js');
console.log(JSON.stringify(sqlConfig));
const pool = mysql.createPool({
    host        : sqlConfig.database.HOST,
    user        : sqlConfig.database.USERNAME,
    password    : sqlConfig.database.PASSWORD,
    database    : sqlConfig.database.DATABASE,
    port        : sqlConfig.database.PORT,
    dateStrings : true
});

let query = (sql, values) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err, connection) => {
            if(err){

                reject(err);

            }else {
                connection.query(sql, values, (err, rows) => {
                    if(err){

                        reject(err)

                    }else {

                        resolve(rows)

                    }

                    connection.release()
                });
            }
        })
    })
};

module.exports = query;