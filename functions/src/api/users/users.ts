import { Request, Response } from "express";

import { db } from "@utils/admin";

import { UserConfig, getDefaultConfig } from "./userConfig";
import { UserTier,  getDefaultUserTier } from "./userTier";
import validateUserUpdateData from "./userValidator";

const USER_COLLECTION = 'users';

interface User {
    identifier: string,
    username: string,
    first_name: string,
    last_name: string,
    joined: string,
    config: UserConfig,
    userTier: UserTier,
    avatar?: string
}

interface UserError {
    username?: string,
    first_name?: string,
    last_name?: string,
    avatar?: string,
}

interface UserData {
    username?: string,
    first_name?: string,
    last_name?: string,
    avatar?: string
}

function getDefaultUser(
    identifier: string,
    username: string,
    first_name: string,
    last_name: string
): User {
    return {
        identifier,
        username,
        first_name,
        last_name,
        joined: new Date().toISOString(),
        config: getDefaultConfig(),
        userTier: getDefaultUserTier(),
    }
}

async function getUserData(identifier: string): Promise<User> {
    return new Promise<User>((response, reject) => {
        return db.collection(USER_COLLECTION).doc(identifier).get()
            .then((data) => {
                const currentData = data.data();

                if (!currentData) {
                    return reject(new Error(`User with identifier ${identifier} not found`));
                }

                const userData: User = {
                    identifier: currentData.identifier,
                    username: currentData.username,
                    first_name: currentData.first_name,
                    last_name: currentData.last_name,
                    joined: currentData.joined,
                    config: currentData.config || getDefaultConfig(),
                    userTier: currentData.userTier || getDefaultUserTier(),
                }

                response(userData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function getUser(request: Request, response: Response): Promise<Response<any>> {
    const identifier = request.params.identifier;

    return getUserData(identifier)
        .then((userData) => {
            return response.json(userData);
        })
        .catch((error) => {
            // TODO: Handle error so we don't expose internal server errors to the user
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}

async function updateUser(request: Request, response: Response) {
    const data: UserData = {
        username: request.body.username,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        avatar: request.body.avatar,
    }
    
    const { valid, errors } = validateUserUpdateData(data);
    if (!valid) return response.status(400).json(errors);

    const identifier = request.params.identifier;

    return db.collection(USER_COLLECTION).doc(identifier).update(data)
        .then(() => {
            return response.json({ message: 'User updated successfully' });
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}

export { USER_COLLECTION, getDefaultUser, getUser, updateUser };
export { UserError, User, UserData };