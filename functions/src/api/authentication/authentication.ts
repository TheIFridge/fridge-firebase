import { Request, Response } from "express";

import { admin, db } from "@utils/admin";
import { USER_COLLECTION } from "@api/users/users";

function isAuthenticated(request: Request, response: Response, next: Function) {
    const token = request.headers.authorization?.split("Bearer ")[1];

    if (!token) return response.status(401).json({ error: "Unauthorized" });
    
    return admin.auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            db.collection(USER_COLLECTION).where('identifier', '==', decodedToken.uid).limit(1).get();
            return next();
        }).catch((error) => {
            console.error(error);
            return response.status(401).json({ error: "Unauthorized" });
        });
}

export default isAuthenticated;