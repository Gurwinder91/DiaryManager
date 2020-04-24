export default class ErrorGenerator {

    static getErrorMessage(errors, inputName) {
        let message = '';
        if (errors[inputName]) {
            switch (errors[inputName].type) {
                case 'required':
                    message = errors[inputName].message || 'This field is required';
                    break;
                case 'pattern':
                    message = errors[inputName].message || 'This field is invalid';
                    break;
                case 'minLength':
                    message = errors[inputName].message;
                    break;
                case 'maxLength':
                    message = errors[inputName].message;
                    break;
                case 'passwordMatch':
                    message = 'Password and Confirm Password is not matched';
                    break;
                case 'max':
                    message = errors[inputName].message;
                    break;
                default:
                    break;
            }
        }
        return message;
    }
}