require("dotenv").config();

const config = {
    PORT: process.env.PORT || 4002,
    MONGODB_URI: process.env.MONGODB_URI,
}

module.exports = config;