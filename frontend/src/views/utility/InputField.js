import { validationHelper } from '../../../../src/data/validation';

class InputField {
    constructor(id, inputType, icon, placeholder, validations) {
        this.id = id;
        this.inputType = inputType;
        this.icon = icon;
        this.placeholder = placeholder || '';
        this.value = '';
        this.validations = [...validations] || [];
    }

    addValidation(validation) {
        this.validations.push(validation);
    }

    async validate() {
        return await validationHelper.validateSet(this.validations, this.value);
    }
}

export default InputField;
