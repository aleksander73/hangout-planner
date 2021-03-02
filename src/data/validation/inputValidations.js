const {
    isEmail,
    max,
    min,
    required,
    simple
} = require('./validationFunctions');
const { ObjectHelper } = require('..');

const usernameValidation = [ required, max(255), simple ];
const emailValidation = [ required, max(255), isEmail ];
const passwordValidation = [ required, min(8), max(255) ];

module.exports = ObjectHelper.deepFreeze({
    registration: {
        usernameValidation,
        emailValidation,
        passwordValidation
    }
});
