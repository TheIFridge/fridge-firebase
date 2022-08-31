import { isEmpty } from "@utils/validators";
import { LoginData, LoginError } from "./login";

interface LoginValidatorOutput {
    errors: LoginError;
    valid: boolean;
}

const validateLoginData = (data: LoginData): LoginValidatorOutput => {
    let errors: LoginError = {};

    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be  empty';
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

export default validateLoginData;