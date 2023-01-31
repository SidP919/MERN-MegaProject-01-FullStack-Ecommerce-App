const {generateFromEmail} = require('unique-username-generator');

const getUniqueUsername = (email) => {
    return generateFromEmail(email,4);
}

module.exports = getUniqueUsername;