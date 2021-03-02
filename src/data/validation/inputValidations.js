const {
    isEmail,
    max,
    min,
    required,
    simple
} = require('./validationFunctions');

const usernameValidation = [ required, max(255), simple ];
const emailValidation = [ required, max(255), isEmail ];
const passwordValidation = [ required, min(8), max(255) ];

module.exports = {
    registration: {
        usernameValidation,
        emailValidation,
        passwordValidation
    }
}
