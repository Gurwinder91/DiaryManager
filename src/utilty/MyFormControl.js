export class MyFormControl {
    invalid = false;
    touched = false;
    validations = [];
    constructor(value = '', validators = []) {
        this.value = value;
        this.validators = validators;
    }
}