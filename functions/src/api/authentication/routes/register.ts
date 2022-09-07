import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, Auth } from "firebase/auth";
import { Request, Response } from "express";

import { db } from "@utils/admin";

import { isEmpty, isEmail } from "@utils/validators";
import { userDefaults } from "@api/users/defaults";

import { SignUpData, SignUpError, SignupValidatorOutput } from "../types";

const validateSignupData = async (data: SignUpData): Promise<SignupValidatorOutput> => {
    let errors: SignUpError = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else {
        const emailExists = (await fetchSignInMethodsForEmail(getAuth(), data.email)).length != 0;
        if (emailExists) errors.email = 'Email already exists!'

        if (!isEmail(data.email)) {
            errors.email = 'Must be valid email address';
        }
    } 

    if (isEmpty(data.first_name)) errors.first_name = 'Must not be empty';
    if (isEmpty(data.last_name)) errors.last_name = 'Must not be empty';
	if (isEmpty(data.username)) errors.username = 'Must not be empty';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';

	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

export async function register(request: Request, response: Response): Promise<Response<any>> {
    const data: SignUpData = {
        username: request.body.username,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        email: request.body.email
    }

    const { valid, errors } = await validateSignupData(data);
    if (!valid) return response.status(400).json(errors);

    const auth: Auth = getAuth();

    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCreds) => {
			const userId = userCreds.user.uid;
			const userToken = await userCreds.user.getIdToken();

			const userCredentials = userDefaults(userId, data.username, data.first_name, data.last_name);
		
			db.collection(`users`).doc(userId).set(userCredentials);
			return response.status(201).json({ userToken });
        })
        .catch((error) => {
			const errorCode = error.code;
			// const errorMessage = error.message;

			const signUpError: SignUpError = {};
			
			if (errorCode == "auth/email-already-in-use") {
				signUpError.email = "The email address is already in use";
			} else if (errorCode == "auth/invalid-email") {
				signUpError.email = "The email address is not valid.";
			} else if (errorCode == "auth/weak-password") {
				signUpError.password = "The password is too weak.";
			}

			return response.status(500).json(
				Object.keys(signUpError).length === 0 ? { error: 'Something went wrong, please try again' } : signUpError
			);
        }); 
}