const mysql  = require('mysql2')
const config = require('../config')
const pool = mysql.createPool(
    {
        connectionLimit: config.connection_limit,
        password: config.password,
        user: config.db_user,
        database: config.database,
        host: config.db_host,
        port: config.db_port,
        multipleStatements: false
    }
)

module.exports = pool;