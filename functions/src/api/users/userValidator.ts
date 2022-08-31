import { isEmpty } from "@utils/validators";
import { UserData, UserError } from "./users";

interface UserValidatorOutput {
    errors: UserError;
    valid: boolean;
}

const validateUserUpdateData = (data: UserData): UserValidatorOutput => {
    let errors: UserError = {};

    if (isEmpty(data.username)) errors.username = 'Must not be empty';
    if (isEmpty(data.first_name)) errors.first_name = 'Must not be  empty';
    if (isEmpty(data.last_name)) errors.last_name = 'Must not be  empty';
    if (isEmpty(data.avatar)) errors.avatar = 'Must not be  empty';
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

export default validateUserUpdateData;