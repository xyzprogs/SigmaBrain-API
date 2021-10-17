const db_pool = require('./mysql-init');
const mysql  = require('mysql2');
const pool = require('./mysql-init');
getQuiz = (id) => {
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM Quiz WHERE quizId = ' + mysql.escape(id), (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = {
    getQuiz
}