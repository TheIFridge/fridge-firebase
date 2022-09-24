import { Request, Response } from "express";

import { admin } from "@utils/admin";

export function isAuthenticated(request: Request, response: Response, next: Function) {
    const token = request.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        return response.status(401).json({ error: "Unauthorized 1 " });
    }
    
    return admin.auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            return next();
        }).catch((error) => {
            // TODO Handle error, token may be expred etc
            console.error(error);
            return response.status(401).json({ error: "Unauthorized 2" });
        });
}