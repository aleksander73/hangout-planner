class InputField {
    constructor(inputType, icon, placeholder, value, validations) {
        this.inputType = inputType;
        this.icon = icon;
        this.placeholder = placeholder || '';
        this.value = value || '';
        this.validations = validations || [];
    }
}

export default InputField;
