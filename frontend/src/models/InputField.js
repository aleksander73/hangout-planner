class InputField {
    constructor(inputType, icon, placeholder, value) {
        this.inputType = inputType;
        this.icon = icon;
        this.placeholder = placeholder || '';
        this.value = value || '';
    }
}

export default InputField;
