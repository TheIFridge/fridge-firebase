import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

import { isEmpty, isEmail } from "@utils/validators";
import { SignUpData, SignUpError } from "./signup";

interface SignupValidatorOutput {
    errors: SignUpError;
    valid: boolean;
}

const validateSignupData = async (data: SignUpData): Promise<SignupValidatorOutput> => {
    let errors: SignUpError = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}

    if (isEmpty(data.first_name)) errors.first_name = 'Must not be empty';
    if (isEmpty(data.last_name)) errors.last_name = 'Must not be empty';
	if (isEmpty(data.username)) errors.username = 'Must not be empty';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';

	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';

    const emailExists = (await fetchSignInMethodsForEmail(getAuth(), data.email)).length != 0;
    if (!emailExists) errors.email = 'Email already exists!'

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

export default validateSignupData;