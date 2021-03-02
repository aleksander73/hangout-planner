class ValidationResult {
    constructor(isValid, errorMessage) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
}

module.exports = ValidationResult;
