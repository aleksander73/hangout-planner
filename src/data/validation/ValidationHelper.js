const ValidationResult = require('./ValidationResult');

class ValidationHelper {
    async validateSet(validationSet, value) {
        for(let i = 0; i < validationSet.length; i++) {
            const validation = validationSet[i];
            if(!await validation.test(value)) {
                 return new ValidationResult(false, validation.errorMessage);
            }
        }
        return new ValidationResult(true, '');
    }
}

module.exports = Object.freeze(new ValidationHelper());
