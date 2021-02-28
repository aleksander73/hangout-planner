class Validation {
    constructor(validateFunction, errorMessage) {
        this.validateFunction = validateFunction;
        this.errorMessage = errorMessage;
    }

    async test(input) {
        return await this.validateFunction(input);
    }
}

export default Validation;
