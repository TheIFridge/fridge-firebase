import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getApp } from "firebase/app";
import { Request, Response } from "express";

import { isEmpty } from "@utils/validators";

const validateLoginData = (data: LoginData): LoginValidatorOutput => {
    let errors: LoginError = {};

    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be  empty';
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

export async function login(request: Request, response: Response): Promise<Response<any>> {
    const data: LoginData = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(data);
    if (!valid) return response.status(400).json(errors);

    const auth = getAuth(getApp());
    
    return await signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async (data) => {
            const token = await data.user.getIdToken();
            return response.json({ token });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'wrong credentials, please try again'});
        })
}