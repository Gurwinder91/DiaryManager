import { Validator } from './Validator';

export class MyFormGroup {
    invalid = true;
    constructor(controls) {
        this.controls = controls;
    }

    formSubmit = (event) => {
        event.preventDefault();
        return new Promise((resolve, reject) => {
            const values = {};
            for (let control in this.controls) {
                values[control] = this.controls[control].value;
            }
            resolve(values);
        });
    }

    dateChangeHandler = (name, date) => {
        const controlName = name;

        let { [controlName]: { ...control } } = this.controls;

        control.value = date;
        control = this.validators(control);

        this.controls[controlName] = control;
        this.invalid = control.invalid;
        return this;
    }

    inputChangeHandler = (event) => {
        const controlName = event.target.name;
        let controlValue = event.target.value;
        if (event.target.type === 'checkbox') {
            controlValue = event.target.checked;
        }

        let { [controlName]: { ...control }, } = this.controls;
        control.value = controlValue;
        control = this.validators(control);
        control.touched = true;

        this.controls[controlName] = control;
        this.invalid = this.setFormValid(this.controls);
        return this;
    }

    validators = (control) => {
        for (let validator of control.validators) {
            if (validator.name === 'required') {
                control.invalid = Validator.requiredValidator(control.value);
                control = this.addControlError(control, validator);
            } else if (validator.name === 'email') {
                control.invalid = Validator.emailValidator(control.value);
                control = this.addControlError(control, validator);
            }
        }

        return control;
    }

    addControlError = (control, validator) => {
        control.validations = [];
        if (control.invalid) {
            control.validations = [{
                name: validator.name,
                message: validator.message
            }]
        }
        return control
    }

    setFormValid = (controls) => {
        let invalid = false;
        for (let control in controls) {
            if (controls[control].invalid) {
                invalid = true;
                break;
            }
        }
        return invalid;
    }

    showError = (controlName) => {
        let { [controlName]: { ...control } } = this.controls;
        return control.touched && control.invalid
    }

    showErrorText = (controlName) => {
        let { [controlName]: { ...control } } = this.controls;
        if (control.invalid && control.touched)
            return control.validations.map(error => error.message);

        return '';
    }

    populateForm = (milk) => {
        for (let item in milk) {
            this.controls[item].value = milk[item];
        }

        return this.controls;
    }
}