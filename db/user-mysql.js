const db_pool = require('./mysql-init');
const mysql  = require('mysql2');

createUser = (user) => {
    return new Promise((resolve, reject) => {
        db_pool.query('INSERT INTO Users(userId, email, displayName) VALUES('
                        + mysql.escape(user.userId) + ','
                        + mysql.escape(user.email) + ','
                        + mysql.escape(user.displayName) + ')' ,(err, result)=>{
            if (err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getTopUsers = () =>{
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM users ORDER BY experience DESC LIMIT 3; ' , (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = {
    createUser,
    getTopUsers
}