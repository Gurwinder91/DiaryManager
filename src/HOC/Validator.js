
export const required = (args) => {
    return args.onChange = (value) => {
        return value.trim().length > 0; 
    }
}

export const Validator = (wrappedComponent) => {
    return function wrappedRender(args) {
        console.log(args);
        if (args.required) {
            
        }
        return wrappedComponent(args);
    }
}

