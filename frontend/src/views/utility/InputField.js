class InputField {
    constructor(inputType, icon, placeholder, validations) {
        this.inputType = inputType;
        this.icon = icon;
        this.placeholder = placeholder || '';
        this.value = '';
        this.validations = validations || [];
    }

    async validate() {
        for(let i = 0; i < this.validations.length; i++) {
            const validation = this.validations[i];
            const isValid = await validation.test(this.value);
            if(!isValid) {
                throw new Error(validation.errorMessage);
            }
        }
    }
}

export default InputField;
