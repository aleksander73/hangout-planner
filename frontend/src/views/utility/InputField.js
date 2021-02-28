import ValidationResult from './ValidationResult';

class InputField {
    constructor(inputType, icon, placeholder, validations) {
        this.inputType = inputType;
        this.icon = icon;
        this.placeholder = placeholder || '';
        this.value = '';
        this.validations = validations || [];
    }

    addValidation(validation) {
        this.validations.push(validation);
    }

    async validate() {
        for(let i = 0; i < this.validations.length; i++) {
            const validation = this.validations[i];
            const isValid = await validation.test(this.value);
            if(!isValid) {
                return new ValidationResult(false, validation.errorMessage);
            }
        }
        return new ValidationResult(true, '');
    }
}

export default InputField;
