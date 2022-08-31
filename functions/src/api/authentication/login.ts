import { getAuth, signInWithEmailAndPassword, Auth } from "firebase/auth";
import { Request, Response } from "express";

import validateLoginData from "./loginValidator";

interface LoginData {
    email: string;
    password: string;
}

interface LoginError {
    email?: string;
    password?: string;
}

async function loginUser(request: Request, response: Response): Promise<Response<any>> {
    const data: LoginData = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(data);
    if (!valid) return response.status(400).json(errors);

    const auth: Auth = getAuth();
    
    return await signInWithEmailAndPassword(auth, data.email, data.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'wrong credentials, please try again'});
        })
}

export { LoginData, LoginError };
export default loginUser;