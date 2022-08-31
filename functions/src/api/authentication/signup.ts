import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { Request, Response } from "express";

import { getDefaultUser } from "@api/users/users";
import { db } from "@utils/admin";

import validateSignupData from "./signupValidator";

interface SignUpData {
	username: string;
    first_name: string;
    last_name: string;
	password: string;
	confirmPassword: string;
	email: string;
}

interface SignUpError {
	username?: string;
    first_name?: string;
    last_name?: string;
	password?: string;
	confirmPassword?: string;
	email?: string;
}

async function signUpUser(request: Request, response: Response): Promise<Response<any>> {
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

			const userCredentials = getDefaultUser(
                userId,
                data.username,
                data.first_name,
                data.last_name
            );
		
			db.collection(`users`).add(userCredentials);
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

export { SignUpData, SignUpError };
export default signUpUser;