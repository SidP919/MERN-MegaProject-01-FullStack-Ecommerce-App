require("dotenv").config();

const config = {
    PORT: process.env.PORT || 4001,
    AUTH_ENCRYPT_PWD_SALT: process.env.AUTH_ENCRYPT_PWD_SALT,
    JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
    JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV || 'development',
}

module.exports = config;