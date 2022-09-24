import { WriteResult } from "@google-cloud/firestore"

import { db } from "@utils/admin";

import * as defaults from './defaults';
import { USER_COLLECTION, User, UserData } from "./types";

async function getUser(identifier: string): Promise<User> {
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
                    email: currentData.email,
                    joined: currentData.joined,
                    config: currentData.config || defaults.userConfigDefaults,
                    userTier: currentData.userTier || defaults.userTierDefaults,
                    preferences: currentData.preferences || defaults.userPreferenceDefaults,
                }

                response(userData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function updateUser(identifier: string, data: UserData) {
    return new Promise<WriteResult>((response, reject) => {
        return db.collection(USER_COLLECTION).doc(identifier).update(data)
            .then((result) => {
                response(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export { getUser, updateUser };