const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    HOST,
    CONNECTION_LIMIT,
    PASSWORD,
    DB_USER,
    DATABASE,
    DB_HOST,
    DB_PORT,
    IMAGE_STORAGE,
    FIREBASE_ADMIN_CREDENTIALS
} = process.env;


module.exports = {
    port: PORT,
    host: HOST,
    connection_limit: CONNECTION_LIMIT,
    password: PASSWORD,
    db_user: DB_USER,
    database: DATABASE,
    db_host: DB_HOST,
    db_port: DB_PORT,
    image_storage: IMAGE_STORAGE,
    firebase_admin_credentials: FIREBASE_ADMIN_CREDENTIALS
}